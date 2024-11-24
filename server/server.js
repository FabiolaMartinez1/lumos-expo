const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configurar la conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Lumos"
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar con MySQL:", err);
        return;
    }
    console.log("Conectado a MySQL");
});

// Ruta para obtener datos de LightIntensity
app.get("/api/light-intensity", (req, res) => {
    const query = "SELECT * FROM LightIntensity";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener datos de LightIntensity:", err);
            res.status(500).send("Error al obtener datos");
            return;
        }
        res.json(results);
    });
});

// Ruta para obtener datos de EnergyConsumption
app.get("/api/energy-consumption", (req, res) => {
    const query = "SELECT * FROM EnergyConsumption";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener datos de EnergyConsumption:", err);
            res.status(500).send("Error al obtener datos");
            return;
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
