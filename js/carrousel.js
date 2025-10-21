// ==================== LIGHTBOX pour Gallery Grid ====================
(function() {
  // Créer la structure lightbox pour la galerie si elle n'existe pas
  if (!document.getElementById('gallery-lightbox')) {
    const lightboxHTML = `
            <div id="gallery-lightbox" class="lightbox">
                <div class="lightbox-content">
                    <button class="lightbox-close" onclick="closeGalleryLightbox()">&times;</button>
                    <button class="lightbox-nav lightbox-prev" onclick="navigateGalleryLightbox(-1)">&#10094;</button>
                    <img id="gallery-lightbox-img" src="" alt="Image agrandie">
                    <button class="lightbox-nav lightbox-next" onclick="navigateGalleryLightbox(1)">&#10095;</button>
                </div>
            </div>
        `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  }
  
  // Variables globales pour la galerie
  let currentGalleryLightboxIndex = 0;
  let galleryImages = [];
  
  // Fonction d'initialisation de la galerie
  function initGalleryLightbox() {
    // Récupérer toutes les images de la galerie
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item img');
    
    if (galleryItems.length === 0) return;
    
    // Créer un tableau des sources d'images
    galleryImages = Array.from(galleryItems).map(img => img.src);
    
    // Rendre les fonctions globales
    window.galleryImages = galleryImages;
  }
  
  // Ouvrir la lightbox de la galerie
  window.openGalleryLightbox = function(index) {
    currentGalleryLightboxIndex = index;
    const lightbox = document.getElementById('gallery-lightbox');
    const img = document.getElementById('gallery-lightbox-img');
    
    if (!lightbox || !img) return;
    
    img.src = galleryImages[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  // Fermer la lightbox de la galerie
  window.closeGalleryLightbox = function() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  };
  
  // Navigation dans la lightbox de la galerie
  window.navigateGalleryLightbox = function(direction) {
    currentGalleryLightboxIndex = (currentGalleryLightboxIndex + direction + galleryImages.length) % galleryImages.length;
    const img = document.getElementById('gallery-lightbox-img');
    if (img) {
      img.src = galleryImages[currentGalleryLightboxIndex];
    }
  };
  
  // Alias pour compatibilité avec le onclick dans le HTML
  window.openLightbox = window.openGalleryLightbox;
  window.closeLightbox = window.closeGalleryLightbox;
  window.navigateLightbox = window.navigateGalleryLightbox;
  
  // Navigation clavier pour la galerie
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') navigateGalleryLightbox(1);
    if (e.key === 'ArrowLeft') navigateGalleryLightbox(-1);
    if (e.key === 'Escape') closeGalleryLightbox();
  });
  
  // Fermer au clic sur le fond
  document.addEventListener('click', (e) => {
    if (e.target.id === 'gallery-lightbox') {
      closeGalleryLightbox();
    }
  });
  
  // Initialiser au chargement de la page
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryLightbox);
  } else {
    initGalleryLightbox();
  }
})();

