import socket
import json
import sys

# Dirección IP y puerto del foco
FOCO_IP = "192.168.20.85"  # Cambia esto por la IP del foco
FOCO_PORT = 55443         # Puerto estándar para Yeelight

# Obtener el color RGB del argumento
if len(sys.argv) < 2:
    print("[ERROR] Falta el argumento RGB.")
    sys.exit(1)

rgb_color = int(sys.argv[1])  # RGB en formato entero

# Comando para cambiar el color
command = {
    "id": 1,
    "method": "set_rgb",
    "params": [rgb_color, "smooth", 500]  # Cambiar color con efecto suave
}

def send_command(ip, port, command):
    try:
        payload = json.dumps(command) + "\r\n"
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(5)
        s.connect((ip, port))
        s.send(payload.encode("utf-8"))
        response = s.recv(1024).decode("utf-8")
        s.close()
        print("[LOG] Respuesta del foco:", response)
    except Exception as e:
        print(f"[ERROR] Error al enviar comando al foco: {e}")

# Enviar el comando
send_command(FOCO_IP, FOCO_PORT, command)
