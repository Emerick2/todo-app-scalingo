// public/script.js

// Récupération des éléments HTML
const apiStatusElement = document.getElementById('api-status');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Tableau pour stocker les tâches en mémoire (local, sans BD pour l'instant)
let todos = [];


// Vérifie si l'API est accessible
async function checkApiHealth() {
  try {
    const response = await fetch('/api/health');

    if (!response.ok) {
      throw new Error('Réponse non OK');
    }

    const data = await response.json();

    if (data.status === 'OK') {
      apiStatusElement.textContent = 'Statut API : CONNECTÉE';
      apiStatusElement.style.color = 'green';
    } else {
      apiStatusElement.textContent = 'Statut API : PROBLÈME';
      apiStatusElement.style.color = 'orange';
    }
  } catch (error) {
    console.error('Erreur lors du check API :', error);
    apiStatusElement.textContent = 'Statut API : NON DISPONIBLE';
    apiStatusElement.style.color = 'red';
  }
}


// Lancer la vérification dès que la page est chargée
document.addEventListener('DOMContentLoaded', () => {
  checkApiHealth();
});


// Affiche toutes les tâches dans la liste <ul>
function renderTodos() {
  // On vide la liste avant de la reconstruire
  todoList.innerHTML = '';

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.textContent = todo.title;

    // Bouton pour supprimer la tâche
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', () => {
      deleteTodo(todo.id);
    });

    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

// Ajoute une nouvelle tâche dans le tableau
function addTodo(title) {
  const newTodo = {
    id: Date.now(), // identifiant simple basé sur le temps
    title,
    completed: false,
  };

  todos.push(newTodo);
  renderTodos();
}

// Supprime une tâche par id
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}


// Gestion de la soumission du formulaire
todoForm.addEventListener('submit', (event) => {
  event.preventDefault(); // empêche le rechargement de la page

  const title = todoInput.value.trim();
  if (title === '') {
    return;
  }

  addTodo(title);
  todoInput.value = '';
  todoInput.focus();
});

document.addEventListener('DOMContentLoaded', () => {
  checkApiHealth();
  renderTodos(); // au cas où on ait déjà des tâches plus tard
});
