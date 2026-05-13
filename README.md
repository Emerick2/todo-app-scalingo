# Todo-app-scalingo

**Todo-app** est un éditeur qui vous permettra d'écrire votre **liste de choses à faire** et de ne plus jamais **l'oublier** ! Retrouvez votre liste depuis n'importe quel appareil grâce à votre compte et maintenez-la à jour en *ajoutant* et *retirant* les données dont vous n'avez plus besoin !

### Développé par Armel et Émerick.

# **Techniques** utilisées :

* Scalingo (publication du site).
* JavaScript
* HTML
* CSS

# Comment installer et lancer localement ?

1 - Télécharger le dépôt Git.
2 - `cd todo-app-scalingo`
3 - `npm run dev`

# Adresses des déploiements :

**Staging** : [https://todo-app-staging.osc-fr1.scalingo.io/](https://todo-app-staging.osc-fr1.scalingo.io/)

# Commandes principales :

* `npm run dev`

# Comment fonctionne le pipeline CI/CD ?
Dans notre projet, nous avons intégré une gestion du CI __(Continuous Integration)__ et du CD __(Continuous Deployment)__ pour nous permettre d’automatiser les tests et le déploiement sur Scalingo de notre application.
Tout d’abord, le script `ci.yml` nous permet d’exécuter automatiquement des tests sur notre application lors des envois de commits sur la branche `main`. Cela nous permet d’éviter d’envoyer des fonctions qui causeraient des problèmes dans l’application.
Pour réduire le temps d’attente entre la création d’une nouvelle fonctionnalité de notre application et son déploiement sur le site pour le rendre accessible à tous, nous avons également ajouté deux nouvelles fonctions.
Tout d’abord, il y a `deploy-staging.yml` qui va automatiquement publier sur l’application de préproduction la nouvelle version de l’application à chaque fois que l’on poussera du code sur la branche `main`. À condition bien sûr, que les tests du `ci.yml` aient tous été validés.
Et enfin, nous avons `deploy-production.yml` qui va, lui, publier automatiquement sur l’application en production les mises à jour de la branche `main` à chaque fois que l’on créera un nouveau `tag` sur celle-ci.
Si nous voulons publier une nouvelle version, il faut donc soit le faire manuellement, soit utiliser l’une des deux techniques citées précédemment en fonction de si l’on souhaite publier nos modifications en préproduction ou en production.

```
           [ LE CODE EN LOCAL ]
                     |
                     | git push origin main
                     v
        +-----------------------------+
        |    GITHUB ACTIONS (CI)      |
        |      (script ci.yml)        |
        +-----------------------------+
                     |
        +------------+------------+
        |                         |
  [ TEST FAIL ]           [ TEST SUCCESS ]
        |                         |
        x (STOP)                  v
                     +---------------------------+
                     |     DEPLOY STAGING (CD)   |
                     |    (deploy-staging.yml)   |
                     +---------------------------+
                                  |
                                  v
                         [ APP STAGING LIVE ]
                                  |
                                  | (Validation manuelle)
                                  v
                         [ CRÉER UN TAG v* ]
                                  |
                     +------------+--------------+
                     |   DEPLOY PRODUCTION (CD)  |
                     |  (deploy-production.yml)  |
                     +---------------------------+
                                  |
                                  v
                           [ APP PROD LIVE ]
```

# Architecture du projet :
```
┌src
├──┬controllers : dossier contenant les scripts de contrôle de l'API avec les différents requête SQL exécutables.
├──┼───todoController.js : script qui contient les différentes requête SQL qui peuvent être envoyer à l'API
├──┼models : dossier contenant le script qui créé la table de donnée si elle n'existe pas encore.
├──┼───db.js : créé la base de données si elle n'existe pas.
├──┼public : dossier contenant les fichiers du site publique que les utilisateurs pourront voire.
├──┼──┬404.html : page qui apparaît sur le site si une page n'est pas trouvée.
├──┼──┼index.html : page principale du site depuis lequel l'utilisateur interagiras.
├──┼──┼script.js : script permettant à la page index de fonctionner correctement.
├──┼──┴style.css : page de CSS pour rendre la page principale du site jolie.
├──┼routes : dossier contenants les routes que l'API peut emprunter.
├──┼api.js : script qui créé et contrôle les fonctionnalités de l'API.
├──┼app.js : script qui créé et contrôle les fonctionnalités de l'application.
└──┴serveur.js : script qui ouvre le serveur permettant toutes les interaction avec l'API depuis le site.
```