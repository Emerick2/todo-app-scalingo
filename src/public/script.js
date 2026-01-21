listeTache = []

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
}

function RetirerUneTache(tache){//tache est un string
    for (let i = 0; i < listeTache.length; i++) {
        if (listeTache[i] == tache){
            listeTache.splice(i, 1);
        }
    }
}

document.getElementById('ajouterTache').addEventListener('submit', function(e) {
    e.preventDefault(); 

    fetch('/name-form', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('reponse').textContent = `${data}`;
    });
});




checkHealth();
