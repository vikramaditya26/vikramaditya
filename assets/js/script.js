/**
 * The Simple Guy - Interactive JavaScript
 * Features: Shared Components, Dark Mode, Scroll Animations, Mobile Menu, Reading Progress
 */

// ===== Shared Header & Footer Components =====

function getBasePath() {
  const path = window.location.pathname;
  // Root: / or /index.html
  if (path === '/' || path === '/index.html') {
    return '';
  }
  // One level deep: /books/, /books/index.html, /finance/, etc.
  const segments = path.replace(/\/index\.html$/, '/').split('/').filter(Boolean);
  if (segments.length <= 1) {
    return '../';
  }
  // Two levels deep: /100-skills/day-001/, /blog/art-of-start/, /tools/sip-calculator/
  if (segments.length <= 2) {
    return '../../';
  }
  // Three levels deep (rare)
  return '../../../';
}

function renderHeader(currentPage) {
  const base = getBasePath();
  const navItems = [
    { href: 'index.html', label: 'About', key: 'about' },
    { href: 'finance/', label: 'Finance', key: 'finance' },
    { href: 'books/', label: 'Books', key: 'books' },
    { href: 'workout/', label: 'Workout', key: 'workout' },
    { href: 'blog/', label: 'Blog', key: 'blog' },
    { href: 'contact/', label: 'Contact', key: 'contact' }
  ];

  const navLinks = navItems.map(item => {
    const aria = item.key === currentPage ? ' aria-current="page"' : '';
    return `<a href="${base}${item.href}"${aria}>${item.label}</a>`;
  }).join('\n        ');

  return `
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="progress-bar"></div>
  <header>
    <div class="header-inner">
      <a href="${base}index.html" class="site-title">The Simple <span>Guy</span></a>
      <button class="menu-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
      <nav>
        ${navLinks}
      </nav>
      <button class="theme-toggle" aria-label="Toggle dark mode">
        <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer>
    <p>&copy; 2025 Vikram Aditya — Made with ❤️</p>
  </footer>
  <button class="back-to-top" aria-label="Back to top">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </button>`;
}

function injectComponents() {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  const currentPage = document.body.getAttribute('data-page') || '';

  if (headerEl) {
    headerEl.outerHTML = renderHeader(currentPage);
  }
  if (footerEl) {
    footerEl.outerHTML = renderFooter();
  }
}

// Inject components immediately
injectComponents();

// ===== Main Initialization =====
document.addEventListener('DOMContentLoaded', function() {

  // ===== Theme Toggle (Dark/Light Mode) =====
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getThemePreference() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return prefersDark.matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  setTheme(getThemePreference());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ===== Header Scroll Effect =====
  const header = document.querySelector('header');

  function handleScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ===== Reading Progress Bar =====
  const progressBar = document.querySelector('.progress-bar');

  if (progressBar) {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ===== Back to Top Button =====
  const backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    function toggleBackToTop() {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Scroll Reveal Animation =====
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
  }

  // ===== Finance Cards Toggle =====
  const financeCards = document.querySelectorAll('.finance-card');

  financeCards.forEach(card => {
    const cardHeader = card.querySelector('.finance-card-header');
    if (cardHeader) {
      cardHeader.addEventListener('click', () => {
        financeCards.forEach(otherCard => {
          if (otherCard !== card && otherCard.classList.contains('open')) {
            otherCard.classList.remove('open');
          }
        });
        card.classList.toggle('open');
      });
    }
  });

  if (financeCards.length > 0) {
    financeCards[0].classList.add('open');
  }

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== Lazy Load Images =====
  const lazyImages = document.querySelectorAll('img[data-src]');

  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ===== Keyboard Navigation =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) {
      menuToggle.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ===== Auto lazy-load images =====
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });

  // ===== Contact Form Enhancement =====
  const contactForm = document.querySelector('.contact-form form');

  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      const btn = this.querySelector('.btn');
      if (btn) {
        btn.innerHTML = 'Sending...';
        btn.disabled = true;
      }
    });
  }

  // ===== Copy Code Blocks =====
  document.querySelectorAll('pre code').forEach(block => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(block.textContent);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy', 2000);
    });
    block.parentNode.style.position = 'relative';
    block.parentNode.appendChild(copyBtn);
  });

  // ===== Console Easter Egg =====
  console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold;');
  console.log('%cThis website was built with ❤️ by Vikram Aditya', 'font-size: 14px;');
  console.log('%cWant to connect? Find me on LinkedIn: /in/adityakumar2608/', 'font-size: 12px; color: #888;');

});

// ===== Performance: Debounce =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