// ==================== LIGHTBOX pour Slider Infini ====================
(function() {
  // Créer la structure lightbox pour le slider si elle n'existe pas
  if (!document.getElementById('slider-lightbox')) {
    const lightboxHTML = `
            <div id="slider-lightbox" class="lightbox">
                <div class="lightbox-content">
                    <button class="lightbox-close" onclick="closeSliderLightbox()">&times;</button>
                    <button class="lightbox-nav lightbox-prev" onclick="navigateSliderLightbox(-1)">&#10094;</button>
                    <img id="slider-lightbox-img" src="" alt="Image agrandie">
                    <button class="lightbox-nav lightbox-next" onclick="navigateSliderLightbox(1)">&#10095;</button>
                </div>
            </div>
        `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  }
  
  // Variables globales pour le slider
  let currentSliderLightboxIndex = 0;
  let sliderImages = [];
  
  // Fonction d'initialisation du slider
  function initSliderLightbox() {
    // Récupérer toutes les images du slider
    const sliderItems = document.querySelectorAll('.infinite-slider .slider-item img');
    
    if (sliderItems.length === 0) return;
    
    // Créer un tableau des sources d'images uniques
    sliderImages = Array.from(sliderItems).map(img => img.src);
    
    // Ajouter les événements de clic sur chaque image
    sliderItems.forEach((img, index) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        openSliderLightbox(index);
      });
    });
  }
  
  // Ouvrir la lightbox du slider
  window.openSliderLightbox = function(index) {
    currentSliderLightboxIndex = index;
    const lightbox = document.getElementById('slider-lightbox');
    const img = document.getElementById('slider-lightbox-img');
    
    if (!lightbox || !img) return;
    
    img.src = sliderImages[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  // Fermer la lightbox du slider
  window.closeSliderLightbox = function() {
    const lightbox = document.getElementById('slider-lightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  };
  
  // Navigation dans la lightbox du slider
  window.navigateSliderLightbox = function(direction) {
    currentSliderLightboxIndex = (currentSliderLightboxIndex + direction + sliderImages.length) % sliderImages.length;
    const img = document.getElementById('slider-lightbox-img');
    if (img) {
      img.src = sliderImages[currentSliderLightboxIndex];
    }
  };
  
  // Navigation clavier pour le slider
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('slider-lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') navigateSliderLightbox(1);
    if (e.key === 'ArrowLeft') navigateSliderLightbox(-1);
    if (e.key === 'Escape') closeSliderLightbox();
  });
  
  // Fermer au clic sur le fond
  document.addEventListener('click', (e) => {
    if (e.target.id === 'slider-lightbox') {
      closeSliderLightbox();
    }
  });
  
  // Initialiser au chargement de la page
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSliderLightbox);
  } else {
    initSliderLightbox();
  }
})();

