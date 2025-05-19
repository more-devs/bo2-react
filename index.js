const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// CREATE
app.post("/personas", async (req, res) => {
    const { nombre, edad } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO personas (nombre, edad) VALUES (?, ?)",
            [nombre, edad]
        );
        res.json({ id: result.insertId, nombre, edad });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ
app.get("/personas", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM personas");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
app.put("/personas/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, edad } = req.body;
    try {
        await pool.query("UPDATE personas SET nombre = ?, edad = ? WHERE id = ?", [
            nombre,
            edad,
            id,
        ]);
        res.send("Persona actualizada");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
app.delete("/personas/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM personas WHERE id = ?", [id]);
        res.send("Persona eliminada");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
