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
    { href: 'kitchen/', label: 'Kitchen', key: 'kitchen' },
    { href: 'skincare/', label: 'Skincare', key: 'skincare' },
    { href: 'style/', label: 'Style', key: 'style' },
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

// ===== Blog Data Loader =====
let blogDataCache = null;

function loadBlogData() {
  if (blogDataCache) {
    return Promise.resolve(blogDataCache);
  }

  return fetch(getBasePath() + 'assets/data/blog.json')
    .then(function(response) { return response.json(); })
    .then(function(data) {
      blogDataCache = data;
      return data;
    });
}

function formatBlogDate(dateString) {
  if (!dateString) return 'Date TBD';
  return new Date(dateString + 'T00:00:00').toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function formatBlogCategory(category) {
  return String(category || '').split('-').map(function(part) {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join(' ');
}

function buildBlogPath(slug) {
  return getBasePath() + 'blog/' + slug + '/';
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderBlogCard(post) {
  return `
    <a class="blog-preview-card" href="${buildBlogPath(post.slug)}">
      <div class="blog-preview-meta">
        <span class="blog-tag">${escapeHtml(formatBlogCategory(post.category))}</span>
        <span>${post.readingMinutes} min read</span>
      </div>
      <h2>${escapeHtml(post.title)}</h2>
      <p class="blog-preview-date">${formatBlogDate(post.date)}</p>
      <p class="blog-preview-excerpt">${escapeHtml(post.excerpt)}</p>
      <span class="blog-preview-cta">Read post</span>
    </a>
  `;
}

// ===== Blog Listing =====
(function initBlogIndex() {
  var blogGrid = document.getElementById('blog-post-grid');
  if (!blogGrid) return;

  var filterBar = document.getElementById('blog-category-filters');
  var totalCountEl = document.getElementById('blog-total-count');
  var categoryCountEl = document.getElementById('blog-category-count');
  var lastUpdatedEl = document.getElementById('blog-last-updated');
  var activeCategory = 'all';
  var allPosts = [];

  function renderFilters(categories) {
    if (!filterBar) return;

    filterBar.innerHTML = ['all'].concat(categories).map(function(category) {
      var isAll = category === 'all';
      var label = isAll ? 'All posts' : formatBlogCategory(category);
      var activeClass = category === activeCategory ? ' active' : '';
      return '<button type="button" class="filter-btn' + activeClass + '" data-blog-category="' + category + '">' + label + '</button>';
    }).join('');

    filterBar.querySelectorAll('[data-blog-category]').forEach(function(button) {
      button.addEventListener('click', function() {
        activeCategory = button.getAttribute('data-blog-category') || 'all';
        renderPosts(allPosts);
        renderFilters(categories);
      });
    });
  }

  function renderPosts(posts) {
    var filteredPosts = posts.filter(function(post) {
      return activeCategory === 'all' || post.category === activeCategory;
    });

    if (!filteredPosts.length) {
      blogGrid.innerHTML = '<p class="movies-empty">No blog posts match this category yet.</p>';
      return;
    }

    blogGrid.innerHTML = filteredPosts.map(renderBlogCard).join('');
  }

  loadBlogData()
    .then(function(payload) {
      var posts = Array.isArray(payload.posts) ? payload.posts.slice() : [];
      var categories = [];

      posts.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      posts.forEach(function(post) {
        if (categories.indexOf(post.category) === -1) {
          categories.push(post.category);
        }
      });

      allPosts = posts;

      if (totalCountEl) totalCountEl.textContent = String(posts.length);
      if (categoryCountEl) categoryCountEl.textContent = String(categories.length);
      if (lastUpdatedEl) lastUpdatedEl.textContent = formatBlogDate(payload.updatedAt);

      renderFilters(categories);
      renderPosts(posts);
    })
    .catch(function() {
      blogGrid.innerHTML = '<p class="movies-empty">The blog index could not be loaded right now.</p>';
    });
})();

// ===== Blog Post Pages =====
(function initBlogPostPages() {
  var article = document.querySelector('[data-blog-slug]');
  if (!article) return;

  var slug = article.getAttribute('data-blog-slug');
  var relatedGrid = document.getElementById('related-posts-grid');
  var shareButtons = article.querySelectorAll('[data-share]');

  function setupShareButtons(post) {
    var shareUrl = window.location.href;
    var shareText = post.title + ' - The Simple Guy';

    shareButtons.forEach(function(button) {
      var action = button.getAttribute('data-share');

      if (action === 'whatsapp') {
        button.href = 'https://wa.me/?text=' + encodeURIComponent(shareText + ' ' + shareUrl);
        button.setAttribute('target', '_blank');
        button.setAttribute('rel', 'noopener');
        return;
      }

      if (action === 'twitter') {
        button.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText) + '&url=' + encodeURIComponent(shareUrl);
        button.setAttribute('target', '_blank');
        button.setAttribute('rel', 'noopener');
        return;
      }

      if (action === 'linkedin') {
        button.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(shareUrl);
        button.setAttribute('target', '_blank');
        button.setAttribute('rel', 'noopener');
        return;
      }

      if (action === 'copy') {
        button.addEventListener('click', function() {
          if (!navigator.clipboard || !navigator.clipboard.writeText) return;
          navigator.clipboard.writeText(shareUrl).then(function() {
            button.textContent = 'Copied';
            setTimeout(function() {
              button.textContent = 'Copy link';
            }, 1800);
          }).catch(function() {});
        });
      }
    });
  }

  function injectBlogSchema(post) {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: 'Vikram Aditya'
      },
      mainEntityOfPage: window.location.href,
      publisher: {
        '@type': 'Person',
        name: 'Vikram Aditya'
      }
    });
    document.head.appendChild(script);
  }

  loadBlogData()
    .then(function(payload) {
      var posts = Array.isArray(payload.posts) ? payload.posts : [];
      var currentPost = posts.find(function(post) {
        return post.slug === slug;
      });

      if (!currentPost) return;

      setupShareButtons(currentPost);
      injectBlogSchema(currentPost);

      if (!relatedGrid) return;

      var relatedPosts = (currentPost.related || []).map(function(relatedSlug) {
        return posts.find(function(post) {
          return post.slug === relatedSlug;
        });
      }).filter(Boolean);

      if (!relatedPosts.length) {
        relatedPosts = posts.filter(function(post) {
          return post.slug !== currentPost.slug && post.category === currentPost.category;
        }).slice(0, 3);
      }

      relatedGrid.innerHTML = relatedPosts.map(renderBlogCard).join('');
    })
    .catch(function() {
      if (relatedGrid) {
        relatedGrid.innerHTML = '<p class="movies-empty">Related posts could not be loaded right now.</p>';
      }
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

// ===== Foods Data Loader =====
let foodsDataCache = null;

function loadFoodsData() {
  if (foodsDataCache) {
    return Promise.resolve(foodsDataCache);
  }

  return fetch(getBasePath() + 'assets/data/foods.json')
    .then(function(response) { return response.json(); })
    .then(function(data) {
      foodsDataCache = data;
      return data;
    });
}

function equipmentLevel(value) {
  var map = {
    none: 0,
    kettle: 1,
    'hot-plate': 2,
    'full-kitchen': 3
  };

  return map[value] || 0;
}

function supportsEquipment(requiredEquipment, selectedEquipment) {
  return equipmentLevel(selectedEquipment) >= equipmentLevel(requiredEquipment);
}

function buildFoodMap(foodItems) {
  return (foodItems || []).reduce(function(map, food) {
    map[food.id] = food;
    return map;
  }, {});
}

// ===== Products Data Loader =====
let productsDataCache = null;
let booksDataCache = null;

function loadProductsData() {
  if (productsDataCache) {
    return Promise.resolve(productsDataCache);
  }

  return fetch(getBasePath() + 'assets/data/products.json')
    .then(function(response) { return response.json(); })
    .then(function(data) {
      productsDataCache = data;
      return data;
    });
}

function loadBooksData() {
  if (booksDataCache) {
    return Promise.resolve(booksDataCache);
  }

  return fetch(getBasePath() + 'assets/data/books.json')
    .then(function(response) { return response.json(); })
    .then(function(data) {
      booksDataCache = data;
      return data;
    });
}

function isFoodAllowedForDiet(food, dietType) {
  return Array.isArray(food.diet) && food.diet.indexOf(dietType) !== -1;
}

function roundNumber(value) {
  return Math.round(value);
}

function formatCurrency(value) {
  return '₹' + Math.round(value).toLocaleString('en-IN');
}

function formatNumber(value) {
  return Math.round(value).toLocaleString('en-IN');
}

function computeBmr(stats) {
  var weight = Number(stats.weight);
  var height = Number(stats.height);
  var age = Number(stats.age);
  var isMale = stats.gender === 'male';
  return (10 * weight) + (6.25 * height) - (5 * age) + (isMale ? 5 : -161);
}

function computeTdee(stats) {
  return computeBmr(stats) * Number(stats.activity);
}

function getBmiCategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy range';
  if (bmi < 30) return 'Overweight';
  return 'Obese range';
}

function buildSipProjection(inputs) {
  var monthlyInvestment = Number(inputs.monthlyInvestment);
  var annualReturn = Number(inputs.annualReturn) / 100;
  var years = Number(inputs.years);
  var stepUp = Number(inputs.stepUp) / 100;
  var startingCorpus = Number(inputs.startingCorpus) || 0;
  var monthlyRate = annualReturn / 12;
  var corpus = startingCorpus;
  var invested = startingCorpus;
  var currentSip = monthlyInvestment;
  var milestones = [];

  for (var year = 1; year <= years; year += 1) {
    for (var month = 0; month < 12; month += 1) {
      corpus = (corpus + currentSip) * (1 + monthlyRate);
      invested += currentSip;
    }

    milestones.push({
      year: year,
      sip: currentSip,
      invested: invested,
      value: corpus,
      gain: corpus - invested
    });

    currentSip = currentSip * (1 + stepUp);
  }

  return {
    futureValue: corpus,
    invested: invested,
    gain: corpus - invested,
    milestones: milestones
  };
}

function computeEmi(inputs) {
  var principal = Number(inputs.principal);
  var monthlyRate = Number(inputs.annualRate) / 1200;
  var months = Number(inputs.years) * 12;
  var monthlyIncome = Number(inputs.monthlyIncome) || 0;
  var emi;

  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  }

  var totalPayment = emi * months;
  var totalInterest = totalPayment - principal;
  var emiShare = monthlyIncome > 0 ? (emi / monthlyIncome) * 100 : 0;
  var comfort = 'Comfortable';

  if (emiShare > 40) comfort = 'Tight';
  else if (emiShare > 25) comfort = 'Manageable';

  return {
    emi: emi,
    totalPayment: totalPayment,
    totalInterest: totalInterest,
    emiShare: emiShare,
    comfort: comfort
  };
}

function buildBudgetPlan(inputs) {
  var income = Number(inputs.income);
  var needs = Number(inputs.needs);
  var wants = Number(inputs.wants);
  var savings = Number(inputs.savings);
  var totalTracked = needs + wants + savings;
  var recommended = {
    needs: income * 0.5,
    wants: income * 0.3,
    savings: income * 0.2
  };

  function status(actual, target, positiveCopy, negativeCopy) {
    var delta = actual - target;
    if (Math.abs(delta) < income * 0.03) return 'Almost on target';
    return delta > 0 ? positiveCopy : negativeCopy;
  }

  return {
    income: income,
    totalTracked: totalTracked,
    leftover: income - totalTracked,
    actual: { needs: needs, wants: wants, savings: savings },
    recommended: recommended,
    debtShare: Number(inputs.debtShare) || 0,
    summaries: {
      needs: status(needs, recommended.needs, 'Needs are heavier than the classic split.', 'Needs are leaner than the classic split.'),
      wants: status(wants, recommended.wants, 'Wants are taking more room than usual.', 'Wants are under control.'),
      savings: status(savings, recommended.savings, 'Savings are ahead of the classic split.', 'Savings are below the classic split.')
    }
  };
}

const TAX_RULES_AY2026_27 = {
  label: 'AY 2026-27 (FY 2025-26)',
  cessRate: 0.04,
  oldRegime: {
    standardDeduction: 50000,
    rebateLimit: 500000,
    ageExemption: {
      below60: 250000,
      '60to80': 300000,
      above80: 500000
    }
  },
  newRegime: {
    standardDeduction: 75000,
    rebateLimit: 1200000,
    slabs: [
      { limit: 400000, rate: 0 },
      { limit: 800000, rate: 0.05 },
      { limit: 1200000, rate: 0.10 },
      { limit: 1600000, rate: 0.15 },
      { limit: 2000000, rate: 0.20 },
      { limit: 2400000, rate: 0.25 },
      { limit: Infinity, rate: 0.30 }
    ]
  }
};

function calculateOldRegimeTaxBeforeRebate(taxableIncome, ageGroup) {
  var exemption = TAX_RULES_AY2026_27.oldRegime.ageExemption[ageGroup] || 250000;
  var tax = 0;
  var slabs = [
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 }
  ];
  var lower = exemption;

  if (taxableIncome <= exemption) return 0;

  slabs.forEach(function(slab) {
    if (taxableIncome <= lower) return;
    var upper = Math.min(taxableIncome, slab.limit);
    tax += Math.max(0, upper - lower) * slab.rate;
    lower = slab.limit;
  });

  return tax;
}

function calculateNewRegimeTaxBeforeRebate(taxableIncome) {
  var tax = 0;
  var lower = 0;

  TAX_RULES_AY2026_27.newRegime.slabs.forEach(function(slab) {
    if (taxableIncome <= lower) return;
    var upper = Math.min(taxableIncome, slab.limit);
    tax += Math.max(0, upper - lower) * slab.rate;
    lower = slab.limit;
  });

  return tax;
}

function applyRebateWithMarginalRelief(taxBeforeRebate, taxableIncome, rebateLimit) {
  if (taxableIncome <= rebateLimit) return 0;
  var excessIncome = taxableIncome - rebateLimit;
  return Math.min(taxBeforeRebate, excessIncome);
}

function calculateTaxComparison(inputs) {
  var grossIncome = Number(inputs.salary) + Number(inputs.otherIncome || 0);
  var oldDeductions = Number(inputs.deduction80c || 0) + Number(inputs.deduction80d || 0) + Number(inputs.deductionNps || 0) + Number(inputs.homeLoanInterest || 0);
  var oldTaxableIncome = Math.max(0, grossIncome - TAX_RULES_AY2026_27.oldRegime.standardDeduction - oldDeductions);
  var newTaxableIncome = Math.max(0, grossIncome - TAX_RULES_AY2026_27.newRegime.standardDeduction);
  var oldTaxBeforeRebate = calculateOldRegimeTaxBeforeRebate(oldTaxableIncome, inputs.ageGroup);
  var newTaxBeforeRebate = calculateNewRegimeTaxBeforeRebate(newTaxableIncome);
  var oldTaxAfterRebate = applyRebateWithMarginalRelief(oldTaxBeforeRebate, oldTaxableIncome, TAX_RULES_AY2026_27.oldRegime.rebateLimit);
  var newTaxAfterRebate = applyRebateWithMarginalRelief(newTaxBeforeRebate, newTaxableIncome, TAX_RULES_AY2026_27.newRegime.rebateLimit);
  var oldCess = oldTaxAfterRebate * TAX_RULES_AY2026_27.cessRate;
  var newCess = newTaxAfterRebate * TAX_RULES_AY2026_27.cessRate;
  var oldTotal = oldTaxAfterRebate + oldCess;
  var newTotal = newTaxAfterRebate + newCess;

  return {
    label: TAX_RULES_AY2026_27.label,
    grossIncome: grossIncome,
    oldRegime: {
      taxableIncome: oldTaxableIncome,
      deductions: oldDeductions + TAX_RULES_AY2026_27.oldRegime.standardDeduction,
      tax: oldTotal
    },
    newRegime: {
      taxableIncome: newTaxableIncome,
      deductions: TAX_RULES_AY2026_27.newRegime.standardDeduction,
      tax: newTotal
    },
    betterRegime: oldTotal <= newTotal ? 'Old Regime' : 'New Regime',
    difference: Math.abs(oldTotal - newTotal)
  };
}

const READ_NEXT_PROFILES = {
  siddhartha: ['meaning', 'spiritual', 'philosophical', 'deep'],
  'the-alchemist': ['meaning', 'story', 'philosophical', 'light'],
  'book-of-five-rings': ['discipline', 'practical', 'deep', 'sharp'],
  'jonathan-livingston-seagull': ['meaning', 'story', 'light', 'philosophical'],
  'animal-farm': ['story', 'sharp', 'deep'],
  'clear-thinking': ['clarity', 'practical', 'sharp', 'deep'],
  'the-great-ceo-within': ['wealth', 'practical', 'deep'],
  'zorba-the-buddha': ['meaning', 'spiritual', 'deep', 'philosophical'],
  'tao-te-ching': ['meaning', 'spiritual', 'light', 'philosophical'],
  principles: ['wealth', 'practical', 'deep'],
  'almanack-of-naval-ravikant': ['wealth', 'clarity', 'philosophical', 'medium'],
  'poor-charlies-almanack': ['wealth', 'sharp', 'deep'],
  'hsin-hsin-ming': ['spiritual', 'deep'],
  'the-prophet': ['meaning', 'philosophical', 'medium'],
  'atomic-habits': ['discipline', 'practical', 'light']
};

function computeNutritionTargets(stats) {
  var weight = Number(stats.weight);
  var height = Number(stats.height);
  var age = Number(stats.age);
  var activityFactor = Number(stats.activity);
  var isMale = stats.gender === 'male';
  var bmr = (10 * weight) + (6.25 * height) - (5 * age) + (isMale ? 5 : -161);
  var tdee = bmr * activityFactor;
  var calorieAdjustment = stats.goal === 'lose' ? -350 : (stats.goal === 'gain' ? 300 : 0);
  var targetCalories = Math.max(1200, tdee + calorieAdjustment);
  var proteinMultiplier = stats.goal === 'lose' ? 2 : (stats.goal === 'gain' ? 1.8 : 1.7);
  var fatMultiplier = stats.goal === 'lose' ? 0.7 : 0.8;
  var protein = weight * proteinMultiplier;
  var fat = weight * fatMultiplier;
  var carbs = Math.max(90, (targetCalories - (protein * 4) - (fat * 9)) / 4);

  return {
    bmr: roundNumber(bmr),
    tdee: roundNumber(tdee),
    calories: roundNumber(targetCalories),
    protein: roundNumber(protein),
    carbs: roundNumber(carbs),
    fat: roundNumber(fat)
  };
}

function sumFoodItems(foodItems) {
  return (foodItems || []).reduce(function(totals, food) {
    totals.calories += food.calories || 0;
    totals.protein += food.protein || 0;
    totals.carbs += food.carbs || 0;
    totals.fat += food.fat || 0;
    totals.cost += food.costApprox || 0;
    return totals;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, cost: 0 });
}

const DIET_PLAN_TEMPLATES = [
  { id: 'oats-bowl', name: 'Oats + Milk + Banana Bowl', mealType: 'breakfast', requiredEquipment: 'kettle', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['oats-50g', 'milk-250ml', 'banana-1-large', 'peanut-butter-1-tbsp'] },
  { id: 'curd-oats-fruit', name: 'Curd Oats + Fruit Bowl', mealType: 'breakfast', requiredEquipment: 'kettle', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['oats-50g', 'curd-200g', 'apple-1-medium'] },
  { id: 'whey-shake-breakfast', name: 'Whey + Milk + Banana', mealType: 'breakfast', requiredEquipment: 'none', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['whey-protein-1-scoop', 'milk-250ml', 'banana-1-large'] },
  { id: 'poha-curd', name: 'Poha + Curd', mealType: 'breakfast', requiredEquipment: 'hot-plate', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['poha-1-plate', 'curd-200g'] },
  { id: 'egg-toast', name: 'Eggs + Bread', mealType: 'breakfast', requiredEquipment: 'hot-plate', diets: ['egg-vegetarian', 'non-vegetarian'], foodIds: ['eggs-2', 'bread-4-slices'] },
  { id: 'moong-cheela-breakfast', name: 'Moong Cheela + Curd', mealType: 'breakfast', requiredEquipment: 'hot-plate', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['moong-cheela-2', 'curd-200g'] },
  { id: 'soya-sweet-potato-bowl', name: 'Soya + Sweet Potato Bowl', mealType: 'lunch', requiredEquipment: 'kettle', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['soya-chunks-50g', 'sweet-potato-200g', 'cucumber-salad-1-bowl'] },
  { id: 'sprouts-curd-lunch', name: 'Sprouts + Curd + Fruit', mealType: 'lunch', requiredEquipment: 'none', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['sprouts-salad-1-bowl', 'curd-200g', 'banana-1-large'] },
  { id: 'rajma-rice', name: 'Rajma Rice', mealType: 'lunch', requiredEquipment: 'full-kitchen', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['rajma-1-bowl', 'white-rice-1-cup', 'cucumber-salad-1-bowl'] },
  { id: 'chole-roti', name: 'Chole + Roti', mealType: 'lunch', requiredEquipment: 'full-kitchen', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['chole-1-bowl', 'roti-2', 'tomato-onion-salad-1-bowl'] },
  { id: 'paneer-sandwich-lunch', name: 'Paneer Sandwich + Curd', mealType: 'lunch', requiredEquipment: 'hot-plate', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['paneer-sandwich-1', 'curd-200g'] },
  { id: 'tofu-toast-lunch', name: 'Tofu Bhurji + Bread', mealType: 'lunch', requiredEquipment: 'hot-plate', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['tofu-bhurji-1-plate', 'bread-4-slices'] },
  { id: 'chicken-rice', name: 'Chicken Rice Bowl', mealType: 'lunch', requiredEquipment: 'full-kitchen', diets: ['non-vegetarian'], foodIds: ['chicken-breast-150g', 'white-rice-1-cup', 'cucumber-salad-1-bowl'] },
  { id: 'khichdi-curd', name: 'Dal Khichdi + Curd', mealType: 'dinner', requiredEquipment: 'full-kitchen', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['dal-khichdi-1-bowl', 'curd-200g'] },
  { id: 'egg-bhurji-toast', name: 'Egg Bhurji + Bread', mealType: 'dinner', requiredEquipment: 'hot-plate', diets: ['egg-vegetarian', 'non-vegetarian'], foodIds: ['egg-bhurji-1-plate', 'bread-4-slices', 'tomato-onion-salad-1-bowl'] },
  { id: 'tofu-bhurji-toast', name: 'Tofu Bhurji + Bread', mealType: 'dinner', requiredEquipment: 'hot-plate', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['tofu-bhurji-1-plate', 'bread-4-slices', 'cucumber-salad-1-bowl'] },
  { id: 'chicken-curry-rice', name: 'Chicken Curry + Rice', mealType: 'dinner', requiredEquipment: 'full-kitchen', diets: ['non-vegetarian'], foodIds: ['chicken-curry-1-bowl', 'white-rice-1-cup', 'cucumber-salad-1-bowl'] },
  { id: 'curd-rice-dinner', name: 'Curd Rice + Salad', mealType: 'dinner', requiredEquipment: 'full-kitchen', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['curd-rice-1-bowl', 'tomato-onion-salad-1-bowl'] },
  { id: 'fish-rice', name: 'Fish Curry + Rice', mealType: 'dinner', requiredEquipment: 'full-kitchen', diets: ['non-vegetarian'], foodIds: ['fish-curry-1-bowl', 'white-rice-1-cup', 'cucumber-salad-1-bowl'] },
  { id: 'whey-banana-snack', name: 'Whey + Banana', mealType: 'snack', requiredEquipment: 'none', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['whey-protein-1-scoop', 'banana-1-large'] },
  { id: 'greek-yogurt-snack', name: 'Greek Yogurt + Apple + Almonds', mealType: 'snack', requiredEquipment: 'none', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['greek-yogurt-200g', 'apple-1-medium', 'almonds-20g'] },
  { id: 'chaat-snack', name: 'Chickpea Chaat + Buttermilk', mealType: 'snack', requiredEquipment: 'none', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['chickpea-chaat-1-bowl', 'buttermilk-1-glass'] },
  { id: 'sprouts-peanuts-snack', name: 'Sprouts + Roasted Peanuts', mealType: 'snack', requiredEquipment: 'none', diets: ['vegetarian', 'egg-vegetarian', 'non-vegetarian'], foodIds: ['sprouts-salad-1-bowl', 'roasted-peanuts-30g'] }
];

function scoreTemplate(templateTotals, goal) {
  if (goal === 'lose') {
    return (templateTotals.protein * 5) - (templateTotals.calories * 0.35) - (templateTotals.fat * 1.5);
  }

  if (goal === 'gain') {
    return (templateTotals.protein * 4) + (templateTotals.calories * 0.22) - (templateTotals.cost * 0.2);
  }

  return (templateTotals.protein * 4) - Math.abs(templateTotals.calories - 450) - (templateTotals.cost * 0.15);
}

function buildBudgetThresholds(level) {
  var map = {
    low: { breakfast: 45, lunch: 65, snack: 40, dinner: 65 },
    medium: { breakfast: 70, lunch: 95, snack: 60, dinner: 95 },
    high: { breakfast: 100, lunch: 140, snack: 80, dinner: 140 }
  };

  return map[level] || map.medium;
}

function getCandidateTemplates(foodMap, answers, mealType) {
  var thresholds = buildBudgetThresholds(answers.budget);

  return DIET_PLAN_TEMPLATES
    .filter(function(template) {
      if (template.mealType !== mealType) return false;
      if (template.diets.indexOf(answers.dietType) === -1) return false;
      if (!supportsEquipment(template.requiredEquipment, answers.equipment)) return false;
      return template.foodIds.every(function(foodId) {
        var food = foodMap[foodId];
        return food && isFoodAllowedForDiet(food, answers.dietType);
      });
    })
    .map(function(template) {
      var foodItems = template.foodIds.map(function(foodId) { return foodMap[foodId]; });
      var totals = sumFoodItems(foodItems);
      return {
        id: template.id,
        name: template.name,
        mealType: template.mealType,
        requiredEquipment: template.requiredEquipment,
        foods: foodItems,
        totals: totals
      };
    })
    .filter(function(template) {
      return template.totals.cost <= (thresholds[mealType] || 999);
    });
}

function pickMealTemplate(candidates, goal, fallbackPool, offset) {
  var pool = candidates.length ? candidates : fallbackPool;
  if (!pool.length) return null;

  var sorted = pool.slice().sort(function(a, b) {
    return scoreTemplate(b.totals, goal) - scoreTemplate(a.totals, goal);
  });

  return sorted[offset % sorted.length];
}

function getAllowedBoosters(foodMap, answers, type) {
  var idsByType = {
    protein: ['whey-protein-1-scoop', 'greek-yogurt-200g', 'soya-chunks-50g', 'paneer-100g', 'tofu-100g', 'egg-whites-4', 'chicken-breast-150g'],
    carb: ['white-rice-1-cup', 'roti-2', 'banana-1-large', 'oats-50g', 'sweet-potato-200g'],
    fat: ['peanut-butter-1-tbsp', 'almonds-20g', 'roasted-peanuts-30g']
  };

  return (idsByType[type] || [])
    .map(function(id) { return foodMap[id]; })
    .filter(function(food) {
      if (!food) return false;
      if (!isFoodAllowedForDiet(food, answers.dietType)) return false;
      return (food.equipment || []).some(function(item) {
        return supportsEquipment(item, answers.equipment);
      }) || (food.equipment || []).indexOf('none') !== -1;
    });
}

function buildDietPlan(foodPayload, answers) {
  var foods = foodPayload.foods || [];
  var foodMap = buildFoodMap(foods);
  var targets = computeNutritionTargets(answers);
  var selectedMeals = [];
  var addOns = [];
  var mealTypes = ['breakfast', 'lunch', 'snack', 'dinner'];
  var fallbackPools = {};

  mealTypes.forEach(function(mealType) {
    fallbackPools[mealType] = DIET_PLAN_TEMPLATES
      .filter(function(template) {
        return template.mealType === mealType &&
          template.diets.indexOf(answers.dietType) !== -1 &&
          supportsEquipment(template.requiredEquipment, answers.equipment);
      })
      .map(function(template) {
        return {
          id: template.id,
          name: template.name,
          mealType: template.mealType,
          requiredEquipment: template.requiredEquipment,
          foods: template.foodIds.map(function(foodId) { return foodMap[foodId]; }).filter(Boolean),
          totals: sumFoodItems(template.foodIds.map(function(foodId) { return foodMap[foodId]; }).filter(Boolean))
        };
      });
  });

  mealTypes.forEach(function(mealType, index) {
    var candidates = getCandidateTemplates(foodMap, answers, mealType);
    var picked = pickMealTemplate(candidates, answers.goal, fallbackPools[mealType], index);
    if (picked) {
      selectedMeals.push(picked);
    }
  });

  var totals = selectedMeals.reduce(function(acc, meal) {
    acc.calories += meal.totals.calories;
    acc.protein += meal.totals.protein;
    acc.carbs += meal.totals.carbs;
    acc.fat += meal.totals.fat;
    acc.cost += meal.totals.cost;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, cost: 0 });

  function addBooster(food, reason) {
    addOns.push({ food: food, reason: reason });
    totals.calories += food.calories;
    totals.protein += food.protein;
    totals.carbs += food.carbs;
    totals.fat += food.fat;
    totals.cost += food.costApprox || 0;
  }

  if ((targets.protein - totals.protein) > 18) {
    var proteinBoosters = getAllowedBoosters(foodMap, answers, 'protein').sort(function(a, b) {
      return (b.protein / (b.costApprox || 1)) - (a.protein / (a.costApprox || 1));
    });
    if (proteinBoosters[0]) addBooster(proteinBoosters[0], 'Boost protein');
  }

  if ((targets.calories - totals.calories) > 220) {
    var carbBoosters = getAllowedBoosters(foodMap, answers, 'carb').sort(function(a, b) {
      return (b.carbs + b.calories * 0.1) - (a.carbs + a.calories * 0.1);
    });
    if (carbBoosters[0]) addBooster(carbBoosters[0], 'Add easy calories');
  }

  if ((targets.calories - totals.calories) > 220) {
    var fatBoosters = getAllowedBoosters(foodMap, answers, 'fat').sort(function(a, b) {
      return (b.fat + b.calories * 0.05) - (a.fat + a.calories * 0.05);
    });
    if (fatBoosters[0]) addBooster(fatBoosters[0], 'Add calorie-dense support');
  }

  return {
    targets: targets,
    meals: selectedMeals,
    addOns: addOns,
    totals: {
      calories: roundNumber(totals.calories),
      protein: roundNumber(totals.protein),
      carbs: roundNumber(totals.carbs),
      fat: roundNumber(totals.fat),
      cost: roundNumber(totals.cost)
    }
  };
}

function buildPlanShareText(plan, answers) {
  return [
    'My diet plan from The Simple Guy',
    'Goal: ' + answers.goal,
    'Calories: ' + plan.targets.calories + ' kcal',
    'Protein: ' + plan.targets.protein + 'g',
    'Carbs: ' + plan.targets.carbs + 'g',
    'Fat: ' + plan.targets.fat + 'g',
    'Estimated cost/day: ' + formatCurrency(plan.totals.cost)
  ].join('\n');
}

function renderDietPlan(plan, answers, container) {
  var mealsHtml = plan.meals.map(function(meal) {
    return `
      <article class="tool-meal-card">
        <div class="tool-meal-top">
          <div>
            <p class="tool-meal-label">${meal.mealType}</p>
            <h3>${meal.name}</h3>
          </div>
          <span class="tool-meal-cost">${formatCurrency(meal.totals.cost)}</span>
        </div>
        <p class="tool-meal-foods">${meal.foods.map(function(food) { return food.name; }).join(' • ')}</p>
        <p class="tool-meal-macros">${roundNumber(meal.totals.calories)} kcal • ${roundNumber(meal.totals.protein)}g protein • ${roundNumber(meal.totals.carbs)}g carbs • ${roundNumber(meal.totals.fat)}g fat</p>
      </article>
    `;
  }).join('');

  var addOnsHtml = plan.addOns.length ? `
    <div class="tool-addon-list">
      <h3>Suggested Add-ons</h3>
      ${plan.addOns.map(function(addOn) {
        return '<p><strong>' + addOn.food.name + '</strong> — ' + addOn.reason + '</p>';
      }).join('')}
    </div>
  ` : '';

  container.innerHTML = `
    <h2>Your Plan</h2>
    <div class="tool-summary-grid">
      <div class="tool-summary-card">
        <span>Target Calories</span>
        <strong>${plan.targets.calories}</strong>
        <small>BMR ${plan.targets.bmr} • TDEE ${plan.targets.tdee}</small>
      </div>
      <div class="tool-summary-card">
        <span>Protein</span>
        <strong>${plan.targets.protein}g</strong>
        <small>Actual ${plan.totals.protein}g</small>
      </div>
      <div class="tool-summary-card">
        <span>Carbs</span>
        <strong>${plan.targets.carbs}g</strong>
        <small>Actual ${plan.totals.carbs}g</small>
      </div>
      <div class="tool-summary-card">
        <span>Fats</span>
        <strong>${plan.targets.fat}g</strong>
        <small>Actual ${plan.totals.fat}g</small>
      </div>
    </div>

    <div class="tool-plan-note">
      <p><strong>Daily cost estimate:</strong> ${formatCurrency(plan.totals.cost)}</p>
      <p><strong>Built for:</strong> ${answers.dietType.replace('-', ' ')} • ${answers.equipment.replace('-', ' ')} • ${answers.budget} budget</p>
    </div>

    <div class="tool-meal-list">
      ${mealsHtml}
    </div>

    ${addOnsHtml}

    <div class="tool-action-row">
      <button type="button" class="btn tool-print-btn">Print My Plan</button>
      <button type="button" class="btn tool-save-btn">Save to Phone</button>
    </div>

    <section class="recommendation-section tool-recommendation-block">
      <h2>Supplements That Help When Food Falls Short</h2>
      <div class="supplement-grid">
        <div class="supplement-card">
          <div class="supplement-type">Protein</div>
          <h4>Whey Protein</h4>
          <p>Useful when daily protein is falling short and you need one clean, easy add-on.</p>
          <div class="buy-links">
            <a href="#" class="buy-btn amazon" data-affiliate="supplements.whey-protein.amazon"></a>
            <a href="#" class="buy-btn flipkart" data-affiliate="supplements.whey-protein.flipkart"></a>
          </div>
        </div>
        <div class="supplement-card">
          <div class="supplement-type">Performance</div>
          <h4>Creatine</h4>
          <p>If you train consistently, creatine is still one of the simplest and best-supported additions.</p>
          <div class="buy-links">
            <a href="#" class="buy-btn amazon" data-affiliate="supplements.creatine.amazon"></a>
            <a href="#" class="buy-btn flipkart" data-affiliate="supplements.creatine.flipkart"></a>
          </div>
        </div>
      </div>
    </section>
  `;

  setDefaultBuyButtonLabels(container);
  loadAffiliateLinks(container);

  var shareText = buildPlanShareText(plan, answers);
  var printBtn = container.querySelector('.tool-print-btn');
  var saveBtn = container.querySelector('.tool-save-btn');

  if (printBtn) {
    printBtn.addEventListener('click', function() {
      window.print();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      if (navigator.share) {
        navigator.share({
          title: 'My Diet Plan',
          text: shareText
        }).catch(function() {});
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText).then(function() {
          saveBtn.textContent = 'Copied Plan';
          setTimeout(function() {
            saveBtn.textContent = 'Save to Phone';
          }, 2000);
        }).catch(function() {});
      }
    });
  }
}

