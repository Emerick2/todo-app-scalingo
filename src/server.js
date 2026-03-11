require('dotenv').config();
const express = require('express');
const path = require('path');
const api = require('./api');
const { initDatabase } = require('./models/db');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);
app.use('/api/todos', todoRoutes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/index', function (req, res) {
  res.redirect('/');
});

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Base de données prête`);
      console.log(`Serveur lancé sur : http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Erreur lors du démarrage :", err);
    process.exit(1);
  });

// on y accède en fesant : http://localhost:3000
