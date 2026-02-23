let listeTache = JSON.parse(localStorage.getItem('taches')) || []

async function checkHealth() {
    try {
        const response = await fetch('http://localhost:3000/api/health');
        const data = await response.json();
        console.log("Statut de l'API :", data.status);
        console.log("Données complètes :", data);
    } catch (error) {
        console.error("Erreur lors de l'appel :", error);
    }
}

function UtilisateurConnecter(){
    return true; // Il faudras vérifier plus tard sur le serveur les information comme celle-ci.
}

function AjouterUneTache(tache){//tache est un string
    listeTache.push(tache);
    localStorage.setItem('taches', JSON.stringify(listeTache));
    AfficherLesTaches();
}

function RetirerUneTache(tache){//tache est un string
    for (let i = 0; i < listeTache.length; i++) {
        if (listeTache[i] == tache){
            listeTache.splice(i, 1);
        }
    }
    localStorage.setItem('taches', JSON.stringify(listeTache));
    AfficherLesTaches();
}

function AfficherLesTaches(){
    const bloque = document.getElementById("listeDesTache");
    bloque.innerHTML = "";
    for (let i = 0; i < listeTache.length; i++) {
        bloque.innerHTML += "<p>"+listeTache[i]+"</p>";
    }
}

document.getElementById('ajouterTache').addEventListener('submit', function(e) {
    e.preventDefault();
    const messageSaisi = document.getElementById('message').value;
    console.log(messageSaisi);
    AjouterUneTache(messageSaisi);
});

checkHealth();
AfficherLesTaches();
