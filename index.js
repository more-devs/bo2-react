const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// CREATE
app.post("/personass", async (req, res) => {
    const { nombre, edad } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO personass (nombre, edad) VALUES (?, ?)",
            [nombre, edad]
        );
        res.json({ id: result.insertId, nombre, edad });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ
app.get("/personass", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM personass");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
app.put("/personass/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, edad } = req.body;
    try {
        await pool.query("UPDATE personass SET nombre = ?, edad = ? WHERE id = ?", [
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
app.delete("/personass/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM personass WHERE id = ?", [id]);
        res.send("Persona eliminada");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
