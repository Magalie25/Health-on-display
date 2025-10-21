/* =========================================================
La santé s'affiche — script.js
Menu, langue, stats, nav sticky/hide-on-scroll, timeline
========================================================= */

(() => {
  // ---------- Helpers ----------
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const setAttr = (el, name, val) => el && el.setAttribute(name, val);
  
  const NAV_HIDDEN_CLASS   = "nav--hidden";
  const NAV_SCROLLED_CLASS = "nav--scrolled";
  const MENU_OPEN_CLASS    = "menu-open";
  const ACTIVE_CLASS       = "active";
  const BODY_LOCK_CLASS    = "no-scroll";
  
  const navbar    = $("#navbar");
  const burger    = $(".burger");
  const navLinks  = $("#navLinks");
  const langBtns  = $$(".language-switch .lang-btn");
  
  // =====================================================================
  // MENU BURGER (ouverture/fermeture + accessibilité + gestion focus)
  // =====================================================================
  function openMenu() {
    if (!navLinks || !burger) return;
    navLinks.classList.add(MENU_OPEN_CLASS);
    burger.classList.add(MENU_OPEN_CLASS);
    document.body.classList.add(BODY_LOCK_CLASS);
    setAttr(burger, "aria-expanded", "true");
    setAttr(navLinks, "aria-hidden", "false");
    // Focus sur le 1er lien pour la nav clavier
    const firstLink = navLinks.querySelector("a, button, [tabindex]:not([tabindex='-1'])");
    firstLink && firstLink.focus({ preventScroll: true });
  }
  
  function closeMenu() {
    if (!navLinks || !burger) return;
    navLinks.classList.remove(MENU_OPEN_CLASS);
    burger.classList.remove(MENU_OPEN_CLASS);
    document.body.classList.remove(BODY_LOCK_CLASS);
    setAttr(burger, "aria-expanded", "false");
    setAttr(navLinks, "aria-hidden", "true");
    // Rendre le focus au bouton
    burger.focus({ preventScroll: true });
  }
  
  function isMenuOpen() {
    return navLinks?.classList.contains(MENU_OPEN_CLASS);
  }
  
  // Exposé pour l’attribut onclick du HTML (et utilisable ailleurs)
  window.toggleMenu = function toggleMenu() {
    isMenuOpen() ? closeMenu() : openMenu();
  };
  
  // Clic sur le burger (au cas où l’attribut inline serait retiré un jour)
  burger?.addEventListener("click", (e) => {
    e.preventDefault();
    window.toggleMenu();
  });
  
  // Ferme le menu au clic sur un lien (UX mobile)
  navLinks?.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });
  
  // Ferme le menu si clic à l’extérieur du bloc nav
  document.addEventListener("click", (e) => {
    if (!isMenuOpen()) return;
    const withinNav = e.target.closest("#navbar");
    if (!withinNav) closeMenu();
  });
  
  // Ferme sur Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen()) {
      e.preventDefault();
      closeMenu();
    }
  });
  
  // Ferme si on passe en desktop après ouverture mobile
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992 && isMenuOpen()) {
      closeMenu();
    }
  });
  
  // =====================================================================
  // LANGUE (FR / EN)
  // =====================================================================
  const LANG_KEY = "ls-expo-lang";
  const VALID_LANGS = new Set(["fr", "en"]);
  
  function applyLanguage(lang) {
    if (!VALID_LANGS.has(lang)) lang = "fr";
    
    $$(".fr-text").forEach((el) => (el.style.display = lang === "fr" ? "" : "none"));
    $$(".en-text").forEach((el) => (el.style.display = lang === "en" ? "" : "none"));
    
    langBtns.forEach((btn) => {
      const isActive = btn.textContent.trim().toLowerCase() === lang;
      btn.classList.toggle(ACTIVE_CLASS, isActive);
      setAttr(btn, "aria-pressed", String(isActive));
    });
    
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem(LANG_KEY, lang); } catch {}
    
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url);
    
    propagateLangToLinks(lang);
  }
  
  window.switchLanguage = function switchLanguage(lang) { applyLanguage(lang); };
  
  function initLanguage() {
    const url     = new URL(window.location.href);
    const urlLang = url.searchParams.get("lang");
    const stored  = (() => { try { return localStorage.getItem(LANG_KEY); } catch { return null; } })();
    const browser = (navigator.language || "fr").slice(0,2).toLowerCase();
    
    const initial =
    VALID_LANGS.has(urlLang) ? urlLang :
    VALID_LANGS.has(stored)  ? stored  :
    VALID_LANGS.has(browser) ? browser : "fr";
    
    applyLanguage(initial);
  }
  
  function isInternalLink(a) {
    try {
      const u = new URL(a.href, window.location.href);
      return u.origin === window.location.origin;
    } catch { return false; }
  }
  
  function propagateLangToLinks(lang) {
    $$("a[href]").forEach((a) => {
      if (!isInternalLink(a)) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#")) return;
      const u = new URL(href, window.location.href);
      u.searchParams.set("lang", lang);
      a.setAttribute("href", u.pathname + u.search + u.hash);
    });
  }
  // Activation des boutons de langue
  langBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.textContent.trim().toLowerCase();
      applyLanguage(lang);
    });
  });
  
  // Initialisation de la langue au chargement
  initLanguage();
  
  // =====================================================================
  // ANIMATION DES COMPTEURS
  // =====================================================================
  function animateValue(el, to, duration = 1200) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { el.textContent = String(to); return; }
    
    const start = 0, t0 = performance.now();
    const tick = (now) => {
      const t = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.floor(start + (to - start) * eased));
      if (t < 1) requestAnimationFrame(tick); else el.textContent = String(to);
    };
    requestAnimationFrame(tick);
  }
  
  function initStatsObserver() {
    const numbers = $$(".stat-number");
    if (!numbers.length) return;
    
    const seen = new WeakSet();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          seen.add(entry.target);
          const target = parseInt(entry.target.getAttribute("data-target"), 10) || 0;
          animateValue(entry.target, target);
        }
      });
    }, { threshold: 0.35 });
    
    numbers.forEach((n) => io.observe(n));
  }
  
  // =====================================================================
  // NAV RÉTRACTABLE AU SCROLL
  // =====================================================================
  function initHideOnScroll() {
    if (!navbar) return;
    
    let lastY = window.scrollY;
    let ticking = false;
    const MIN_DELTA = 8;
    const SHOW_AT_TOP = 10;
    
    function onScroll() {
      const y = window.scrollY;
      
      navbar.classList.toggle(NAV_SCROLLED_CLASS, y > SHOW_AT_TOP);
      
      if (Math.abs(y - lastY) < MIN_DELTA) { ticking = false; return; }
      
      const scrollingDown = y > lastY;
      const nearTop = y <= SHOW_AT_TOP;
      
      // Ne cache pas la nav si le menu mobile est ouvert
      if (!isMenuOpen() && scrollingDown && !nearTop) {
        navbar.classList.add(NAV_HIDDEN_CLASS);
      } else {
        navbar.classList.remove(NAV_HIDDEN_CLASS);
      }
      
      lastY = y;
      ticking = false;
    }
    
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  }
  
  // =====================================================================
  // TIMELINE (optionnel)
  // =====================================================================
  function initTimeline() {
    const items = $$(".timeline .timeline-item");
    if (!items.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.2 });
    items.forEach((it) => io.observe(it));
  }
  
  // =====================================================================
  // ACCESSIBILITÉ (ARIA + clavier)
  // =====================================================================
  function initA11y() {
    if (burger) {
      setAttr(burger, "role", "button");
      setAttr(burger, "tabindex", "0");
      setAttr(burger, "aria-controls", "navLinks");
      setAttr(burger, "aria-expanded", "false");
      burger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); window.toggleMenu(); }
      });
    }
    if (navLinks) setAttr(navLinks, "aria-hidden", "true");
  }
  
  // =====================================================================
  // BOOTSTRAP
  // =====================================================================
  document.addEventListener("DOMContentLoaded", () => {
    initLanguage();
    initStatsObserver();
    initHideOnScroll();
    initA11y();
    initTimeline();
  });
  
  (function(){
    const cards = document.querySelectorAll('.event-card');
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('is-in');
          obs.unobserve(e.target); // une fois animée, on arrête d'observer
        }
      });
    }, { threshold: 0.12 });
    cards.forEach(c => obs.observe(c));
  })();
  //Timeline cards animation (fade-in on scroll)
  // Initialisation AOS avec animations répétables (seulement si AOS existe)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease',
      once: false,
      mirror: true,
      offset: 120,
      delay: 0
    });
  }
})();
  
  // ==================== Menu theme dynamique ====================