// ==================== CARROUSELS ADAPTATIFS AVEC ZOOM ====================
(function() {
  'use strict';
  
  // ========== GESTION LIGHTBOX ZOOM ==========
  class PosterLightbox {
    constructor() {
      this.lightbox = document.getElementById('poster-lightbox');
      this.lightboxImg = document.getElementById('poster-lightbox-img');
      this.closeBtn = document.querySelector('.poster-lightbox-close');
      
      if (!this.lightbox || !this.lightboxImg) {
        this.createLightbox();
      }
      
      this.init();
    }
    
    createLightbox() {
      const lightboxHTML = `
                <div id="poster-lightbox" class="poster-lightbox">
                    <div class="poster-lightbox-content">
                        <button class="poster-lightbox-close" aria-label="Fermer">&times;</button>
                        <img id="poster-lightbox-img" src="" alt="Affiche agrandie">
                        <div class="poster-lightbox-info">
                            <span class="fr-text">Cliquez à l'extérieur pour fermer</span>
                            <span class="en-text" style="display:none;">Click outside to close</span>
                        </div>
                    </div>
                </div>
            `;
      document.body.insertAdjacentHTML('beforeend', lightboxHTML);
      
      this.lightbox = document.getElementById('poster-lightbox');
      this.lightboxImg = document.getElementById('poster-lightbox-img');
      this.closeBtn = document.querySelector('.poster-lightbox-close');
    }
    
    init() {
      // Bouton fermer
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }
      
      // Clic sur le fond
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.close();
        }
      });
      
      // Touche Échap
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
          this.close();
        }
      });
    }
    
    open(imageUrl) {
      this.lightboxImg.src = imageUrl;
      this.lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    close() {
      this.lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  
  // Instance globale de la lightbox
  let posterLightbox;
  
  // ========== CLASSE CARROUSEL ADAPTATIF ==========
  class AdaptiveCarousel {
    constructor(carouselId, dotsId) {
      this.carousel = document.getElementById(carouselId);
      this.dotsContainer = document.getElementById(dotsId);
      
      if (!this.carousel || !this.dotsContainer) return;
      
      this.slides = [];
      this.currentIndex = 1; // Commence au milieu
      this.isAnimating = false;
      
      this.init();
    }
    
    init() {
      // Initialiser la lightbox si pas encore fait
      if (!posterLightbox) {
        posterLightbox = new PosterLightbox();
      }
      
      // Récupérer les données des affiches
      this.collectSlides();
      
      // Configurer les événements
      this.setupEvents();
      
      // Afficher la slide initiale
      this.updateCarousel(false);
      
      // Activer le zoom sur toutes les images
      this.enableZoom();
    }
    
    collectSlides() {
      const allCards = this.carousel.querySelectorAll('[data-index]');
      
      allCards.forEach(card => {
        const format = card.getAttribute('data-format') || 'portrait';
        
        // Récupérer l'image
        const img = card.querySelector('img');
        const posterUrl = img ? img.getAttribute('src') : '';
        
        // Récupérer les textes
        const titleFrElem = card.querySelector('.carousel-card-content .fr-text');
        const titleEnElem = card.querySelector('.carousel-card-content .en-text');
        const allFrTexts = card.querySelectorAll('.carousel-card-content .fr-text');
        const allEnTexts = card.querySelectorAll('.carousel-card-content .en-text');
        
        const titleFr = titleFrElem ? titleFrElem.textContent : 'Affiche santé';
        const titleEn = titleEnElem ? titleEnElem.textContent : 'Health poster';
        const descFr = allFrTexts[1] ? allFrTexts[1].textContent : '';
        const descEn = allEnTexts[1] ? allEnTexts[1].textContent : '';
        
        // Lien PDF
        const link = card.querySelector('.view-pdf-btn');
        const pdfLink = link ? link.getAttribute('href') : '';
        
        this.slides.push({
          format,
          posterUrl,
          pdfLink,
          titleFr,
          titleEn,
          descFr,
          descEn
        });
      });
    }
    
    setupEvents() {
      // Boutons de navigation
      const prevBtn = this.carousel.querySelector('.carousel-nav-btn.prev');
      const nextBtn = this.carousel.querySelector('.carousel-nav-btn.next');
      
      if (prevBtn) prevBtn.addEventListener('click', () => this.navigate(-1));
      if (nextBtn) nextBtn.addEventListener('click', () => this.navigate(1));
      
      // Indicateurs (dots)
      const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSlide(index));
      });
      
      // Navigation clavier
      document.addEventListener('keydown', (e) => {
        if (!posterLightbox.lightbox.classList.contains('active')) {
          if (e.key === 'ArrowLeft') this.navigate(-1);
          if (e.key === 'ArrowRight') this.navigate(1);
        }
      });
      
      // Clic sur cartes latérales
      const sideCards = this.carousel.querySelectorAll('.carousel-side-card');
      sideCards.forEach(card => {
        card.addEventListener('click', (e) => {
          // Si clic sur l'image, ouvrir le zoom
          if (e.target.closest('.poster-preview')) {
            const imgUrl = card.querySelector('img')?.src;
            if (imgUrl) {
              posterLightbox.open(imgUrl);
              return;
            }
          }
          
          // Sinon, naviguer
          if (card.classList.contains('left')) {
            this.navigate(-1);
          } else {
            this.navigate(1);
          }
        });
      });
    }
    
    enableZoom() {
      // Activer le zoom sur l'affiche principale
      const mainPoster = this.carousel.querySelector('.carousel-main-card .poster-main');
      if (mainPoster) {
        mainPoster.addEventListener('click', () => {
          const imgUrl = mainPoster.querySelector('img')?.src;
          if (imgUrl) {
            posterLightbox.open(imgUrl);
          }
        });
      }
    }
    
    navigate(direction) {
      if (this.isAnimating) return;
      
      this.currentIndex = (this.currentIndex + direction + this.slides.length) % this.slides.length;
      this.updateCarousel(true);
    }
    
    goToSlide(index) {
      if (this.isAnimating || index === this.currentIndex) return;
      
      this.currentIndex = index;
      this.updateCarousel(true);
    }
    
    updateCarousel(animate = true) {
      if (animate) {
        this.isAnimating = true;
        setTimeout(() => { this.isAnimating = false; }, 400);
      }
      
      const total = this.slides.length;
      const prevIndex = (this.currentIndex - 1 + total) % total;
      const nextIndex = (this.currentIndex + 1) % total;
      
      // Format actuel
      const currentFormat = this.slides[this.currentIndex].format;
      
      // Adapter le layout
      this.adaptCarouselLayout(currentFormat);
      
      // Mettre à jour les cartes
      const leftCard = this.carousel.querySelector('.carousel-side-card.left');
      if (leftCard) {
        this.updateSideCard(leftCard, this.slides[prevIndex]);
      }
      
      const mainCard = this.carousel.querySelector('.carousel-main-card');
      if (mainCard) {
        this.updateMainCard(mainCard, this.slides[this.currentIndex]);
      }
      
      const rightCard = this.carousel.querySelector('.carousel-side-card.right');
      if (rightCard) {
        this.updateSideCard(rightCard, this.slides[nextIndex]);
      }
      
      // Mettre à jour les dots
      this.updateDots();
    }
    
    adaptCarouselLayout(format) {
      if (format === 'landscape') {
        this.carousel.classList.add('landscape');
      } else {
        this.carousel.classList.remove('landscape');
      }
    }
    
    updateSideCard(card, slideData) {
      const img = card.querySelector('.poster-preview img');
      
      card.setAttribute('data-format', slideData.format);
      
      if (img && slideData.posterUrl) {
        img.src = slideData.posterUrl;
      }
    }
    
    updateMainCard(card, slideData) {
      const img = card.querySelector('.poster-main img');
      const titleFr = card.querySelector('.carousel-card-content .fr-text');
      const titleEn = card.querySelector('.carousel-card-content .en-text');
      const allFrTexts = card.querySelectorAll('.carousel-card-content .fr-text');
      const allEnTexts = card.querySelectorAll('.carousel-card-content .en-text');
      const pdfBtn = card.querySelector('.view-pdf-btn');
      const formatBadge = card.querySelector('.format-badge');
      
      card.setAttribute('data-format', slideData.format);
      
      // Mettre à jour le badge de format
      if (formatBadge) {
        const icon = formatBadge.querySelector('i');
        const textFr = formatBadge.querySelector('.fr-text');
        const textEn = formatBadge.querySelector('.en-text');
        
        if (slideData.format === 'landscape') {
          if (icon) icon.className = 'fas fa-desktop';
          if (textFr) textFr.textContent = 'Paysage';
          if (textEn) textEn.textContent = 'Landscape';
        } else {
          if (icon) icon.className = 'fas fa-mobile-alt';
          if (textFr) textFr.textContent = 'Portrait';
          if (textEn) textEn.textContent = 'Portrait';
        }
      }
      
      // Mettre à jour l'image
      if (img && slideData.posterUrl) {
        img.src = slideData.posterUrl;
      }
      
      // Mettre à jour les textes
      if (titleFr) titleFr.textContent = slideData.titleFr;
      if (titleEn) titleEn.textContent = slideData.titleEn;
      if (allFrTexts[1]) allFrTexts[1].textContent = slideData.descFr;
      if (allEnTexts[1]) allEnTexts[1].textContent = slideData.descEn;
      
      // Mettre à jour le lien PDF
      if (pdfBtn && slideData.pdfLink) {
        pdfBtn.setAttribute('href', slideData.pdfLink);
      }
    }
    
    updateDots() {
      const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }
  }
  
  // ========== INITIALISATION ==========
  function initCarousels() {
    if (document.getElementById('carousel1')) {
      new AdaptiveCarousel('carousel1', 'carousel1-dots');
    }
    
    if (document.getElementById('carousel2')) {
      new AdaptiveCarousel('carousel2', 'carousel2-dots');
    }
  }
  
  // Lancer au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
  } else {
    initCarousels();
  }
})();