const multer = require('multer');
const path = require('path');

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Générer un nom de fichier unique avec timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtre pour accepter uniquement les vidéos
const fileFilter = (req, file, cb) => {
  // Autoriser uniquement mp4 et webm
  if (file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
    cb(null, true);
  } else {
    cb(new Error('Format de fichier non supporté. Seuls les fichiers MP4 et WebM sont acceptés.'), false);
  }
};

// Configuration de multer
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // Limite à 100MB
  }
});

module.exports = upload;