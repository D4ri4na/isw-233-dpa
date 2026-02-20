# TCP UDP Networking and Docker

Este repositorio contiene la implementación de dos tareas, enfocadas en la transmisión de datos mediante protocolos de transporte **UDP** y **TCP**.


## 1. 🛠 Estructura del Repositorio

📁 Assignment 1: Walkie-Talkie

| Archivo              | Función                                                                 |
|----------------------|-------------------------------------------------------------------------|
| `app.py`             | Contiene la lógica principal del programa Walkie-Talkie utilizando sockets nativos de Python. |


📁 Assignment 2: Battleship

| Archivo              | Función                                                                 |
|----------------------|-------------------------------------------------------------------------|
| `app.py`             | Contiene la lógica principal del programa Battleship utilizando sockets nativos de Python. |
| `Dockerfile`         | Define la imagen base de Python y el entorno aislado para la ejecución. |
| `docker-compose.yml` | Orquesta la red virtual para conectar los contenedores de cliente y servidor. |


## 2. 📻 Assignment 1: UDP Walkie-Talkie

### Descripción
Un sistema de comunicación de audio en tiempo real que utiliza el protocolo **UDP** para minimizar la latencia. Captura audio de un micrófono, lo transmite en un único datagrama y lo reproduce en el servidor.

### Especificaciones Técnicas

- **Audio:** 8-bit mono, sample rate 44100Hz  
- **Buffer:** Datagrama único de 65,000 frames  
- **Fórmula de Envío:**  
    \[
    BytesToSend = TotalFrames \times FrameSize
    \]

### Instrucciones de Ejecución (Nativo)

Para poder escuchar el audio real en Windows, se recomienda la ejecución nativa:

**Servidor:**
python app.py server 5005

**Cliente**
python app.py client 5005

## 3. 🚢 Assignment 2: Battleship over TCP

## Descripción
Implementación del juego de Batalla Naval sobre el protocolo TCP. A diferencia de UDP, aquí se establece una conexión persistente y confiable para asegurar que los disparos y respuestas lleguen en el orden correcto.
Reglas de Comunicación
- Disparo: 2 bytes (ej. "B6")
- Respuesta: 1 byte (0 = Miss, 1 = Hit, 2 = Kill)

## Instrucciones de Ejecución (Docker)
Este proyecto está diseñado para probarse en entornos aislados usando contenedores.
Construir el entorno:
docker-compose build

**Lanzar el Servidor:**
docker-compose up server_player


**Lanzar el Cliente (en nueva terminal):**
docker-compose run client_player

## 4. ⚙️ Tecnologías Utilizadas
- Lenguaje: Python 3.9+
- Librerías de Audio: PyAudio (para captura y reproducción)
- Contenedores: Docker y Docker Compose
- Protocolos: UDP (User Datagram Protocol) y TCP (Transmission Control Protocol)

## 5. Chat utilizado :
https://gemini.google.com/share/019eb1c7a0cc


