const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration des vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Importer les routes
try {
  const videoRoutes = require('./routes/videoRoutes');
  app.use('/', videoRoutes);
} catch (error) {
  console.error('Erreur lors du chargement des routes:', error.message);
}

// Route de secours en cas d'erreur de chargement des routes
app.get('/', (req, res) => {
  res.send('Mini-Netflix est en cours de configuration. Veuillez vérifier la console pour les erreurs.');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur Mini-Netflix démarré sur http://localhost:${PORT}`);
});