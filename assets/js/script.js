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
    { href: '100-skills/', label: '100 Skills', key: 'skills' },
    { href: 'movies/', label: 'Movies', key: 'movies' },
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

// ===== Microsoft Clarity Analytics =====
// To activate: replace 'CLARITY_PROJECT_ID' with your actual Clarity project ID
// Get one free at https://clarity.microsoft.com
(function(c,l,a,r,i,t,y){
  if (i === 'CLARITY_PROJECT_ID') return; // Skip if not configured
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","CLARITY_PROJECT_ID");

// ===== JSON-LD Structured Data =====
(function injectStructuredData() {
  var page = document.body.getAttribute('data-page') || '';
  var schemas = [];

  // WebSite schema (every page)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Simple Guy",
    "url": "https://vikramaditya.me",
    "author": { "@type": "Person", "name": "Vikram Aditya" }
  });

  // Person schema (about/home page)
  if (page === 'about') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Vikram Aditya",
      "url": "https://vikramaditya.me",
      "sameAs": [
        "https://www.instagram.com/the.simple.guyyy/",
        "https://www.instagram.com/itz_vkaditya/",
        "https://www.linkedin.com/in/adityakumar2608/"
      ],
      "jobTitle": "Content Creator & Software Engineer",
      "alumniOf": { "@type": "CollegeOrUniversity", "name": "IIT Bombay" }
    });
  }

  schemas.forEach(function(schema) {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
})();

// ===== Book Category Filter =====
(function initBookFilter() {
  var filterBar = document.querySelector('.filter-bar');
  if (!filterBar) return;

  filterBar.addEventListener('click', function(e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Update active state
    filterBar.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');

    var category = btn.getAttribute('data-category');
    var cards = document.querySelectorAll('.book-card');

    cards.forEach(function(card) {
      if (category === 'all') {
        card.style.display = '';
      } else {
        var cats = card.getAttribute('data-categories') || '';
        card.style.display = cats.includes(category) ? '' : 'none';
      }
    });
  });
})();

// ===== 100 Skills Hub =====
(function initSkillsHub() {
  var skillsGrid = document.getElementById('skills-grid');
  if (!skillsGrid) return;

  var base = getBasePath();
  var filterButtons = document.querySelectorAll('.skills-filter-btn');
  var progressFill = document.getElementById('skills-progress-fill');
  var progressLabel = document.getElementById('skills-progress-label');
  var totalCount = document.getElementById('skills-total-count');
  var scaffoldedCount = document.getElementById('skills-scaffolded-count');
  var plannedCount = document.getElementById('skills-planned-count');

  function padDay(day) {
    return String(day).padStart(3, '0');
  }

  function titleCase(value) {
    return value.split('-').map(function(part) {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join(' ');
  }

  function formatSkillDate(dateString) {
    if (!dateString) return 'Date TBD';
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function getCategoryIcon(category) {
    var iconMap = {
      creative: '✍️',
      physical: '💪',
      mental: '🧠',
      cooking: '🍳',
      music: '🎵',
      life: '🧰'
    };

    return iconMap[category] || '✨';
  }

  function renderCard(skill) {
    var categoryLabel = titleCase(skill.category);
    var difficultyLabel = titleCase(skill.difficulty);
    var dateLabel = formatSkillDate(skill.date);
    var statusLabel = skill.status === 'scaffolded' ? 'Ready' : 'Planned';
    var cardInner = `
      <div class="skill-card-thumb">
        <span>${getCategoryIcon(skill.category)}</span>
        <small>Day ${padDay(skill.day)}</small>
      </div>
      <div class="skill-card-body">
        <div class="skill-card-top">
          <p class="skill-day-label">Day ${padDay(skill.day)}</p>
          <span class="skill-status">${statusLabel}</span>
        </div>
        <h3>${skill.title}</h3>
        <p class="skill-card-date">${dateLabel}</p>
        <p class="skill-summary">${skill.summary}</p>
        <div class="skill-card-meta">
          <span class="skill-meta-pill">${categoryLabel}</span>
          <span class="skill-meta-pill ${skill.difficulty}">${difficultyLabel}</span>
        </div>
        <span class="skill-card-cta">${skill.status === 'scaffolded' ? 'Open scaffold' : 'Coming soon'}</span>
      </div>
    `;

    if (skill.status === 'scaffolded') {
      return `<a class="skill-card" href="${skill.path}" data-category="${skill.category}" data-difficulty="${skill.difficulty}" data-status="${skill.status}">${cardInner}</a>`;
    }

    return `<article class="skill-card is-planned" data-category="${skill.category}" data-difficulty="${skill.difficulty}" data-status="${skill.status}">${cardInner}</article>`;
  }

  function renderSkills(skills, activeFilter) {
    var filtered = skills.filter(function(skill) {
      return activeFilter === 'all' || skill.category === activeFilter;
    });

    if (filtered.length === 0) {
      skillsGrid.innerHTML = '<p class="skills-empty">No skills match this category yet.</p>';
      return;
    }

    skillsGrid.innerHTML = filtered.map(renderCard).join('');
  }

  fetch(base + 'assets/data/skills.json')
    .then(function(response) { return response.json(); })
    .then(function(payload) {
      var skills = Array.isArray(payload.skills) ? payload.skills : [];
      var scaffolded = skills.filter(function(skill) { return skill.status === 'scaffolded'; }).length;
      var planned = Math.max(skills.length - scaffolded, 0);
      var percent = skills.length > 0 ? (scaffolded / skills.length) * 100 : 0;
      var activeFilter = 'all';

      if (totalCount) totalCount.textContent = String(skills.length);
      if (scaffoldedCount) scaffoldedCount.textContent = String(scaffolded);
      if (plannedCount) plannedCount.textContent = String(planned);
      if (progressFill) progressFill.style.width = percent + '%';
      if (progressLabel) progressLabel.textContent = scaffolded + ' of ' + skills.length + ' pages scaffolded for launch.';

      renderSkills(skills, activeFilter);

      filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          activeFilter = button.getAttribute('data-skill-filter') || 'all';

          filterButtons.forEach(function(otherButton) {
            otherButton.classList.remove('active');
          });

          button.classList.add('active');
          renderSkills(skills, activeFilter);
        });
      });
    })
    .catch(function() {
      skillsGrid.innerHTML = '<p class="skills-empty">The skills grid could not be loaded right now.</p>';
      if (progressLabel) progressLabel.textContent = 'Skills data is unavailable right now.';
    });
})();

