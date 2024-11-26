const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lumos",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Endpoint para Light Intensity
app.get("/light-intensity", (req, res) => {
  const { user_id } = req.query; // Recibe el ID de usuario como parámetro de consulta

  // Validar que se haya proporcionado el parámetro user_id
  if (!user_id) {
    return res
      .status(400)
      .json({ error: "El parámetro user_id es obligatorio" });
  }

  // Consulta para obtener datos filtrados por user_id
  const query = `
        SELECT intensity_id, intensity_level
        FROM LightIntensity
        WHERE user_id = ${user_id}
        ORDER BY intensity_id
    `;

  db.query(query, [parseInt(user_id)], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching Light Intensity data" });
    } else {
      res.json(results);
    }
  });
});

// Endpoint para Energy Consumption
app.get("/energy-consumption", (req, res) => {
  const { user_id } = req.query; // Recibe el ID de usuario como parámetro de consulta

  if (!user_id) {
    return res
      .status(400)
      .json({ error: "El parámetro user_id es obligatorio" });
  }

  const query = `
            SELECT usage_term, estimated_consumption, actual_consumption
            FROM EnergyConsumption
            WHERE user_id = ${user_id}
            ORDER BY usage_term
        `;

  db.query(query, [parseInt(user_id)], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching Energy Consumption data" });
    } else {
      res.json(results);
    }
  });
});

// Endpoint para Average Light Intensity
app.get("/average-light-intensity", (req, res) => {
  const { user_id } = req.query; // Recibe el ID de usuario como parámetro de consulta

  if (!user_id) {
    return res
      .status(400)
      .json({ error: "El parámetro user_id es obligatorio" });
  }

  const query = `
        SELECT intensity_id, intensity_level
        FROM LightIntensity
        WHERE user_id = ${user_id}
        ORDER BY intensity_id
    `;

  db.query(query, [parseInt(user_id)], (err, results) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error fetching Average Light Intensity data" });
    } else {
      const interval = 10;
      const avgData = [];
      for (let i = 0; i < results.length; i += interval) {
        const avg =
          results
            .slice(i, i + interval)
            .reduce((sum, item) => sum + item.intensity_level, 0) / interval;
        avgData.push({ interval: i / interval, average: avg });
      }
      res.json(avgData);
    }
  });
});

// Endpoint para Error en Energy Consumption
app.get("/energy-consumption-error", (req, res) => {
  const { user_id } = req.query; // Obtener user_id de los parámetros de consulta

  if (!user_id) {
    return res
      .status(400)
      .json({ error: "El parámetro user_id es obligatorio" });
  }

  const query = `
        SELECT usage_term, error
        FROM EnergyConsumption
        WHERE user_id = ?
        ORDER BY usage_term
    `;

  db.query(query, [parseInt(user_id)], (err, results) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error fetching Energy Consumption Error data" });
    } else {
      res.json(results);
    }
  });
});

// Ruta para obtener el último dato de EnvironmentalData dado un user_id
app.get("/api/environmental-data/last/:user_id", (req, res) => {
  const userId = req.params.user_id; // Obtener el user_id de los parámetros de la URL
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
      return res
        .status(404)
        .send("No se encontraron datos para el usuario con ID " + userId);
    }

    res.json(results[0]); // Enviar el último registro encontrado
  });
});

// Endpoint de login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Verificar que email y password se hayan enviado
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Buscar el usuario por email y verificar contraseña
  const query = "SELECT * FROM User WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ error: "Error querying the database." });
    }

    // Verificar si el usuario existe
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = results[0];
    // Retornar éxito
    return res.json({
      message: "Login successful.",
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        ip_address: user.ip_address,
        mac_address: user.mac_address,
      },
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
