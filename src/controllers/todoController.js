const db = require('../models/db');

exports.getAllTodos = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM todos ORDER BY created_at DESC');
        res.json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Todo non trouvé" });
        }
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title || title.trim() === "") {
            return res.status(400).json({ success: false, message: "Le titre est requis" });
        }
        const result = await db.query(
            'INSERT INTO todos (title) VALUES ($1) RETURNING *',
            [title]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const result = await db.query(
            'UPDATE todos SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *',
            [title, completed, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ success: false, message: "Todo inexistant" });
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ success: false, message: "Todo inexistant" });
        res.json({ success: true, message: "Supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};