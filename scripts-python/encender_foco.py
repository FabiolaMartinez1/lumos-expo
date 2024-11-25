import socket
import json

# Dirección IP y puerto del foco
FOCO_IP = "192.168.20.85"  # Cambia esto por la IP del foco
FOCO_PORT = 55443          # Puerto estándar para Yeelight

# Comando para encender el foco
command_power_on = {
    "id": 1,
    "method": "set_power",
    "params": ["on", "smooth", 500]  # Encender con efecto suave (500ms)
}

# Comando para ajustar brillo al 50%
command_brightness = {
    "id": 2,
    "method": "set_bright",
    "params": [50, "smooth", 500]  # Ajustar brillo al 50% con efecto suave (500ms)
}

def send_command(ip, port, command):
    try:
        # Convertir el comando a JSON
        payload = json.dumps(command) + "\r\n"
        
        # Crear socket TCP
        print(f"[LOG] Intentando conectar al foco {ip}:{port}...")
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(5)  # Tiempo de espera de 5 segundos
        s.connect((ip, port))
        
        # Enviar comando
        s.send(payload.encode("utf-8"))
        print("[LOG] Comando enviado:", payload.strip())
        
        # Recibir respuesta
        response = s.recv(1024).decode("utf-8")
        print("[LOG] Respuesta del foco:", response)
        
        # Cerrar conexión
        s.close()
        return response
    except Exception as e:
        print(f"[ERROR] Error al conectar o enviar comando al foco: {e}")
        return None

# Encender el foco
send_command(FOCO_IP, FOCO_PORT, command_power_on)

# Ajustar el brillo al 50%
send_command(FOCO_IP, FOCO_PORT, command_brightness)
