let listeTache = JSON.parse(localStorage.getItem('taches')) || []

async function checkHealth() {
    const statutDeConnexionAPITexte = document.getElementById("statutDeConnexionAPI");
    try {
        const response = await fetch('http://localhost:3000/api/health');
        const data = await response.json();
        console.log("Statut de l'API :", data.status);
        console.log("Données complètes :", data);

        if (statutDeConnexionAPITexte != null){
            statutDeConnexionAPITexte.textContent = "Statut de connexion à l'API : connecté";
        }
    } catch (error) {
        console.error("Erreur lors de l'appel :", error);
        if (statutDeConnexionAPITexte != null){
            statutDeConnexionAPITexte.textContent = "Statut de connexion à l'API : non-connecté";
        }
    }
}

function AjouterUneTache(tache){//tache est un string
    tache = tache.trim();
    if (tache === "") return;
    listeTache.push(tache);
    localStorage.setItem('taches', JSON.stringify(listeTache));
    AfficherLesTaches();
}

function RetirerUneTache(tache){//tache est un int
    listeTache.splice(tache, 1);
    localStorage.setItem('taches', JSON.stringify(listeTache));
    AfficherLesTaches();
}

function AfficherLesTaches(){
    const block = document.getElementById("listeDesTache");
    block.innerHTML = "";
    for (let i = 0; i < listeTache.length; i++) {
        const clone = document.getElementById('template-tache').content.cloneNode(true);
        const form = clone.querySelector('form');
        const texteElement = clone.querySelector('.laValeurTexte');

        texteElement.textContent = listeTache[i];
        const long = i;
        const maValeurId = long;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            RetirerUneTache(maValeurId);             
            form.remove();
        });
        block.appendChild(clone);
    }
}

document.getElementById('ajouterTache').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('message');
    if (input != null){
        const messageSaisi = input.value;
        AjouterUneTache(messageSaisi);
        input.value = "";
    }
});

checkHealth();
AfficherLesTaches();
