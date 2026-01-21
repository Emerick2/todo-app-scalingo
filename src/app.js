// src/app.js

// 1) Import des librairies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// 2) Chargement des variables d'environnement (fichier .env si présent)
dotenv.config();

// 3) Création de l'application Express
const app = express();

// 4) Middlewares globaux
// Permet de lire le JSON dans le corps des requêtes (req.body)
app.use(express.json());
// Autorise les requêtes venant d'autres origines (ex: frontend sur un autre port)
app.use(cors());

// 5) Route GET / (racine)
// Cette route renvoie un petit JSON pour dire que l'API fonctionne
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur la TODO API",
  });
});

// 6) Route GET /api/health
// Sert à vérifier l'état de santé de l'application (monitoring)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// 7) Gestion des routes non trouvées (404)
// Si aucune route au-dessus ne correspond, on arrive ici.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.originalUrl,
  });
});

// 8) Export de l'app pour l'utiliser dans server.js ou dans les tests
module.exports = app;
