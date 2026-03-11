const express = require("express");
const cors = require("cors");
const path = require("path");
const todoRoutes = require('./routes/todos');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));

app.use('/api/todos', todoRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    success: true,
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
