import socket
import json

# Dirección IP y puerto del foco
FOCO_IP = "192.168.20.85"  # Cambia esto por la IP del foco
FOCO_PORT = 55443         # Puerto estándar para Yeelight

# Función para enviar un comando y recibir respuesta
def send_command(ip, port, command):
    try:
        payload = json.dumps(command) + "\r\n"
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(5)
        s.connect((ip, port))
        s.send(payload.encode("utf-8"))
        response = s.recv(1024).decode("utf-8")
        s.close()
        return json.loads(response)
    except Exception as e:
        print(f"[ERROR] Error al enviar comando: {e}")
        return None

# Obtener el brillo actual
get_brightness_command = {
    "id": 1,
    "method": "get_prop",
    "params": ["bright"]
}
response = send_command(FOCO_IP, FOCO_PORT, get_brightness_command)
if response and "result" in response:
    current_brightness = int(response["result"][0])
    print(f"[LOG] Brillo actual: {current_brightness}")

    # Reducir el brillo en 10%
    new_brightness = max(current_brightness - 10, 1)  # Mínimo 1
    decrease_brightness_command = {
        "id": 2,
        "method": "set_bright",
        "params": [new_brightness, "smooth", 500]
    }
    send_command(FOCO_IP, FOCO_PORT, decrease_brightness_command)
    print(f"[LOG] Brillo reducido a: {new_brightness}")
else:
    print("[ERROR] No se pudo obtener el brillo actual.")