// ===== Kitchen Filter =====
(function initKitchenFilter() {
  var filterBar = document.querySelector('.kitchen-filter-bar');
  if (!filterBar) return;

  var levelMap = {
    all: 0,
    kettle: 1,
    'hot-plate': 2,
    'full-kitchen': 3
  };

  filterBar.addEventListener('click', function(event) {
    var button = event.target.closest('.filter-btn');
    if (!button) return;

    filterBar.querySelectorAll('.filter-btn').forEach(function(item) {
      item.classList.remove('active');
    });
    button.classList.add('active');

    var filter = button.getAttribute('data-kitchen-filter') || 'all';
    var level = levelMap[filter] || 0;

    document.querySelectorAll('.recipe-card').forEach(function(card) {
      var cardLevel = Number(card.getAttribute('data-kitchen-level') || '0');
      if (filter === 'all') {
        card.style.display = '';
      } else {
        card.style.display = cardLevel <= level ? '' : 'none';
      }
    });
  });
})();

// ===== Diet Planner =====
(function initDietPlanner() {
  var form = document.getElementById('diet-planner-form');
  var result = document.getElementById('diet-plan-result');
  if (!form || !result) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(form);
    var answers = {
      age: formData.get('age'),
      gender: formData.get('gender'),
      height: formData.get('height'),
      weight: formData.get('weight'),
      activity: formData.get('activity'),
      goal: formData.get('goal'),
      dietType: formData.get('dietType'),
      budget: formData.get('budget'),
      equipment: formData.get('equipment')
    };

    result.innerHTML = '<h2>Your Plan</h2><p class="tool-placeholder">Building your plan...</p>';

    loadFoodsData()
      .then(function(foodPayload) {
        var plan = buildDietPlan(foodPayload, answers);
        renderDietPlan(plan, answers, result);
      })
      .catch(function() {
        result.innerHTML = '<h2>Your Plan</h2><p class="tool-placeholder">The food database could not be loaded right now.</p>';
      });
  });
})();

