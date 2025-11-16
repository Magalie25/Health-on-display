/* ==========================================
   DIVISION SANTÉ - SLIDES NAVIGATION
   ========================================== */

(() => {
    'use strict';
    
    // Configuration
    const CONFIG = {
        scrollThreshold: 50,
        slideTransitionDelay: 600, // Réduit pour plus de fluidité
        keyboardEnabled: true,
        touchEnabled: true,
        wheelEnabled: true
    };
    
    // État
    let currentSlide = 0;
    let isTransitioning = false;
    let slides = [];
    let touchStartY = 0;
    let lastWheelTime = 0;
    
    /**
     * Initialisation
     */
    function init() {
        slides = Array.from(document.querySelectorAll('.slide'));
        
        if (!slides.length) {
            console.warn('Aucun slide trouvé');
            return;
        }
        
        setupNavigation();
        setupProgressBar();
        setupKeyboardNav();
        setupTouchNav();
        setupWheelNav();
        setupScrollSpy();
        
        // Observer pour les animations
        setupIntersectionObserver();
    }

    /**
     * Navigation vers un slide spécifique
     */
    function goToSlide(index, smooth = true) {
        if (index < 0 || index >= slides.length || isTransitioning) {
            return;
        }
        
        isTransitioning = true;
        currentSlide = index;
        
        const targetSlide = slides[index];
        
        // Scroll vers le slide
        targetSlide.scrollIntoView({
            behavior: smooth ? 'smooth' : 'auto',
            block: 'start'
        });
        
        // Mettre à jour l'état actif
        updateActiveSlide();
        updateNavigationDots();
        updateProgressBar();
        
        // Réinitialiser le flag après la transition
        setTimeout(() => {
            isTransitioning = false;
        }, CONFIG.slideTransitionDelay);
    }
    
    /**
     * Mise à jour du slide actif
     */
    function updateActiveSlide() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    /**
     * Configuration de la navigation par points
     */
    function setupNavigation() {
        const existingNav = document.querySelector('.slide-navigation');
        if (existingNav) {
            existingNav.remove();
        }
        
        const nav = document.createElement('div');
        nav.className = 'slide-navigation';
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Navigation entre les slides');
        
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.className = 'nav-dot';
            dot.setAttribute('data-title', slide.getAttribute('data-title') || `Slide ${index + 1}`);
            dot.setAttribute('aria-label', `Aller au slide ${index + 1}`);
            dot.setAttribute('data-slide', index);
            
            dot.addEventListener('click', () => goToSlide(index));
            
            nav.appendChild(dot);
        });
        
        document.body.appendChild(nav);
    }
    
    /**
     * Mise à jour des dots de navigation
     */
    function updateNavigationDots() {
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.removeAttribute('aria-current');
            }
        });
    }
    
    /**
     * Configuration de la barre de progression
     */
    function setupProgressBar() {
        const existingProgress = document.querySelector('.slide-progress');
        if (existingProgress) {
            existingProgress.remove();
        }
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'slide-progress';
        progressContainer.setAttribute('role', 'progressbar');
        progressContainer.setAttribute('aria-valuemin', '0');
        progressContainer.setAttribute('aria-valuemax', '100');
        
        const progressBar = document.createElement('div');
        progressBar.className = 'slide-progress-bar';
        
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
    }
    
    /**
     * Mise à jour de la barre de progression
     */
    function updateProgressBar() {
        const progressBar = document.querySelector('.slide-progress-bar');
        if (!progressBar) return;
        
        const progress = ((currentSlide + 1) / slides.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        const container = progressBar.parentElement;
        container.setAttribute('aria-valuenow', progress.toFixed(0));
    }
    
    /**
     * Navigation clavier
     */
    function setupKeyboardNav() {
        if (!CONFIG.keyboardEnabled) return;
        
        document.addEventListener('keydown', (e) => {
            if (isTransitioning) return;
            
            switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                case ' ': // Espace
                    e.preventDefault();
                    goToSlide(currentSlide + 1);
                    break;
                    
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    goToSlide(currentSlide - 1);
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    goToSlide(0);
                    break;
                    
                case 'End':
                    e.preventDefault();
                    goToSlide(slides.length - 1);
                    break;
            }
        });
    }
    
    /**
     * Navigation tactile (swipe)
     */
    function setupTouchNav() {
        if (!CONFIG.touchEnabled) return;
        
        const slidesWrapper = document.querySelector('.slides-wrapper') || document.body;
        
        slidesWrapper.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        slidesWrapper.addEventListener('touchend', (e) => {
            if (isTransitioning) return;
            
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            // Seuil de 50px pour déclencher le swipe
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe up - slide suivant
                    goToSlide(currentSlide + 1);
                } else {
                    // Swipe down - slide précédent
                    goToSlide(currentSlide - 1);
                }
            }
        }, { passive: true });
    }
    
    /**
     * Navigation à la molette
     */
    function setupWheelNav() {
        if (!CONFIG.wheelEnabled) return;
        
        document.addEventListener('wheel', (e) => {
            if (isTransitioning) return;
            
            const now = Date.now();
            
            // Throttle - éviter les multiples déclenchements
            if (now - lastWheelTime < 1000) return;
            
            lastWheelTime = now;
            
            if (e.deltaY > 0) {
                // Scroll down
                goToSlide(currentSlide + 1);
            } else {
                // Scroll up
                goToSlide(currentSlide - 1);
            }
        }, { passive: true });
    }
    
    /**
     * Détection du slide visible (scroll spy)
     */
    function setupScrollSpy() {
        const options = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isTransitioning) {
                    const index = slides.indexOf(entry.target);
                    if (index !== -1 && index !== currentSlide) {
                        currentSlide = index;
                        updateActiveSlide();
                        updateNavigationDots();
                        updateProgressBar();
                    }
                }
            });
        }, options);
        
        slides.forEach(slide => observer.observe(slide));
    }
    
    /**
     * Intersection Observer pour les animations
     */
    function setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Animation des éléments fade-in-text
                    const fadeElements = entry.target.querySelectorAll('.fade-in-text');
                    fadeElements.forEach((el, i) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, i * 150);
                    });
                }
            });
        }, options);
        
        slides.forEach(slide => observer.observe(slide));
    }
    
    /**
     * Utilitaires publics
     */
    window.slidesAPI = {
        goToSlide: (index) => goToSlide(index),
        next: () => goToSlide(currentSlide + 1),
        prev: () => goToSlide(currentSlide - 1),
        getCurrentSlide: () => currentSlide,
        getTotalSlides: () => slides.length
    };
    
    // Initialisation au chargement du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Réinitialisation au redimensionnement (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // recalculer la hauteur du header (important si header change ou responsive)
            updateActiveSlide();
            updateNavigationDots();
            updateProgressBar();
        }, 250);
    });
})();