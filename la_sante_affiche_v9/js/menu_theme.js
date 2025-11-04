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