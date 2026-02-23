const express = require('express');
const router = express.Router();

// Exemple de données en mémoire
let tasks = [];

// Route pour vérifier l'état de l'API
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Route pour récupérer les tâches
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Route pour ajouter une tâche
router.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
    res.status(201).json({ message: 'Tâche ajoutée avec succès' });
  } else {
    res.status(400).json({ message: 'Le contenu de la tâche ne peut pas être vide' });
  }
});

module.exports = router;
