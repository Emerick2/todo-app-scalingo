const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const todoRoutes = require('./routes/todos');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use('/api/todos', todoRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur la TODO API",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.originalUrl,
  });
});

module.exports = app;
