// src/server.js

// On importe l'app Express déjà configurée
const app = require("./app");

// Le port vient d'abord de la variable d'environnement PORT (prod Scalingo)
// Sinon on utilise 3000 en local
const PORT = process.env.PORT || 3000;

// On démarre le serveur HTTP
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
