import socket
import sys
import random

class SeabattleField:
    def __init__(self):
        # El campo es de 8x8
        self.field = [['.' for _ in range(8)] for _ in range(8)]
        self.opponent_view = [['?' for _ in range(8)] for _ in range(8)]
        self.total_ship_cells = 20 
        self.hits_received = 0

    def get_random_field(self, seed):
        random.seed(seed)
        ship_sizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
        for size in ship_sizes:
            placed = False
            while not placed:
                x, y = random.randint(0, 7), random.randint(0, 7)
                horizontal = random.choice([True, False])
                if self._can_place(x, y, size, horizontal):
                    self._place_ship(x, y, size, horizontal)
                    placed = True
        return self.field

    def _can_place(self, x, y, size, horizontal):
        for i in range(size):
            cx, cy = (x + i, y) if horizontal else (x, y + i)
            if cx > 7 or cy > 7: return False
            for dx in range(-1, 2):
                for dy in range(-1, 2):
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx <= 7 and 0 <= ny <= 7:
                        if self.field[ny][nx] == 'S': return False
        return True

    def _place_ship(self, x, y, size, horizontal):
        for i in range(size):
            cx, cy = (x + i, y) if horizontal else (x, y + i)
            self.field[cy][cx] = 'S'

    def shoot(self, x, y):
        if self.field[y][x] == 'S':
            self.field[y][x] = 'H'
            self.hits_received += 1
            if self._is_ship_destroyed(x, y):
                return 2  # Kill
            return 1  # Hit
        else:
            if self.field[y][x] == '.':
                self.field[y][x] = 'M'
            return 0  # Miss

    def _is_ship_destroyed(self, x, y):
        visited = set()
        stack = [(x, y)]
        while stack:
            cx, cy = stack.pop()
            if (cx, cy) in visited: continue
            visited.add((cx, cy))
            for nx, ny in [(cx-1,cy),(cx+1,cy),(cx,cy-1),(cx,cy+1)]:
                if 0 <= nx <= 7 and 0 <= ny <= 7:
                    if self.field[ny][nx] == 'S': return False
                    if self.field[ny][nx] == 'H' and (nx, ny) not in visited:
                        stack.append((nx, ny))
        return True

    def mark_miss(self, x, y): self.opponent_view[y][x] = 'M' 
    def mark_hit(self, x, y): self.opponent_view[y][x] = 'H'
    def mark_kill(self, x, y): self.opponent_view[y][x] = 'K'

    def is_loser(self):
        return self.hits_received >= self.total_ship_cells

class SeabattleAgent:
    def __init__(self, field_obj, conn):
        self.field_obj = field_obj
        self.conn = conn

    def start_game(self, is_my_turn):
        while not self.is_game_ended():
            self.print_fields()
            if is_my_turn:
                move_str = input("Tu turno (ej. C7): ").strip().upper()
                coords = self.parse_move(move_str)
                if not coords:
                    print("Movimiento inválido.")
                    continue
                
                self.conn.sendall(move_str[:2].encode())
                res_data = self._recv_exact(1)
                if res_data is None: break
                result = int.from_bytes(res_data, "big")

                if result == 0:
                    self.field_obj.mark_miss(*coords)
                    is_my_turn = False
                elif result == 1:
                    self.field_obj.mark_hit(*coords)
                elif result == 2:
                    self.field_obj.mark_kill(*coords)
            else:
                print("Esperando disparo del oponente...")
                data = self._recv_exact(2)
                if not data: break
                
                move_str = data.decode()
                coords = self.parse_move(move_str)
                if not coords: continue
                
                res = self.field_obj.shoot(*coords)
                self.conn.sendall(res.to_bytes(1, "big"))
                
                if res == 0: is_my_turn = True

        self.print_fields()
        if self.field_obj.is_loser():
            print("¡Has perdido!")
        else:
            print("¡Has ganado!")

    def _recv_exact(self, n):
        data = b''
        while len(data) < n:
            packet = self.conn.recv(n - len(data))
            if not packet: return None
            data += packet
        return data

    @staticmethod
    def parse_move(text):
        if len(text) < 2: return None
        col = ord(text[0].upper()) - ord('A')
        try:
            row = int(text[1:]) - 1
        except ValueError: return None
        if 0 <= col <= 7 and 0 <= row <= 7: return col, row
        return None

    def print_fields(self):
        print("\n   TU CAMPO          OPONENTE")
        header = "  A B C D E F G H"
        print(f"{header}    {header}")
        for i in range(8):
            my_r = " ".join(self.field_obj.field[i])
            op_r = " ".join(self.field_obj.opponent_view[i])
            print(f"{i+1} {my_r}    {i+1} {op_r}")

    def is_game_ended(self):
        opp_kills = sum(1 for row in self.field_obj.opponent_view for c in row if c == 'K')
        return self.field_obj.is_loser() or opp_kills >= 20
    
    @staticmethod
    def move_to_string(x, y):
        """Convierte coordenadas (1, 5) a 'B6' """
        return f"{chr(ord('A') + x)}{y + 1}"

def start_server(seed, port):
    field = SeabattleField()
    field.get_random_field(seed)
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind(('0.0.0.0', port))
    s.listen(1)
    print(f"Servidor escuchando en el puerto {port}...")
    conn, addr = s.accept()
    print(f"Conectado con {addr}")
    agent = SeabattleAgent(field, conn)
    agent.start_game(is_my_turn=False)

def start_client(seed, ip, port):
    field = SeabattleField()
    field.get_random_field(seed)
    conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    conn.connect((ip, port))
    print(f"Conectado al servidor {ip}:{port}")
    agent = SeabattleAgent(field, conn)
    agent.start_game(is_my_turn=True)

if __name__ == "__main__":
    # sys.argv[0] es el nombre del script, los argumentos empiezan en el índice 1
    args = sys.argv[1:]
    
    if len(args) == 2:
        # Modo Servidor: seed port
        start_server(int(args[0]), int(args[1]))
    elif len(args) == 3:
        # Modo Cliente: seed server_ip port
        start_client(int(args[0]), args[1], int(args[2]))
    else:
        print("Error en argumentos.")
        print("Uso Servidor: python app.py <seed> <port>")
        print("Uso Cliente: python app.py <seed> <server_ip> <port>")