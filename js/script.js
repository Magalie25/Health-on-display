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
    // stop propagation so global document click handlers don't immediately act
    e.stopPropagation();
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
  // TIMELINE ANIMATIONS
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
  // DROPDOWNS (mobile toggle + keyboard support + ARIA)
  // =====================================================================
  function initDropdowns() {
    const toggles = $$(".dropdown-toggle");
    if (!toggles.length) return;

    toggles.forEach((btn) => {
      // initialize ARIA and keyboard role
      setAttr(btn, 'role', 'button');
      setAttr(btn, 'tabindex', '0');
      // ensure explicit aria-expanded initial state
      if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
      const parent = btn.closest('.has-dropdown');
      if (!parent) return;

      // Click toggles on mobile (desktop uses CSS hover)
      btn.addEventListener('click', (e) => {
        // Only intercept on small screens where burger is used
        if (window.innerWidth >= 769) return;
        e.preventDefault();
        const isOpen = parent.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });

      // Keyboard (Enter / Space)
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
      });
    });

    // Close any open dropdowns when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 769) {
        $$(".has-dropdown.open").forEach((h) => {
          h.classList.remove('open');
          h.querySelectorAll('.dropdown-toggle').forEach(b => b.setAttribute('aria-expanded','false'));
        });
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        $$(".has-dropdown.open").forEach((h) => {
          h.classList.remove('open');
          h.querySelectorAll('.dropdown-toggle').forEach(b => b.setAttribute('aria-expanded','false'));
        });
      }
    });
  }
  
  // =====================================================================
  // BOOTSTRAP
  // =====================================================================
  document.addEventListener("DOMContentLoaded", () => {
    initLanguage();
    initStatsObserver();
    initHideOnScroll();
    initA11y();
    initDropdowns();
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