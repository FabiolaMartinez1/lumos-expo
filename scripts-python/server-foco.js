const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

// Middleware para permitir CORS y analizar JSON
app.use(cors());
app.use(express.json());

app.post("/color", (req, res) => {
  const { rgb } = req.body;

  if (rgb === undefined) {
    return res.status(400).send("Parámetro RGB faltante.");
  }

  console.log(`[LOG] Cambiando color del foco a RGB: ${rgb}`);

  exec(`python cambiar_color.py ${rgb}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`[ERROR] ${error.message}`);
      return res
        .status(500)
        .send("Error al ejecutar script para cambiar color.");
    }
    if (stderr) {
      console.error(`[STDERR] ${stderr}`);
      return res.status(500).send("Error interno al cambiar color.");
    }
    console.log(`[LOG] Resultado: ${stdout}`);
    res.send("Color cambiado correctamente.");
  });
});

// Endpoint para encender el foco
app.get("/encender", (req, res) => {
  console.log("[LOG] Encendiendo foco...");
  exec("python encender_foco.py", (error, stdout, stderr) => {
    if (error) {
      console.error(`[ERROR] ${error.message}`);
      return res
        .status(500)
        .send("Error al ejecutar script para encender el foco.");
    }
    console.log(`[LOG] Resultado: ${stdout}`);
    res.send("Foco encendido.");
  });
});

// Endpoint para apagar el foco
app.get("/apagar", (req, res) => {
  console.log("[LOG] Apagando foco...");
  exec("python apagar_foco.py", (error, stdout, stderr) => {
    if (error) {
      console.error(`[ERROR] ${error.message}`);
      return res
        .status(500)
        .send("Error al ejecutar script para apagar el foco.");
    }
    console.log(`[LOG] Resultado: ${stdout}`);
    res.send("Foco apagado.");
  });
});

app.get("/incrementar", (req, res) => {
  console.log("[LOG] Incrementando luminosidad...");
  exec("python incrementar_luminosidad.py", (error, stdout, stderr) => {
    if (error) {
      console.error(`[ERROR] ${error.message}`);
      return res
        .status(500)
        .send("Error al ejecutar script para incrementar la luminosidad.");
    }
    console.log(`[LOG] Resultado: ${stdout}`);
    res.send("Luminosidad incrementada.");
  });
});

app.get("/reducir", (req, res) => {
  console.log("[LOG] Reduciendo luminosidad...");
  exec("python reducir_luminosidad.py", (error, stdout, stderr) => {
    if (error) {
      console.error(`[ERROR] ${error.message}`);
      return res
        .status(500)
        .send("Error al ejecutar script para reducir la luminosidad.");
    }
    console.log(`[LOG] Resultado: ${stdout}`);
    res.send("Luminosidad reducida.");
  });
});

app.listen(PORT, () => {
  console.log(`[LOG] Servidor iniciado en http://localhost:${PORT}`);
});
