/* Lazy load images in grid */

(function () {
    function initImageGrid() {
        const images = document.querySelectorAll('.image-grid-column img');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            }, { rootMargin: '50px' });

            images.forEach(img => observer.observe(img));
        }
    }

    document.addEventListener('DOMContentLoaded', initImageGrid);
})();

// Masquer le loading spinner et adapter la hauteur une fois l'iframe chargée
document.addEventListener('DOMContentLoaded', function() {
    const pdfItems = document.querySelectorAll('.pdf-item');
    
    pdfItems.forEach(pdfItem => {
        const iframe = pdfItem.querySelector('iframe');
        const loading = pdfItem.querySelector('.pdf-loading');
        
        if (iframe) {
            // Timeout de sécurité pour masquer le spinner après 5 secondes
            const timeoutId = setTimeout(() => {
                if (loading) {
                    loading.classList.add('hidden');
                }
            }, 5000);
            
            // Masquer le spinner dès que l'iframe est chargée
            iframe.addEventListener('load', function() {
                clearTimeout(timeoutId);
                
                if (loading) {
                    loading.classList.add('hidden');
                }
                
                // Essayer de détecter l'orientation du PDF
                // Note: Cette méthode est limitée car on ne peut pas accéder au contenu de l'iframe
                // mais on peut utiliser des attributs data-orientation sur les éléments HTML
                try {
                    // Si vous connaissez l'orientation, ajoutez data-orientation="portrait" ou "landscape"
                    const orientation = pdfItem.getAttribute('data-orientation');
                    
                    if (orientation === 'portrait') {
                        pdfItem.classList.add('portrait');
                    } else if (orientation === 'landscape') {
                        pdfItem.classList.add('landscape');
                    }
                    
                    // Sinon, on peut essayer de détecter basé sur les dimensions de l'iframe
                    // (méthode approximative)
                    if (!orientation) {
                        const rect = iframe.getBoundingClientRect();
                        if (rect.width && rect.height) {
                            const ratio = rect.width / rect.height;
                            if (ratio < 0.9) {
                                pdfItem.classList.add('portrait');
                            } else if (ratio > 1.3) {
                                pdfItem.classList.add('landscape');
                            }
                        }
                    }
                } catch (e) {
                    console.log('Impossible de détecter l\'orientation:', e);
                }
            });
            
            // Gérer les erreurs de chargement
            iframe.addEventListener('error', function() {
                clearTimeout(timeoutId);
                if (loading) {
                    loading.classList.add('hidden');
                    // Optionnel: afficher un message d'erreur
                    const errorMsg = document.createElement('div');
                    errorMsg.textContent = 'Erreur de chargement';
                    errorMsg.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #666;';
                    pdfItem.appendChild(errorMsg);
                }
            });
        }
    });
});