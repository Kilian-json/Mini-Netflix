Mini-Netflix - Application ExpressJS
Une application web simple permettant de télécharger, lister et visionner des vidéos, développée avec ExpressJS.

Fonctionnalités
Upload de vidéos via un formulaire HTML avec validation de type de fichier
Listing dynamique des vidéos téléchargées
Lecteur vidéo intégré pour visionner les fichiers
Interface responsive inspirée de Netflix


Prérequis
Node.js (v14.x ou supérieur)
npm (v6.x ou supérieur)

Installation
Clonez ce dépôt :
bash
git clone 
cd mini-netflix

Installez les dépendances :
bash
npm install

Créez le dossier pour stocker les vidéos (déjà géré automatiquement dans l'application) :
bash
mkdir uploads

Lancez l'application :
bash
npm start

Accédez à l'application depuis votre navigateur :
http://localhost:3000

Limitations
Types de fichiers acceptés : MP4 et WebM uniquement
Taille maximale de fichier : 100 MB

Améliorations possibles
Compression vidéo avec ffmpeg
Pour ajouter la fonctionnalité de compression vidéo avec ffmpeg :

Installez ffmpeg sur votre système
Ajoutez la dépendance fluent-ffmpeg :
bash
npm install fluent-
