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

// ===== Buy Button Brand Logos (runs immediately) =====
(function injectBuyButtonLogos() {
  const amazonSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595.394-.15.763-.3 1.108-.444.158-.066.295-.127.41-.18.227-.1.414-.063.56.11.146.174.13.363-.048.567-.535.612-1.464 1.147-2.785 1.606a18.872 18.872 0 01-3.558.89c-.836.126-1.598.19-2.284.19-3.463 0-6.594-.876-9.394-2.628-.09-.06-.345-.244-.766-.554-.096-.07-.158-.13-.186-.18zM6.394 14.736c0-.752.164-1.397.493-1.936a3.237 3.237 0 011.378-1.272c.597-.31 1.336-.533 2.216-.67.456-.073 1.062-.14 1.818-.2V9.858c0-.665-.073-1.13-.22-1.393-.3-.46-.827-.69-1.582-.69h-.164c-.397.04-.725.177-.984.412-.26.236-.4.543-.425.922-.028.21-.127.33-.3.36l-1.72-.194c-.18-.04-.27-.137-.27-.29 0-.02.003-.038.012-.054.164-.924.564-1.593 1.2-2.01.636-.416 1.434-.655 2.394-.715h.518c1.17 0 2.084.343 2.743 1.03.108.12.2.24.278.36.14.217.234.45.283.695.048.246.072.616.072 1.11v4.084c0 .398.058.71.174.936.116.226.354.51.714.852.09.08.134.168.134.266 0 .08-.044.16-.132.24l-1.134.986c-.11.08-.232.088-.367.022-.36-.334-.612-.574-.756-.72-.504.56-1.058.89-1.662.988-.306.06-.64.088-1.004.088-.817 0-1.47-.248-1.96-.744-.49-.496-.735-1.134-.735-1.916zm3.282.24c.36 0 .705-.1 1.034-.303.33-.2.544-.48.644-.836V11.1c-.837.04-1.476.17-1.918.392-.7.352-1.05.876-1.05 1.572 0 .47.12.846.36 1.13.24.284.555.426.943.426zM20.52 18.2c.15.12.184.274.1.46-.527 1.2-1.264 2.1-2.21 2.7-.144.092-.262.058-.352-.1-.09-.16-.04-.3.148-.42.743-.485 1.34-1.2 1.79-2.143.068-.14.14-.227.216-.264.075-.036.16-.022.252.04l.054.03z"/></svg>';
  const flipkartSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.833 1.333H20.167c1.38 0 2.5 1.12 2.5 2.5v16.334c0 1.38-1.12 2.5-2.5 2.5H3.833c-1.38 0-2.5-1.12-2.5-2.5V3.833c0-1.38 1.12-2.5 2.5-2.5zm3.87 5.2v1.567h2.806L8.07 18.467h2.222l2.438-10.367h2.806V6.533H7.703z"/></svg>';
  document.querySelectorAll('.buy-btn').forEach(function(btn) {
    if (btn.classList.contains('amazon')) {
      btn.innerHTML = amazonSvg + '<span>Buy on Amazon</span>';
    } else if (btn.classList.contains('flipkart')) {
      btn.innerHTML = flipkartSvg + '<span>Buy on Flipkart</span>';
    }
  });
})();

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

// ===== Affiliate Link Loader =====
(function loadAffiliateLinks() {
  const base = getBasePath();
  const affiliateEls = document.querySelectorAll('[data-affiliate]');
  if (affiliateEls.length === 0) return;

  fetch(base + 'assets/data/affiliate-links.json')
    .then(r => r.json())
    .then(data => {
      affiliateEls.forEach(el => {
        // data-affiliate="books.siddhartha.amazon"
        const keys = el.getAttribute('data-affiliate').split('.');
        let url = data;
        for (const key of keys) {
          if (url && url[key]) url = url[key];
          else { url = '#'; break; }
        }
        if (el.tagName === 'A') {
          el.href = url;
          el.setAttribute('rel', 'nofollow sponsored noopener');
          el.setAttribute('target', '_blank');
        }
      });
    })
    .catch(() => {}); // Silently fail — links stay as "#"
})();

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
