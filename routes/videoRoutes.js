const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const upload = require('../middleware/upload');

// Page d'accueil avec formulaire d'upload
router.get('/', (req, res) => {
  res.render('index', { title: 'Mini-Netflix - Upload de vidéos' });
});

// Route pour poster une nouvelle vidéo
router.post('/upload', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Aucun fichier n\'a été uploadé.');
    }
    
    // Rediriger vers la liste des vidéos après l'upload réussi
    res.redirect('/videos');
  } catch (error) {
    res.status(500).send(`Erreur lors de l'upload: ${error.message}`);
  }
});

// Route pour afficher la liste des vidéos
router.get('/videos', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    const files = await fs.readdir(uploadsDir);
    
    // Filtrer pour ne garder que les fichiers vidéo
    const videoFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.mp4' || ext === '.webm';
    });
    
    // Obtenir des métadonnées pour chaque fichier (taille, date de création)
    const videoList = await Promise.all(videoFiles.map(async (file) => {
      const filePath = path.join(uploadsDir, file);
      const stats = await fs.stat(filePath);
      
      return {
        name: file,
        path: `/uploads/${file}`,
        size: (stats.size / (1024 * 1024)).toFixed(2) + ' MB',
        createdAt: stats.ctime
      };
    }));
    
    res.render('videos', { 
      title: 'Mini-Netflix - Liste des vidéos',
      videos: videoList
    });
  } catch (error) {
    res.status(500).send(`Erreur lors de la récupération des vidéos: ${error.message}`);
  }
});

// Route pour le lecteur vidéo
router.get('/player/:filename', async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);
  
  try {
    // Vérifier si le fichier existe
    await fs.access(filePath);
    
    res.render('player', {
      title: `Lecture de ${filename}`,
      video: {
        name: filename,
        path: `/uploads/${filename}`
      }
    });
  } catch (error) {
    res.status(404).send('Vidéo non trouvée');
  }
});

module.exports = router;