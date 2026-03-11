require('dotenv').config();
const app = require('./app');
const { initDatabase } = require('./models/db');

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    initDatabase().then(() => {
        app.listen(PORT, () => {
            console.log(`Base de données prête`);
            console.log(`Serveur lancé sur : http://localhost:${PORT}`);
        });
    }).catch(err => {
        console.error("Erreur fatale au démarrage :", err);
        process.exit(1);
    });
}

module.exports = { app };

// on y accède en fesant : http://localhost:3000
