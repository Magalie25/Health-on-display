/* Portrait carousel with centered active slide */
class PortraitCarousel {
  constructor(element) {
    this.carousel = element;
    this.container = element.querySelector('.slides-container');
    this.track = element.querySelector('.slides-track');
    this.slides = Array.from(element.querySelectorAll('.slide'));
    this.dots = Array.from(element.querySelectorAll('.dot'));
    
    this.current = 0;
    this.slideWidth = 0;
    this.gapWidth = 20;
    
    this.init();
    this.setupEvents();
    this.updateLayout();
    
    // Start autoplay
    this.startAutoplay();
  }
  
  init() {
    // Duplicate slides for infinite effect
    const firstClone = this.slides[0].cloneNode(true);
    const lastClone = this.slides[this.slides.length - 1].cloneNode(true);
    this.track.appendChild(firstClone);
    this.track.insertBefore(lastClone, this.track.firstChild);
    
    // Update slides array with clones
    this.slides = Array.from(this.track.querySelectorAll('.slide'));
    this.current = 1; // Start after first clone
  }
  
  setupEvents() {
    // Navigation buttons
    this.carousel.querySelectorAll('.nav-button').forEach(button => {
      button.addEventListener('click', () => {
        if (button.classList.contains('prev')) this.prev();
        else this.next();
      });
    });
    
    // Dots navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index + 1));
    });
    
    // Pause autoplay on hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
    
    // Update on resize
    window.addEventListener('resize', () => this.updateLayout());
    
    // Prevent ghost clicks
    this.carousel.addEventListener('click', e => {
      if (e.target.closest('.slide:not(.active)')) {
        const index = this.slides.indexOf(e.target.closest('.slide'));
        this.goTo(index);
      }
    });
  }
  
  updateLayout() {
    const rect = this.slides[0].getBoundingClientRect();
    this.slideWidth = rect.width + this.gapWidth;
    this.centerSlide(this.current);
  }
  
  centerSlide(index) {
    const containerWidth = this.container.offsetWidth;
    const offset = (containerWidth - this.slideWidth) / 2;
    const x = -(index * this.slideWidth) + offset;
    
    this.track.style.transform = `translateX(${x}px)`;
    
    // Update active states
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    // Update dots
    const realIndex = (index - 1 + this.dots.length) % this.dots.length;
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === realIndex);
    });
  }
  
  goTo(index, animate = true) {
    if (!animate) {
      this.track.style.transition = 'none';
    }
    
    this.current = index;
    this.centerSlide(index);
    
    if (!animate) {
      this.track.offsetHeight; // Force reflow
      this.track.style.transition = '';
    }
    
    // Handle infinite scroll
    if (index === 0) {
      setTimeout(() => {
        this.track.style.transition = 'none';
        this.current = this.slides.length - 2;
        this.centerSlide(this.current);
        this.track.offsetHeight;
        this.track.style.transition = '';
      }, 500);
    } else if (index === this.slides.length - 1) {
      setTimeout(() => {
        this.track.style.transition = 'none';
        this.current = 1;
        this.centerSlide(this.current);
        this.track.offsetHeight;
        this.track.style.transition = '';
      }, 500);
    }
  }
  
  prev() {
    this.goTo(this.current - 1);
  }
  
  next() {
    this.goTo(this.current + 1);
  }
  
  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => this.next(), 5000);
  }
  
  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
}

// Initialize carousels
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.portrait-carousel').forEach(carousel => {
    new PortraitCarousel(carousel);
  });
});
