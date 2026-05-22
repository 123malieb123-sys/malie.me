/* ============================================================
   Teacher Malie – script.js
   Smooth scroll · Scroll spy · Fade-in · Hamburger · Form
   ============================================================ */

(function () {
  'use strict';

  /* ---- Active nav link scroll spy (declared first, used by onScroll) ---- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav a[href^="#"]');

  /* ---- Navbar scroll class ---- */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  function updateActiveLink() {
    const scrollMid = window.scrollY + window.innerHeight * 0.4;
    let active = null;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollMid) active = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active-link', a.getAttribute('href') === '#' + active);
    });
  }

  /* ---- Fade-in on scroll ---- */
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  fadeEls.forEach(el => observer.observe(el));

  /* ---- Smooth scroll for all internal anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Contact form ---- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate network delay (replace with real fetch/API call as needed)
      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) successMsg.classList.add('show');
      }, 1400);
    });
  }

  /* ---- Subtle parallax on hero ---- */
  const hero = document.getElementById('hero');
  if (hero && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      const heroInner = hero.querySelector('.hero-inner');
      if (heroInner && offset < window.innerHeight) {
        heroInner.style.transform = `translateY(${offset * 0.18}px)`;
        heroInner.style.opacity = 1 - offset / (window.innerHeight * 0.8);
      }
    }, { passive: true });
  }
})();