// ===== Macro Calculator =====
(function initMacroCalculator() {
  var form = document.getElementById('macro-calculator-form');
  var result = document.getElementById('macro-calculator-result');
  if (!form || !result) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(form);
    var targets = computeNutritionTargets({
      age: formData.get('age'),
      gender: formData.get('gender'),
      height: formData.get('height'),
      weight: formData.get('weight'),
      activity: formData.get('activity'),
      goal: formData.get('goal')
    });

    result.innerHTML = `
      <h2>Your Targets</h2>
      <div class="tool-summary-grid">
        <div class="tool-summary-card">
          <span>BMR</span>
          <strong>${targets.bmr}</strong>
          <small>Calories at rest</small>
        </div>
        <div class="tool-summary-card">
          <span>TDEE</span>
          <strong>${targets.tdee}</strong>
          <small>Maintenance calories</small>
        </div>
        <div class="tool-summary-card">
          <span>Target Calories</span>
          <strong>${targets.calories}</strong>
          <small>Based on your goal</small>
        </div>
      </div>

      <div class="tool-macro-grid">
        <article class="tool-macro-card">
          <h3>Protein</h3>
          <strong>${targets.protein}g</strong>
          <p>Priority macro for muscle repair, satiety, and body composition.</p>
        </article>
        <article class="tool-macro-card">
          <h3>Carbs</h3>
          <strong>${targets.carbs}g</strong>
          <p>Your main energy source, especially if you lift, run, or train regularly.</p>
        </article>
        <article class="tool-macro-card">
          <h3>Fats</h3>
          <strong>${targets.fat}g</strong>
          <p>Needed for hormones, recovery, and keeping meals satisfying.</p>
        </article>
      </div>

      <div class="tool-plan-note">
        <p><strong>Simple split:</strong> breakfast 25%, lunch 30%, snack 15%, dinner 30%.</p>
        <p><strong>Practical tip:</strong> if hitting protein feels hard, solve that first. Everything else gets easier after that.</p>
      </div>
    `;
  });
})();

