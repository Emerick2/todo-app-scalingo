const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 
// app.use(express.urlencoded({ extended: true })); 
// app.use(express.static('public')); 

// app.get('/index', function(req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/', function (req, res) {
//   res.redirect('/index');
// });
// app.get('/', (req, res) => {
//     res.json({ message: "Bienvenue sur le site !" });
// });

app.get('/api/health', (req, res) => {
    res.json({ 
        status: "OK", 
        uptime: process.uptime(),
        timestamp: Date.now() 
    });
});

// app.use(function(req, res) {
//     res.status(404).sendFile(path.join(__dirname, 'src', '404.html'));
// });

app.use((req, res) => {
    res.status(404).json({ error: "Ressource non trouvée" });
});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Serveur lancé sur le port ' + server.address().port);
});

//-----

module.exports = app;