// ===== Movies & Series =====
(function initMoviesPage() {
  var moviesGrid = document.getElementById('movies-grid');
  if (!moviesGrid) return;

  var featuredGrid = document.getElementById('featured-movies-grid');
  var genreFilterBar = document.getElementById('movie-genre-filters');
  var platformFilterBar = document.getElementById('movie-platform-filters');
  var base = getBasePath();
  var activeGenre = 'all';
  var activePlatform = 'all';
  var genreFilterItems = [];
  var platformFilterItems = [];

  function slugToTitle(slug) {
    return slug.split('-').map(function(part) {
      if (part === 'tv') return 'TV';
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join(' ');
  }

  function renderStars(rating) {
    var full = '★'.repeat(rating);
    var empty = '☆'.repeat(Math.max(5 - rating, 0));
    return full + empty;
  }

  function renderPlatforms(platforms) {
    return platforms.map(function(platform) {
      return '<span class="movie-platform-badge">' + platform.label + '</span>';
    }).join('');
  }

  function renderTags(tags) {
    return tags.map(function(tag) {
      return '<span class="movie-vibe-tag">' + tag + '</span>';
    }).join('');
  }

  function renderMovieCard(item) {
    var affiliate = item.affiliateKey ? `
      <div class="buy-links">
        <span class="buy-label">Watch options:</span>
        <a href="#" class="buy-btn amazon" data-affiliate="movies.${item.affiliateKey}.amazon">${item.affiliateLabel || 'Watch on Prime'}</a>
      </div>
    ` : '';

    return `
      <article class="movie-card">
        <div class="movie-poster movie-poster--${item.posterTone}">
          <span class="movie-type-label">${item.type === 'series' ? 'Series' : 'Movie'}</span>
          <strong>${item.title}</strong>
          <small>${item.year}</small>
        </div>
        <div class="movie-card-content">
          <div class="movie-card-top">
            <div>
              <h3>${item.title}</h3>
              <p class="movie-year">${item.year} • ${item.type === 'series' ? 'Series' : 'Movie'}</p>
            </div>
            <span class="movie-rating" aria-label="Vikram rating ${item.vikramRating} out of 5">${renderStars(item.vikramRating)}</span>
          </div>

          <div class="movie-badge-row">
            ${item.genres.map(function(genre) {
              return '<span class="movie-genre-badge">' + genre + '</span>';
            }).join('')}
          </div>

          <div class="movie-platform-row">
            ${renderPlatforms(item.platforms)}
          </div>

          <p class="movie-review">${item.whyRecommend}</p>

          <div class="movie-vibes">
            ${renderTags(item.moodTags)}
          </div>

          ${affiliate}
        </div>
      </article>
    `;
  }

  function renderFeaturedCard(item) {
    return `
      <article class="movie-featured-card movie-featured-card--${item.posterTone}">
        <div class="movie-featured-rank">Top ${item.featuredRank}</div>
        <h3>${item.title}</h3>
        <p class="movie-featured-meta">${item.year} • ${item.type === 'series' ? 'Series' : 'Movie'}</p>
        <p>${item.whyRecommend}</p>
      </article>
    `;
  }

  function renderFilterButtons(container, items, activeValue, onClick) {
    if (!container) return;
    container.innerHTML = items.map(function(item) {
      var activeClass = item.value === activeValue ? ' active' : '';
      return '<button type="button" class="movie-filter-btn' + activeClass + '" data-value="' + item.value + '">' + item.label + '</button>';
    }).join('');

    container.querySelectorAll('.movie-filter-btn').forEach(function(button) {
      button.addEventListener('click', function() {
        onClick(button.getAttribute('data-value') || 'all');
      });
    });
  }

  function renderMovies(items) {
    var filtered = items.filter(function(item) {
      var genreMatch = activeGenre === 'all' || item.genres.some(function(genre) {
        return genre.toLowerCase().replace(/[^a-z0-9]+/g, '-') === activeGenre;
      });
      var platformMatch = activePlatform === 'all' || item.platforms.some(function(platform) {
        return platform.slug === activePlatform;
      });
      return genreMatch && platformMatch;
    });

    if (filtered.length === 0) {
      moviesGrid.innerHTML = '<p class="movies-empty">No titles match this combination yet. Try another genre or platform.</p>';
      return;
    }

    moviesGrid.innerHTML = filtered.map(renderMovieCard).join('');
    setDefaultBuyButtonLabels(moviesGrid);
    loadAffiliateLinks(moviesGrid);
  }

  function handleGenreChange(items, nextGenre) {
    activeGenre = nextGenre;
    renderFilterButtons(genreFilterBar, genreFilterItems, activeGenre, function(value) {
      handleGenreChange(items, value);
    });
    renderMovies(items);
  }

  function handlePlatformChange(items, nextPlatform) {
    activePlatform = nextPlatform;
    renderFilterButtons(platformFilterBar, platformFilterItems, activePlatform, function(value) {
      handlePlatformChange(items, value);
    });
    renderMovies(items);
  }

  fetch(base + 'assets/data/movies.json')
    .then(function(response) { return response.json(); })
    .then(function(payload) {
      var items = Array.isArray(payload.items) ? payload.items : [];
      var featured = items
        .filter(function(item) { return typeof item.featuredRank === 'number'; })
        .sort(function(a, b) { return a.featuredRank - b.featuredRank; })
        .slice(0, 10);

      var genreMap = {};
      var platformMap = {};

      items.forEach(function(item) {
        item.genres.forEach(function(genre) {
          var slug = genre.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          genreMap[slug] = genre;
        });

        item.platforms.forEach(function(platform) {
          platformMap[platform.slug] = platform.label;
        });
      });

      if (featuredGrid) {
        featuredGrid.innerHTML = featured.map(renderFeaturedCard).join('');
      }

      genreFilterItems = [{ value: 'all', label: 'All genres' }].concat(
        Object.keys(genreMap).sort().map(function(slug) {
          return { value: slug, label: genreMap[slug] };
        })
      );

      platformFilterItems = [{ value: 'all', label: 'All platforms' }].concat(
        Object.keys(platformMap).sort().map(function(slug) {
          return { value: slug, label: platformMap[slug] || slugToTitle(slug) };
        })
      );

      renderFilterButtons(
        genreFilterBar,
        genreFilterItems,
        activeGenre,
        function(nextGenre) {
          handleGenreChange(items, nextGenre);
        }
      );

      renderFilterButtons(
        platformFilterBar,
        platformFilterItems,
        activePlatform,
        function(nextPlatform) {
          handlePlatformChange(items, nextPlatform);
        }
      );

      renderMovies(items);
    })
    .catch(function() {
      moviesGrid.innerHTML = '<p class="movies-empty">The movie library could not be loaded right now.</p>';
    });
})();

// ===== Buy Button Labels (runs immediately) =====
function setDefaultBuyButtonLabels(scope) {
  var root = scope || document;
  root.querySelectorAll('.buy-btn').forEach(function(btn) {
    if ((btn.textContent || '').trim()) return;
    if (btn.classList.contains('amazon')) btn.textContent = 'Buy on Amazon';
    else if (btn.classList.contains('flipkart')) btn.textContent = 'Buy on Flipkart';
  });
}

setDefaultBuyButtonLabels();

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
let affiliateLinksCache = null;

function applyAffiliateLinks(data, scope) {
  const root = scope || document;
  const affiliateEls = root.querySelectorAll('[data-affiliate]');
  if (affiliateEls.length === 0) return;

  affiliateEls.forEach(el => {
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
}

function loadAffiliateLinks(scope) {
  const root = scope || document;
  const affiliateEls = root.querySelectorAll('[data-affiliate]');
  if (affiliateEls.length === 0) return Promise.resolve();

  if (affiliateLinksCache) {
    applyAffiliateLinks(affiliateLinksCache, root);
    return Promise.resolve();
  }

  return fetch(getBasePath() + 'assets/data/affiliate-links.json')
    .then(r => r.json())
    .then(data => {
      affiliateLinksCache = data;
      applyAffiliateLinks(data, root);
    })
    .catch(() => {});
}

loadAffiliateLinks();

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