// ===== SIP Calculator =====
(function initSipCalculator() {
  var form = document.getElementById('sip-calculator-form');
  var result = document.getElementById('sip-calculator-result');
  if (!form || !result) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(form);
    var projection = buildSipProjection({
      monthlyInvestment: formData.get('monthlyInvestment'),
      annualReturn: formData.get('annualReturn'),
      years: formData.get('years'),
      stepUp: formData.get('stepUp'),
      startingCorpus: formData.get('startingCorpus')
    });

    result.innerHTML = `
      <h2>Your Projection</h2>
      <div class="tool-summary-grid">
        <div class="tool-summary-card">
          <span>Future Value</span>
          <strong>${formatCurrency(projection.futureValue)}</strong>
          <small>Projected corpus</small>
        </div>
        <div class="tool-summary-card">
          <span>Total Invested</span>
          <strong>${formatCurrency(projection.invested)}</strong>
          <small>Your money in</small>
        </div>
        <div class="tool-summary-card">
          <span>Wealth Gained</span>
          <strong>${formatCurrency(projection.gain)}</strong>
          <small>Estimated growth</small>
        </div>
      </div>

      <div class="tool-plan-note">
        <p><strong>What matters:</strong> The gap between invested amount and future value gets wider later, not earlier. That is the part people underestimate.</p>
      </div>

      <div class="tool-table-wrap">
        <table class="tool-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Monthly SIP</th>
              <th>Invested</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            ${projection.milestones.map(function(row) {
              return `
                <tr>
                  <td>${row.year}</td>
                  <td>${formatCurrency(row.sip)}</td>
                  <td>${formatCurrency(row.invested)}</td>
                  <td>${formatCurrency(row.value)}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  });
})();

