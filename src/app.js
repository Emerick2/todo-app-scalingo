var express = require('express');
var path = require('path');
var app = express();

app.use(express.urlencoded({ extended: true })); // POST
app.use(express.static('src')); // CSS/JS

app.get('/accueil', function(req, res) {
  res.sendFile(path.join(__dirname, 'src', 'accueil.html'));
});

app.get('/', function (req, res) {
  res.redirect('/accueil');
});

app.use(function(req, res) {
    res.status(404).sendFile(path.join(__dirname, 'src', '404.html'));
});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Serveur lancé sur le port ' + server.address().port);
});

//-----

app.listen(3000, () => console.log('Serveur actif sur le port 3000'));
