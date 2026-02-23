const express = require('express');
const path = require('path');
const api = require('./api');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

app.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/', function (req, res) {
  res.redirect('/index');
});

app.listen(3000, () => console.log('Serveur actif sur le port 3000'));

// on y accède en fesant : http://localhost:3000