// ===== EMI Calculator =====
(function initEmiCalculator() {
  var form = document.getElementById('emi-calculator-form');
  var result = document.getElementById('emi-calculator-result');
  if (!form || !result) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(form);
    var emi = computeEmi({
      principal: formData.get('principal'),
      annualRate: formData.get('annualRate'),
      years: formData.get('years'),
      monthlyIncome: formData.get('monthlyIncome')
    });

    result.innerHTML = `
      <h2>Your EMI</h2>
      <div class="tool-summary-grid">
        <div class="tool-summary-card">
          <span>Monthly EMI</span>
          <strong>${formatCurrency(emi.emi)}</strong>
          <small>What you pay every month</small>
        </div>
        <div class="tool-summary-card">
          <span>Total Interest</span>
          <strong>${formatCurrency(emi.totalInterest)}</strong>
          <small>Cost of borrowing</small>
        </div>
        <div class="tool-summary-card">
          <span>Total Payment</span>
          <strong>${formatCurrency(emi.totalPayment)}</strong>
          <small>Principal + interest</small>
        </div>
      </div>

      <div class="tool-plan-note">
        <p><strong>Income share:</strong> ${emi.emiShare ? emi.emiShare.toFixed(1) + '% of take-home' : 'Monthly income not provided'}</p>
        <p><strong>Comfort check:</strong> ${emi.comfort}</p>
      </div>
    `;
  });
})();