"use strict";
  
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");
  let dots = document.querySelectorAll('.dot');
  let items = document.querySelectorAll('.item');
  let currentIndex = 0;
  
  // Fonction pour mettre à jour les dots
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Fonction pour mettre à jour l'index actuel basé sur l'ordre des items
  function updateCurrentIndex() {
    items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
      if (index === 1) { // Le deuxième item est celui qui est affiché
        currentIndex = Array.from(document.querySelectorAll('.item')).indexOf(item) % dots.length;
      }
    });
  }
  
  // Navigation suivante
  function goNext() {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide").appendChild(items[0]);
    
    currentIndex = (currentIndex + 1) % dots.length;
    updateDots();
  }
  
  // Navigation précédente
  function goPrev() {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide").prepend(items[items.length - 1]);
    
    currentIndex = (currentIndex - 1 + dots.length) % dots.length;
    updateDots();
  }
  
  // Navigation directe vers une slide spécifique
  function goToSlide(targetIndex) {
    if (targetIndex === currentIndex) return;
    
    let diff = targetIndex - currentIndex;
    
    // Normaliser la différence pour choisir le chemin le plus court
    if (diff > dots.length / 2) {
      diff -= dots.length;
    } else if (diff < -dots.length / 2) {
      diff += dots.length;
    }
    
    // Naviguer dans la bonne direction
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        goNext();
      }
    } else {
      for (let i = 0; i < Math.abs(diff); i++) {
        goPrev();
      }
    }
  }
  
  // Event listeners
  next.addEventListener("click", goNext);
  prev.addEventListener("click", goPrev);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Initialisation des dots
  updateDots();
  
  // Auto-rotation
  let autoRotate = setInterval(goNext, 10000);
  
  // Pause auto-rotation au survol
  document.querySelector('.menu').addEventListener('mouseenter', () => {
    clearInterval(autoRotate);
  });
  
  document.querySelector('.menu').addEventListener('mouseleave', () => {
    autoRotate = setInterval(goNext, 10000);
  });
  
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