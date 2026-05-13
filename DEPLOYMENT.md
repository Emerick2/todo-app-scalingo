# Comment on push une feature ? (commit + push sur main = auto-staging)
- Écrire un `git add` avec les différents fichiers modifiés.
- Écrire un `git commit -m""` avec un message indiquant les modifications effectuer.
- `git push` pour pousser sur la branche actuel.
- `git switch main` pour aller sur la branche main.
- `gut pull` pour mettre à jours la branche main.
- `git merge ____` pour merge la branche souhaiter sur la branche main.
- `git push` pour mettre en ligne les modifications.
- `git push scalingo main:master` : pour mettre en ligne les modification sur Scaligno.

# Comment on déploie en prod (créer un tag, pousser) : 
- Écrire un `git add` avec les différents fichiers modifiés.
- Écrire un `git commit -m""` avec un message indiquant les modifications effectuer.
- `git push` pour pousser sur la branche actuel.
- `git switch main` pour aller sur la branche main.
- `gut pull` pour mettre à jours la branche main.
- `git merge ____` pour merge la branche souhaiter sur la branche main.
- `git push` pour mettre en ligne les modifications.
- `git tag __` pour créer un tag.
- `git push scalingo main:master` : pour mettre en ligne les modification sur Scaligno.

# Comment on fait un rollback si ça casse :
- Revenir sur une version antérieur de GitHub.
- `git push` pour mettre en ligne les modifications.
- `git push scalingo main:master` : pour mettre en ligne les modification sur Scaligno.

# Où trouver les logs en cas de problème
- Aller sur ce lien pour voir les logs : https://dashboard.scalingo.com/apps/osc-fr1/todo-app-staging/logs