// ===== BMI + TDEE Calculator =====
(function initBmiCalculator() {
  var form = document.getElementById('bmi-calculator-form');
  var result = document.getElementById('bmi-calculator-result');
  if (!form || !result) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(form);
    var stats = {
      age: formData.get('age'),
      gender: formData.get('gender'),
      height: formData.get('height'),
      weight: formData.get('weight'),
      activity: formData.get('activity')
    };
    var heightMeters = Number(stats.height) / 100;
    var bmi = Number(stats.weight) / (heightMeters * heightMeters);
    var bmr = computeBmr(stats);
    var tdee = computeTdee(stats);
    var protein = Number(stats.weight) * 1.8;

    result.innerHTML = `
      <h2>Your Targets</h2>
      <div class="tool-summary-grid">
        <div class="tool-summary-card">
          <span>BMI</span>
          <strong>${bmi.toFixed(1)}</strong>
          <small>${getBmiCategory(bmi)}</small>
        </div>
        <div class="tool-summary-card">
          <span>BMR</span>
          <strong>${formatNumber(bmr)}</strong>
          <small>Calories at rest</small>
        </div>
        <div class="tool-summary-card">
          <span>TDEE</span>
          <strong>${formatNumber(tdee)}</strong>
          <small>Estimated maintenance</small>
        </div>
      </div>

      <div class="tool-macro-grid">
        <article class="tool-macro-card">
          <h3>Cut</h3>
          <strong>${formatNumber(tdee - 350)}</strong>
          <p>Useful if fat loss is the main priority and training performance still matters.</p>
        </article>
        <article class="tool-macro-card">
          <h3>Maintain</h3>
          <strong>${formatNumber(tdee)}</strong>
          <p>Good when you want stable weight and better adherence.</p>
        </article>
        <article class="tool-macro-card">
          <h3>Lean Gain</h3>
          <strong>${formatNumber(tdee + 250)}</strong>
          <p>Better than an aggressive surplus if you want cleaner progress.</p>
        </article>
      </div>

      <div class="tool-plan-note">
        <p><strong>Protein target:</strong> about ${formatNumber(protein)}g per day as a practical starting point.</p>
        <p><strong>Next step:</strong> use the Diet Planner or Macro Calculator if you want this translated into food and meals.</p>
      </div>
    `;
  });
})();

