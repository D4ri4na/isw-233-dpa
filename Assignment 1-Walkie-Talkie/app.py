import socket
import sys
import pyaudio

CHUNK = 65000        
FORMAT = pyaudio.paInt8 
CHANNELS = 1         
RATE = 44100       
FRAME_SIZE = 1      

def start_server(port):
    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, output=True)
    
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(("0.0.0.0", port))
    
    print(f"Servidor escuchando en el puerto {port}...")
    
    try:
        while True:
            data, addr = sock.recvfrom(65536)
            frames_to_play = len(data) // FRAME_SIZE
            print(f"Recibido mensaje de {addr}: {frames_to_play} frames.")
            stream.write(data)
    except KeyboardInterrupt:
        print("\nServidor detenido.")
    finally:
        stream.stop_stream()
        stream.close()
        p.terminate()

def start_client(port):
    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)
    
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    
    print("Modo Cliente Activo.")
    
    try:
        while True:
            server_ip = input("\nIngrese la IP del servidor (o 'exit' para salir): ")
            if server_ip.lower() == 'exit': break
            
            print("Grabando 1.5s...")
            audio_data = stream.read(CHUNK)
            
            total_bytes = len(audio_data)
            
            sock.sendto(audio_data, (server_ip, port))
            print(f"Enviados {total_bytes} bytes a {server_ip}:{port}")
    finally:
        stream.stop_stream()
        stream.close()
        p.terminate()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python app.py [client|server] [puerto]")
        sys.exit(1)
    
    mode = sys.argv[1].lower()
    port = int(sys.argv[2])
    
    if mode == "server":
        start_server(port)
    elif mode == "client":
        start_client(port)