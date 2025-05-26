/**
 * Mini-Netflix - JavaScript client-side
 */

document.addEventListener('DOMContentLoaded', function() {
    // Upload file name display
    const fileInput = document.getElementById('video');
    if (fileInput) {
      fileInput.addEventListener('change', function(e) {
        const fileName = e.target.files[0]?.name || 'Aucun fichier sélectionné';
        const fileSize = e.target.files[0]?.size ? formatFileSize(e.target.files[0].size) : '';
        
        // Ajouter une étiquette à côté de l'input pour montrer le fichier sélectionné
        let fileLabel = document.querySelector('.file-selected');
        
        if (!fileLabel) {
          fileLabel = document.createElement('div');
          fileLabel.className = 'file-selected';
          fileInput.parentNode.appendChild(fileLabel);
        }
        
        fileLabel.textContent = `${fileName} (${fileSize})`;
      });
    }
    
    // Préchargement des vignettes vidéo (page vidéos)
    const videoThumbnails = document.querySelectorAll('.video-thumbnail video');
    videoThumbnails.forEach(video => {
      // Chercher un moment intéressant pour la vignette (5 secondes dans la vidéo)
      video.addEventListener('loadeddata', function() {
        if (video.duration > 5) {
          video.currentTime = 5;
        } else {
          video.currentTime = video.duration / 3;
        }
      });
    });
    
    // Fonction pour formater la taille du fichier
    function formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Validation d'upload (taille maximale)
    const uploadForm = document.querySelector('form[action="/upload"]');
    if (uploadForm) {
      uploadForm.addEventListener('submit', function(e) {
        if (fileInput && fileInput.files[0]) {
          const maxSize = 100 * 1024 * 1024; // 100MB
          if (fileInput.files[0].size > maxSize) {
            e.preventDefault();
            alert('Le fichier est trop volumineux. La taille maximale autorisée est de 100 MB.');
          }
        }
      });
    }
  });