// ===== Budget Planner =====
(function initBudgetPlanner() {
  var form = document.getElementById('budget-planner-form');
  var result = document.getElementById('budget-planner-result');
  if (!form || !result) return;

  function renderBudgetRow(label, actual, recommended, summary) {
    var actualPct = recommended > 0 ? (actual / recommended) * 100 : 0;
    return `
      <article class="tool-compare-card">
        <div class="tool-compare-head">
          <h3>${label}</h3>
          <span>${formatCurrency(actual)} / ${formatCurrency(recommended)}</span>
        </div>
        <div class="tool-bar">
          <span style="width:${Math.min(actualPct, 160)}%"></span>
        </div>
        <p>${summary}</p>
      </article>
    `;
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(form);
    var plan = buildBudgetPlan({
      income: formData.get('income'),
      needs: formData.get('needs'),
      wants: formData.get('wants'),
      savings: formData.get('savings'),
      debtShare: formData.get('debtShare')
    });

    result.innerHTML = `
      <h2>Your Budget View</h2>
      <div class="tool-summary-grid">
        <div class="tool-summary-card">
          <span>Monthly Income</span>
          <strong>${formatCurrency(plan.income)}</strong>
          <small>Take-home</small>
        </div>
        <div class="tool-summary-card">
          <span>Tracked Spend</span>
          <strong>${formatCurrency(plan.totalTracked)}</strong>
          <small>Needs + wants + savings</small>
        </div>
        <div class="tool-summary-card">
          <span>Leftover</span>
          <strong>${formatCurrency(plan.leftover)}</strong>
          <small>${plan.leftover >= 0 ? 'Unassigned cash' : 'Over budget'}</small>
        </div>
      </div>

      <div class="tool-compare-grid">
        ${renderBudgetRow('Needs', plan.actual.needs, plan.recommended.needs, plan.summaries.needs)}
        ${renderBudgetRow('Wants', plan.actual.wants, plan.recommended.wants, plan.summaries.wants)}
        ${renderBudgetRow('Savings', plan.actual.savings, plan.recommended.savings, plan.summaries.savings)}
      </div>

      <div class="tool-plan-note">
        <p><strong>Debt inside needs:</strong> about ${formData.get('debtShare')}% of your needs bucket.</p>
        <p><strong>Simple move:</strong> if savings are low, cut wants first. If needs are bloated, attack the biggest fixed cost before worrying about tiny expenses.</p>
      </div>
    `;
  });
})();

// ===== Tax Calculator =====
(function initTaxCalculator() {
  var form = document.getElementById('tax-calculator-form');
  var result = document.getElementById('tax-calculator-result');
  if (!form || !result) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(form);
    var comparison = calculateTaxComparison({
      salary: formData.get('salary'),
      otherIncome: formData.get('otherIncome'),
      ageGroup: formData.get('ageGroup'),
      deduction80c: formData.get('deduction80c'),
      deduction80d: formData.get('deduction80d'),
      deductionNps: formData.get('deductionNps'),
      homeLoanInterest: formData.get('homeLoanInterest')
    });

    result.innerHTML = `
      <h2>Your Comparison</h2>
      <div class="tool-summary-grid">
        <div class="tool-summary-card">
          <span>Better Fit</span>
          <strong>${comparison.betterRegime}</strong>
          <small>${comparison.label}</small>
        </div>
        <div class="tool-summary-card">
          <span>Tax Saved</span>
          <strong>${formatCurrency(comparison.difference)}</strong>
          <small>Difference between regimes</small>
        </div>
        <div class="tool-summary-card">
          <span>Gross Income</span>
          <strong>${formatCurrency(comparison.grossIncome)}</strong>
          <small>Salary + other income</small>
        </div>
      </div>

      <div class="tool-compare-grid">
        <article class="tool-compare-card">
          <div class="tool-compare-head">
            <h3>Old Regime</h3>
            <span>${formatCurrency(comparison.oldRegime.tax)}</span>
          </div>
          <p><strong>Taxable income:</strong> ${formatCurrency(comparison.oldRegime.taxableIncome)}</p>
          <p><strong>Deductions considered:</strong> ${formatCurrency(comparison.oldRegime.deductions)}</p>
        </article>
        <article class="tool-compare-card">
          <div class="tool-compare-head">
            <h3>New Regime</h3>
            <span>${formatCurrency(comparison.newRegime.tax)}</span>
          </div>
          <p><strong>Taxable income:</strong> ${formatCurrency(comparison.newRegime.taxableIncome)}</p>
          <p><strong>Deductions considered:</strong> ${formatCurrency(comparison.newRegime.deductions)}</p>
        </article>
      </div>

      <div class="tool-plan-note">
        <p><strong>Version:</strong> ${comparison.label} simplified salaried comparison.</p>
        <p><strong>Important:</strong> Surcharge, capital gains, HRA calculation, and employer-specific cases are not included here.</p>
      </div>
    `;
  });
})();

// ===== Read Next Quiz =====
(function initReadNextQuiz() {
  var form = document.getElementById('read-next-quiz-form');
  var result = document.getElementById('read-next-quiz-result');
  if (!form || !result) return;

  function scoreBook(book, answers) {
    var signals = READ_NEXT_PROFILES[book.id] || [];
    var score = 0;
    [answers.goal, answers.tone, answers.depth].forEach(function(answer) {
      if (signals.indexOf(answer) !== -1) score += 3;
    });
    score += (book.rating || 0) * 0.5;
    if (answers.goal === 'wealth' && book.category.indexOf('investing') !== -1) score += 2;
    if (answers.goal === 'story' && book.category.indexOf('fiction') !== -1) score += 2;
    if (answers.goal === 'meaning' && book.category.indexOf('spirituality') !== -1) score += 2;
    return score;
  }

  function renderBookMatch(book, isTopPick) {
    return `
      <article class="tool-book-card${isTopPick ? ' is-top-pick' : ''}">
        <img src="${book.cover}" alt="${escapeHtml(book.title)} cover" loading="lazy" />
        <div class="tool-book-card-body">
          <p class="tool-book-label">${isTopPick ? 'Top pick' : 'Backup pick'}</p>
          <h3>${escapeHtml(book.title)}</h3>
          <p class="tool-book-author">${escapeHtml(book.author)}</p>
          <p>${escapeHtml(book.oneLineHook)}</p>
          <div class="book-badges">
            ${(book.category || []).map(function(category) {
              return '<span class="badge badge-' + category + '">' + formatBlogCategory(category) + '</span>';
            }).join('')}
          </div>
          <div class="tool-action-row">
            <a href="${getBasePath()}books/" class="btn">See Review</a>
            <a href="#" class="buy-btn amazon" data-affiliate="books.${book.affiliateKey}.amazon"></a>
          </div>
        </div>
      </article>
    `;
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(form);
    var answers = {
      goal: formData.get('goal'),
      tone: formData.get('tone'),
      depth: formData.get('depth')
    };

    result.innerHTML = '<h2>Your Recommendation</h2><p class="tool-placeholder">Finding your match...</p>';

    loadBooksData()
      .then(function(books) {
        var ranked = books.slice().sort(function(a, b) {
          return scoreBook(b, answers) - scoreBook(a, answers);
        }).slice(0, 3);

        result.innerHTML = `
          <h2>Your Recommendation</h2>
          <div class="tool-plan-note">
            <p><strong>Best match:</strong> ${escapeHtml(ranked[0].title)}</p>
            <p><strong>Why:</strong> based on what you want right now, the tone you prefer, and how much depth you want from the read.</p>
          </div>
          <div class="tool-book-grid">
            ${ranked.map(function(book, index) {
              return renderBookMatch(book, index === 0);
            }).join('')}
          </div>
        `;

        setDefaultBuyButtonLabels(result);
        loadAffiliateLinks(result);
      })
      .catch(function() {
        result.innerHTML = '<h2>Your Recommendation</h2><p class="tool-placeholder">The books database could not be loaded right now.</p>';
      });
  });
})();

