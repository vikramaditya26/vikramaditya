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

function isFoodAllowedForDiet(food, dietType) {
  return Array.isArray(food.diet) && food.diet.indexOf(dietType) !== -1;
}

function roundNumber(value) {
  return Math.round(value);
}

function formatCurrency(value) {
  return '₹' + Math.round(value);
}

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
