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

// Ruta para obtener el último dato de EnvironmentalData dado un user_id
app.get("/api/environmental-data/last/:user_id", (req, res) => {
    const userId = req.params.user_id;  // Obtener el user_id de los parámetros de la URL
    const query = `
        SELECT * FROM EnvironmentalData
        WHERE user_id = ?
        ORDER BY timestamp_data DESC
        LIMIT 1
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error al obtener datos de EnvironmentalData:", err);
            res.status(500).send("Error al obtener datos");
            return;
        }
        
        // Verificar si se encontraron resultados
        if (results.length === 0) {
            return res.status(404).send("No se encontraron datos para el usuario con ID " + userId);
        }

        res.json(results[0]);  // Enviar el último registro encontrado
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