// ===== Skincare & Style =====
(function initSkincareAndStyle() {
  var morningContainer = document.getElementById('skincare-routine-morning');
  var nightContainer = document.getElementById('skincare-routine-night');
  var skincareGroupsContainer = document.getElementById('skincare-product-groups');
  var styleCapsuleGrid = document.getElementById('style-capsule-grid');
  var skinTypeForm = document.getElementById('skin-type-form');
  var skinTypeResult = document.getElementById('skin-type-result');

  if (!morningContainer && !nightContainer && !skincareGroupsContainer && !styleCapsuleGrid && !skinTypeForm) {
    return;
  }

  function titleCaseText(value) {
    return String(value).split('-').map(function(part) {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join(' ');
  }

  function formatPrice(price) {
    return '₹' + Number(price).toLocaleString('en-IN');
  }

  function buildProductMap(products) {
    return (products || []).reduce(function(map, item) {
      map[item.id] = item;
      return map;
    }, {});
  }

  function getRetailerLinks(key, section) {
    if (!key) return '';
    return `
      <div class="buy-links">
        <span class="buy-label">Check price:</span>
        <a href="#" class="buy-btn amazon" data-affiliate="${section}.${key}.amazon"></a>
        <a href="#" class="buy-btn flipkart" data-affiliate="${section}.${key}.flipkart"></a>
      </div>
    `;
  }

  function renderRoutineCard(product) {
    return `
      <article class="beauty-product-card beauty-product-card--compact">
        <div class="beauty-product-top">
          <div>
            <p class="beauty-product-category">${titleCaseText(product.category)}</p>
            <h4>${product.name}</h4>
          </div>
          <span class="beauty-tier-tag ${product.tier}">${titleCaseText(product.tier)}</span>
        </div>
        <p>${product.bestFor}</p>
        <p class="beauty-price">${formatPrice(product.priceApprox)}</p>
        ${getRetailerLinks(product.affiliateKey, 'skincare')}
      </article>
    `;
  }

  function renderSkincareProductCard(product) {
    return `
      <article class="beauty-product-card">
        <div class="beauty-product-top">
          <div>
            <p class="beauty-product-category">${titleCaseText(product.category)}</p>
            <h4>${product.name}</h4>
          </div>
          <span class="beauty-tier-tag ${product.tier}">${titleCaseText(product.tier)}</span>
        </div>
        <p>${product.bestFor}</p>
        <p class="beauty-skin-types"><strong>Best for:</strong> ${product.skinTypes.map(function(type) { return titleCaseText(type); }).join(', ')}</p>
        <p class="beauty-price">${formatPrice(product.priceApprox)}</p>
        ${getRetailerLinks(product.affiliateKey, 'skincare')}
      </article>
    `;
  }

  function renderStyleCard(item) {
    return `
      <article class="beauty-product-card">
        <div class="beauty-product-top">
          <div>
            <p class="beauty-product-category">${titleCaseText(item.category)}</p>
            <h4>${item.name}</h4>
          </div>
        </div>
        <p>${item.whyItMatters}</p>
        <p class="beauty-price">${formatPrice(item.priceApprox)}</p>
        ${getRetailerLinks(item.affiliateKey, 'style')}
      </article>
    `;
  }

  function renderSkinTypeResult(type) {
    var config = {
      oily: {
        title: 'Likely oily skin',
        advice: 'Go lighter with moisturizer, choose sunscreen carefully, and do not attack your face with harsh cleansers every few hours.',
        picks: ['Face wash for oil control', 'Light moisturizer', 'Matte-feel sunscreen']
      },
      dry: {
        title: 'Likely dry skin',
        advice: 'Barrier support matters. Use gentler cleansers, richer moisturizers, and stop mistaking tightness for cleanliness.',
        picks: ['Gentle cleanser', 'Hydrating moisturizer', 'Non-drying sunscreen']
      },
      combination: {
        title: 'Likely combination skin',
        advice: 'Keep the routine balanced. Your T-zone may need lighter textures while the rest of your face still wants hydration.',
        picks: ['Balanced cleanser', 'Medium-light moisturizer', 'Flexible sunscreen']
      },
      normal: {
        title: 'Likely normal skin',
        advice: 'You still need basics. Keep things simple, protect with sunscreen, and do not ruin a stable situation by chasing every trend.',
        picks: ['Simple cleanser', 'Light moisturizer', 'Daily sunscreen']
      }
    };

    var result = config[type] || config.normal;
    skinTypeResult.innerHTML = `
      <div class="skin-type-card">
        <h3>${result.title}</h3>
        <p>${result.advice}</p>
        <p><strong>Start with:</strong> ${result.picks.join(' • ')}</p>
      </div>
    `;
  }

  loadProductsData()
    .then(function(payload) {
      var skincare = payload.skincare || {};
      var style = payload.style || {};
      var skincareProducts = skincare.products || [];
      var skincareMap = buildProductMap(skincareProducts);
      var groupedSkincare = {};

      skincareProducts.forEach(function(product) {
        if (!groupedSkincare[product.category]) groupedSkincare[product.category] = [];
        groupedSkincare[product.category].push(product);
      });

      Object.keys(groupedSkincare).forEach(function(category) {
        groupedSkincare[category].sort(function(a, b) {
          var order = { budget: 1, mid: 2, premium: 3 };
          return (order[a.tier] || 10) - (order[b.tier] || 10);
        });
      });

      if (morningContainer) {
        morningContainer.innerHTML = (skincare.routine && skincare.routine.morning || []).map(function(id) {
          return skincareMap[id];
        }).filter(Boolean).map(renderRoutineCard).join('');
        setDefaultBuyButtonLabels(morningContainer);
        loadAffiliateLinks(morningContainer);
      }

      if (nightContainer) {
        nightContainer.innerHTML = (skincare.routine && skincare.routine.night || []).map(function(id) {
          return skincareMap[id];
        }).filter(Boolean).map(renderRoutineCard).join('');
        setDefaultBuyButtonLabels(nightContainer);
        loadAffiliateLinks(nightContainer);
      }

      if (skincareGroupsContainer) {
        skincareGroupsContainer.innerHTML = Object.keys(groupedSkincare).map(function(category) {
          return `
            <section class="beauty-category-group">
              <div class="beauty-category-head">
                <h3>${titleCaseText(category)}</h3>
                <p>${titleCaseText(category)} recommendations across budget, mid, and premium ranges.</p>
              </div>
              <div class="beauty-product-grid">
                ${groupedSkincare[category].map(renderSkincareProductCard).join('')}
              </div>
            </section>
          `;
        }).join('');
        setDefaultBuyButtonLabels(skincareGroupsContainer);
        loadAffiliateLinks(skincareGroupsContainer);
      }

      if (styleCapsuleGrid) {
        styleCapsuleGrid.innerHTML = (style.capsule || []).map(renderStyleCard).join('');
        setDefaultBuyButtonLabels(styleCapsuleGrid);
        loadAffiliateLinks(styleCapsuleGrid);
      }
    })
    .catch(function() {
      if (skincareGroupsContainer) {
        skincareGroupsContainer.innerHTML = '<p class="movies-empty">Product recommendations could not be loaded right now.</p>';
      }
      if (styleCapsuleGrid) {
        styleCapsuleGrid.innerHTML = '<p class="movies-empty">Capsule wardrobe items could not be loaded right now.</p>';
      }
    });

  if (skinTypeForm && skinTypeResult) {
    skinTypeForm.addEventListener('submit', function(event) {
      event.preventDefault();
      var formData = new FormData(skinTypeForm);
      var answers = [formData.get('oiliness'), formData.get('afterWash'), formData.get('mainConcern')];
      var scores = { oily: 0, dry: 0, combination: 0, normal: 0 };

      answers.forEach(function(answer) {
        if (scores.hasOwnProperty(answer)) {
          scores[answer] += 1;
        }
      });

      var topType = Object.keys(scores).sort(function(a, b) {
        return scores[b] - scores[a];
      })[0];

      renderSkinTypeResult(topType);
    });
  }
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
