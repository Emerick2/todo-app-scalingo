const apiUrl = `${window.location.origin}`;
const API_TODOS = `${apiUrl}/api/todos`;

let listeTache = [];

async function ChargerDepuisServeur() {
    try {
        const response = await fetch(API_TODOS);
        const result = await response.json();
        if (result.success) {
            listeTache = result.data; // (id, title, completed)
            AfficherLesTaches();
        }
    } catch (error) {
        console.error("Erreur chargement :", error);
    }
}

async function checkHealth() {
    const statutDeConnexionAPITexte = document.getElementById("statutDeConnexionAPI");
    try {
        const response = await fetch(`${apiUrl}/api/health`);
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

async function AjouterUneTache(titre) {
    titre = titre.trim();
    if (titre === "") return;

    try {
        const response = await fetch(API_TODOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: titre })
        });
        if (response.ok) {
            await ChargerDepuisServeur();
        }
    } catch (error) {
        console.error("Erreur ajout :", error);
    }
}

async function RetirerUneTache(id) {
    try {
        const response = await fetch(`${API_TODOS}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            await ChargerDepuisServeur();
        }
    } catch (error) {
        console.error("Erreur suppression :", error);
    }
}

async function DireQueLaTacheEstFini(id, nouvelleValeur) {
    try {
        const response = await fetch(`${API_TODOS}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: nouvelleValeur })
        });
        if (response.ok) {
            await ChargerDepuisServeur();
        }
    } catch (error) {
        console.error("Erreur mise à jour :", error);
    }
}

function AfficherLesTaches(){
    const block = document.getElementById("listeDesTache");
    block.innerHTML = "";
    for (let i = 0; i < listeTache.length; i++) {
        const clone = document.getElementById('template-tache').content.cloneNode(true);
        const form_retirerTache = clone.querySelector('.retirerTache');
        const form_finiTache = clone.querySelector('.finiTache');
        const texteElement = clone.querySelector('.laValeurTexte');
        const texteCreatedAt = clone.querySelector('.dateDeLaTache');

        const maValeurId = listeTache[i].id;
        const createdAt = new Date(listeTache[i].created_at).toLocaleDateString('fr-FR');
        const valeurCompleted = listeTache[i].completed;
        
        texteElement.textContent = listeTache[i].title;
        texteCreatedAt.textContent = createdAt;
        if (valeurCompleted){
            clone.querySelector('.tacheEffectuer').style.backgroundColor = "rgb(159, 255, 173)";
        }

        form_retirerTache.addEventListener('submit', function(e) {
            e.preventDefault();
            RetirerUneTache(maValeurId);             
            form_retirerTache.remove();
        });

        form_finiTache.addEventListener('submit', function(e) {
            e.preventDefault();
            DireQueLaTacheEstFini(maValeurId, !valeurCompleted);
        });
        block.appendChild(clone);
    }
}

document.getElementById('ajouterTache').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('message');
    if (input != null){
        AjouterUneTache(input.value);
        input.value = "";
    }
});

checkHealth();
setInterval(checkHealth, 5000);
ChargerDepuisServeur();

console.log("Déployer avec la version 1.0.0");