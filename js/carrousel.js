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

/*
  Lightweight modern carousel initializer.
  Initializes every .portrait-carousel on the page independently,
  finds prev/next inside each container, builds/links dots, recenters active slide.
*/
(function () {
  function Carousel(container) {
    this.container = container;
    this.slidesContainer = container.querySelector('.slides-container') || container;
    this.track = container.querySelector('.slides-track');
    this.slides = Array.from(container.querySelectorAll('.slide'));
    this.prevBtn = container.querySelector('.nav-button.prev');
    this.nextBtn = container.querySelector('.nav-button.next');
    this.dotsWrap = container.querySelector('.dots');
    this.current = 0;
    this.gap = parseFloat(getComputedStyle(this.track).gap) || 0;
    this.init();
  }

  Carousel.prototype.init = function () {
    if (!this.track || this.slides.length === 0) return;
    this.track.style.willChange = 'transform';
    this.track.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';

    // build dots if missing or count mismatch
    if (!this.dotsWrap) {
      this.dotsWrap = document.createElement('div');
      this.dotsWrap.className = 'dots';
      this.container.appendChild(this.dotsWrap);
    }
    this.dotsWrap.innerHTML = '';
    this.slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => this.goTo(i));
      this.dotsWrap.appendChild(d);
    });

    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    // make sure slides have consistent height (CSS handles width via vars)
    this.syncSizes();
    window.addEventListener('resize', this.debounce(() => { this.syncSizes(); this.goTo(this.current); }, 120));

    // initial center
    this.goTo(0);

    // allow left/right keys when focused
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  };

  Carousel.prototype.syncSizes = function () {
    // ensure slides have computed sizes; this helps centering calculation
    this.slideRects = this.slides.map(s => s.getBoundingClientRect());
    this.trackRect = this.track.getBoundingClientRect();
    this.viewRect = this.slidesContainer.getBoundingClientRect();
  };

  Carousel.prototype.goTo = function (index) {
    if (index < 0) index = 0;
    if (index >= this.slides.length) index = this.slides.length - 1;
    this.current = index;

    // refresh rects
    this.syncSizes();

    const slideRect = this.slides[index].getBoundingClientRect();
    const trackRect = this.track.getBoundingClientRect();
    const viewRect = this.slidesContainer.getBoundingClientRect();

    // compute target translate so selected slide is centered in the .slides-container
    const slideCenter = (slideRect.left - trackRect.left) + slideRect.width / 2;
    const targetX = (viewRect.width / 2) - slideCenter;

    // clamp between min and max translate to prevent empty space at edges
    const maxTranslate = 0;
    const minTranslate = Math.min(viewRect.width - trackRect.width, 0);
    const clamped = Math.max(Math.min(targetX, maxTranslate), minTranslate);

    this.track.style.transform = `translateX(${clamped}px)`;

    // update active classes
    this.slides.forEach((s, i) => s.classList.toggle('active', i === index));
    const dots = Array.from(this.dotsWrap.children);
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  };

  Carousel.prototype.prev = function () { this.goTo(this.current - 1); };
  Carousel.prototype.next = function () { this.goTo(this.current + 1); };

  // small debounce helper
  Carousel.prototype.debounce = function (fn, wait) {
    let t;
    return function () { clearTimeout(t); t = setTimeout(fn, wait); };
  };

  // init all carousels on DOM ready
  function initAll() {
    const carousels = document.querySelectorAll('.portrait-carousel');
    carousels.forEach(c => {
      // ensure container is focusable for keyboard nav
      if (!c.hasAttribute('tabindex')) c.setAttribute('tabindex', '0');
      new Carousel(c);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();