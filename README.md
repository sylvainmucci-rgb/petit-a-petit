# Petit à Petit

Un compagnon bienveillant, gratuit et sans compte, pour prendre soin de soi à son rythme.

Application web progressive (PWA) en français, pensée pour les personnes en situation de surpoids ou d’obésité : encouragements au quotidien, suivi du poids, mouvements doux, idées de repas simples, et un espace de motivation sans jugement.

**Ce n’est pas un avis médical.** Parlez à un médecin avant de commencer un programme, surtout en cas de problème de santé.

## Fonctionnalités (version 1)

- **Accueil** : courte introduction (prénom, taille, poids, objectif réaliste à 5–10 %), message du jour, petits objectifs à cocher (eau, marche, exercice, repas), compteur de jours d’élan.
- **Mon poids** : historique, courbe, progression vers l’objectif, célébration des paliers (chaque kilo, 5 %, 10 %), IMC présenté avec douceur, tour de taille optionnel.
- **Bouger** : une vingtaine d’exercices à faible impact (marche, chaise, mobilité, renforcement doux, pistes d’aquagym), 3 programmes prêts à l’emploi, minuteur intégré.
- **Manger** : méthode de l’assiette, portions, hydratation, faim vs envie, une vingtaine d’idées de repas simples et économiques, bilan alimentaire optionnel du jour.
- **Motivation** : badges, journal d’humeur, conseils pour les jours difficiles, exercice de cohérence cardiaque.

Les données restent **dans votre navigateur** (aucun serveur, aucun compte, pas de publicité).

## Utiliser l’appli en local

Depuis le dossier de l’appli :

```bash
python3 -m http.server 8080
```

Puis ouvrez [http://127.0.0.1:8080/](http://127.0.0.1:8080/) dans le navigateur.

Pour l’installer sur un téléphone : ouvrez le site (en HTTPS une fois en ligne), puis « Ajouter à l’écran d’accueil » dans le menu du navigateur. Sur iPhone, utilisez le bouton Partager de Safari.

## Mettre en ligne gratuitement

L’appli est un **site statique** : chemins relatifs, manifeste et service worker prévus pour fonctionner à la racine **ou dans un sous-chemin** (ex. `https://vous.github.io/appli-perte-de-poids/`). Aucune compilation n’est nécessaire.

**GitHub Pages** : déposez le contenu de ce dossier (ou le dépôt) et activez Pages (racine ou dossier `/docs`). Si le site est servi depuis un sous-dossier, cela fonctionne tel quel.

**Render (Static Site)** : créez un *Static Site*, commande de build vide, dossier de publication = la racine du dépôt (ou le dossier qui contient `index.html`).

Après déploiement, l’appli s’ouvre dans le navigateur et peut s’installer comme une application, y compris hors ligne.

## Vie privée

Rien n’est envoyé nulle part. Pour changer d’appareil, utilisez l’export des données dans l’onglet Motivation, puis l’import sur l’autre appareil. Effacer les données du navigateur efface aussi l’appli.

## Licence

Usage personnel libre, sans but commercial imposé. Textes et messages originaux de l’appli.
