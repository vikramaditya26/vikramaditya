# AGENT.md — The Godfather Document for vikramaditya.me

> **Read this ENTIRE file before touching any code.** This is the single source of truth for the website's vision, architecture, content strategy, and development roadmap. Every decision here was made from first principles.

---

## Table of Contents
1. [The Vision](#the-vision)
2. [Who is Vikram Aditya](#who-is-vikram-aditya)
3. [The Flywheel: How Everything Connects](#the-flywheel)
4. [Architecture & File Structure](#architecture)
5. [Design System](#design-system)
6. [Data Architecture](#data-architecture)
7. [Content Inventory (Current State)](#content-inventory)
8. [Section Deep-Dives](#section-deep-dives)
9. [Monetization Strategy](#monetization-strategy)
10. [Growth Roadmap (Phased)](#growth-roadmap)
11. [Agent Rules & Standards](#agent-rules)
12. [Quick References](#quick-references)
13. [Changelog](#changelog)

---

## 1. The Vision <a name="the-vision"></a>

**"The Simple Guy"** is not just a website. It's a personal brand ecosystem.

**Core idea:** Vikram teaches basics of everything — books, finance, fitness, skincare, style, cooking, life skills — in a simple, honest way. The website is the HUB that his entire content creation (Instagram reels, YouTube videos, future newsletter) points to. When Vikram reviews a book on Instagram, he says "read the full review on my website." When he shares a gym supplement in a day-in-my-life vlog, he links to the website. Every piece of social content funnels here.

**Why this matters architecturally:** The website must:
- Load fast (people clicking from Instagram stories have zero patience)
- Be easy to navigate (a visitor from a reel about books should land on books, not search for it)
- Have natural affiliate links embedded in genuinely useful content (books → Amazon/Flipkart, supplements → Amazon, skincare → Nykaa/Amazon, style → Myntra/Amazon)
- Scale to 200+ pages without becoming a mess for agents or humans
- Work perfectly on mobile (90%+ of Indian social media traffic is mobile)

**The long-term arc:**
```
Phase 1: Content Hub        → Affiliate revenue (books, products, tools)
Phase 2: Interactive Tools   → Higher engagement, return visits (calculators, planners, trackers)
Phase 3: Digital Products    → Direct revenue (Notion templates, spreadsheets, PDFs, cheat sheets)
Phase 4: Newsletter/Community → Recurring audience, sponsored content, consulting
Phase 5: Courses/Paid Content → Premium revenue (video courses, paid guides)
```

**Target audience:** Young Indians, age 20-30 — college students, freshers, early-career professionals. They're on Instagram, they want to improve themselves, they search for "best books to read in 2026" or "beginner gym routine India" or "how to dress better men India."

---

## 2. Who is Vikram Aditya <a name="who-is-vikram-aditya"></a>

| Field | Detail |
|-------|--------|
| **Full name** | Vikram Aditya (Aditya Kumar) |
| **Chinese name** | 王阳明 (Wang Yangming) |
| **Education** | IIT Bombay, Class of 2024 |
| **Current role** | Founder's Office at Teachmint, Bengaluru |
| **Instagram (brand)** | @the.simple.guyyy |
| **Instagram (personal)** | @itz_vkaditya |
| **LinkedIn** | /in/adityakumar2608/ |
| **Email** | vikram.aditya.connect@gmail.com |
| **Location** | Bengaluru, India |

**Philosophy:** Guided by Buddha's "What we think, we become." Five core values: Ethics, Be Present, Self-Respect, Proactive Contribution, Courage/Discipline/Consistency. Deep reader — philosophy (Osho, Lao Tzu, Musashi), business (Naval, Munger, Dalio), self-help (James Clear). Fitness enthusiast — PPL split. Interested in startups, finance, personal development.

**Voice & Tone:**
- Writes like he's talking to a friend — personal, warm, reflective
- Uses philosophical quotes naturally (not as decoration)
- Honest about what he knows and doesn't know
- Indian context always (₹, Indian brands, Indian food, Indian culture)
- **NEVER** salesy, pushy, or corporate. Affiliate links must feel like "I loved this, you might too" — not "BUY NOW"
- Uses English primarily, with occasional Hindi words/phrases when natural

**Content creation workflow:** Vikram creates content on Instagram/YouTube → links to website for detailed reviews/guides → website has affiliate links for monetization. The website is the monetization engine behind his social media presence.

---

## 3. The Flywheel: How Everything Connects <a name="the-flywheel"></a>

This is the most important section. Every feature, every page, every section connects to this flywheel:

```
Social Media Content (Instagram/YouTube)
    ↓ drives traffic to
Website (vikramaditya.me)
    ↓ provides value through
Content + Tools (reviews, guides, calculators, planners)
    ↓ naturally recommends
Products via Affiliate Links (books, supplements, skincare, style)
    ↓ generates
Revenue (affiliate commissions)
    ↓ funds
Better Content + Equipment + Digital Products
    ↓ attracts
More Followers → More Traffic → More Revenue (cycle repeats)
```

**Cross-linking is critical.** Every section should link to related sections:
- Books page → "Also check my finance guide for investing books" → links to finance
- Workout page → "Check my diet plan tool" → links to kitchen/diet section
- 100 Skills page (Day 15: Cooking) → links to Bachelor's Kitchen
- Skincare page → "See my recommended daily routine" → links to style page
- Blog post about discipline → links to workout, 100 skills, books
- Every section with product recommendations → links to the specific product with affiliate tag

**The content funnel per section:**
```
Free valuable content (the hook)
    ↓
Tool/calculator/quiz (engagement + return visits)
    ↓
Product recommendation with affiliate link (monetization)
    ↓
Email capture / Substack link (long-term relationship)
```

---

## 4. Architecture & File Structure <a name="architecture"></a>

### Why restructure now?
The current flat structure (`books.html`, `finance.html` in root) will NOT work when the site has:
- 100 skill pages (100 Days challenge)
- 50+ movie reviews
- 30+ blog posts as individual pages
- Multiple tool/calculator pages
- Product recommendation pages

**Now is the only time to restructure** — the site has <1000 views and few inbound links. Every month we wait, the cost of changing URLs increases.

### Target File Structure

```
/
├── index.html                    # Homepage — hero, about, explore cards, featured content
├── CNAME                         # vikramaditya.me (NEVER modify)
├── AGENT.md                      # This file
├── README.md                     # GitHub repo description
├── .nojekyll                     # Prevents GitHub's Jekyll processing
├── 404.html                      # Custom 404 page (GitHub Pages auto-serves this)
├── sitemap.xml                   # SEO sitemap
├── robots.txt                    # Search engine directives
│
├── assets/                       # ALL static assets live here
│   ├── css/
│   │   └── style.css             # Single global stylesheet
│   ├── js/
│   │   └── script.js             # Single global JS file
│   ├── data/                     # JSON data files (the brain of the site)
│   │   ├── books.json            # All book data (title, author, review, affiliate links, category, rating)
│   │   ├── movies.json           # All movie/series data
│   │   ├── skills.json           # 100 skills metadata
│   │   ├── foods.json            # Indian food database for diet planner (calories, macros, veg/non-veg)
│   │   ├── exercises.json        # Exercise database for workout generator
│   │   ├── products.json         # All product recommendations across sections
│   │   └── affiliate-links.json  # Centralized affiliate link registry (single source of truth)
│   ├── images/                   # ALL images, organized by section
│   │   ├── common/               # Favicons, logo, OG images, hero backgrounds
│   │   │   ├── favicon-16x16.png
│   │   │   ├── favicon-32x32.png
│   │   │   ├── favicon.ico
│   │   │   ├── apple-touch-icon.png
│   │   │   ├── android-chrome-192x192.png
│   │   │   ├── android-chrome-512x512.png
│   │   │   └── og-default.jpg    # Default Open Graph image
│   │   ├── books/                # Book cover images (self-hosted for reliability)
│   │   ├── movies/               # Movie/series posters
│   │   ├── workout/              # Exercise GIFs and images
│   │   ├── skills/               # 100 skills photos (Vikram's own + stock)
│   │   ├── skincare/             # Product images
│   │   ├── style/                # Outfit/wardrobe images
│   │   ├── kitchen/              # Food/recipe images
│   │   └── blog/                 # Blog post feature images
│   └── downloads/                # Downloadable files
│       ├── notion-templates/     # Free + paid Notion templates
│       └── cheatsheets/          # PDF cheat sheets (lead magnets)
│
├── books/
│   └── index.html                # Book reviews listing page (reads from books.json)
│
├── finance/
│   └── index.html                # Personal finance guide
│
├── workout/
│   └── index.html                # Workout guide (PPL + diet basics)
│
├── blog/
│   ├── index.html                # Blog listing page
│   ├── art-of-start/
│   │   └── index.html            # Individual blog post (better SEO)
│   ├── clear-thinking/
│   │   └── index.html
│   └── ... (each post gets its own folder)
│
├── movies/
│   └── index.html                # Movies & Series reviews (NEW)
│
├── 100-skills/
│   ├── index.html                # Challenge overview + progress grid
│   ├── day-001-origami/
│   │   └── index.html            # Individual skill page
│   ├── day-002-rubiks-cube/
│   │   └── index.html
│   └── ... (100 skill sub-pages)
│
├── skincare/
│   └── index.html                # Skincare & grooming guide (NEW)
│
├── style/
│   └── index.html                # Wardrobe & style guide (NEW)
│
├── kitchen/
│   └── index.html                # Bachelor's Kitchen — recipes + diet plans (NEW)
│
├── tools/                        # Interactive tools & calculators
│   ├── diet-planner/
│   │   └── index.html            # Diet plan generator (inputs → custom plan)
│   ├── sip-calculator/
│   │   └── index.html            # SIP return calculator
│   ├── bmi-calculator/
│   │   └── index.html            # BMI + TDEE calculator
│   ├── budget-planner/
│   │   └── index.html            # 50/30/20 budget planner
│   └── macro-calculator/
│       └── index.html            # Macro split calculator
│
├── shop/
│   └── index.html                # Digital products store (Notion templates, spreadsheets, PDFs)
│
└── contact/
    └── index.html                # Contact form + social links
```

### Why this structure?

1. **Clean URLs:** `vikramaditya.me/books/` instead of `vikramaditya.me/books.html` — more professional, better for sharing on social
2. **Folder = section isolation:** An agent working on skincare doesn't need to touch workout files
3. **Images organized by section:** Agents can find relevant images instantly. No more hunting through a flat `images/` folder
4. **JSON data files:** Book data, movie data, product links stored in structured JSON. Agents read the JSON to understand content inventory — no need to parse HTML. Add a new book = add an entry to `books.json` + the page re-renders
5. **Centralized affiliate links:** `affiliate-links.json` is the SINGLE place to update any affiliate link. When Vikram gets his Amazon Associates tag, update ONE file, all pages reflect it
6. **Scalable sub-pages:** 100-skills has 100 sub-folders. Blog posts get individual pages. Each is SEO-indexable
7. **Tools in their own folder:** Calculators/planners are separate pages — they can be linked individually from social media, they rank in search independently
8. **Shop ready:** Digital products section is ready when Vikram starts selling Notion templates

### Shared Components Strategy

The header and footer appear on EVERY page. Currently they're copy-pasted. When we add a new nav item, we'd have to edit 15+ files. Solution:

**`assets/js/script.js` includes a component loader:**
- Store header HTML and footer HTML as JS template literals
- A function injects them into placeholder `<div>` elements on each page
- Adding a new nav item = editing ONE place in script.js
- All pages must include `<div id="site-header"></div>` and `<div id="site-footer"></div>` placeholders

**Why not iframes or server-side includes?** GitHub Pages doesn't support SSI. Iframes are terrible for SEO. JS injection is the pragmatic choice for vanilla HTML sites. The header/footer render instantly (same-origin, no fetch delay).

---

## 5. Design System <a name="design-system"></a>

### CSS Architecture (assets/css/style.css)

**Layered structure (top to bottom of file):**
```
1. @import Google Fonts
2. CSS Custom Properties (:root + [data-theme="dark"])
3. CSS Reset / Base styles
4. Layout primitives (.container, .grid-2, .grid-3)
5. Shared components (header, footer, nav, cards, buttons, forms, tip-box)
6. Page-specific styles (grouped by section with comment headers)
7. Utility classes (.fade-in, .sr-only, .text-center)
8. Media queries / responsive overrides
```

**CSS Custom Properties (tokens):**
```css
/* Primitive tokens — raw values */
--color-cream: #faf9f7;
--color-charcoal: #0f0f0f;

/* Semantic tokens — mapped by purpose (dark mode only remaps these) */
--color-bg: var(--color-cream);
--color-text: var(--color-charcoal);
--color-text-secondary: ...;
--color-accent: ...;
--color-border: ...;
--color-card-bg: ...;

/* Spacing scale */
--space-xs through --space-3xl

/* Transitions */
--transition-fast, --transition-base, --transition-slow
```

**Fonts:** Playfair Display (headings), Source Sans 3 (body), JetBrains Mono (code)

**Component naming:** Use descriptive class names. Section-specific classes prefixed by section:
- `.book-card`, `.book-grid`, `.book-info`
- `.movie-card`, `.movie-grid`, `.movie-badge`
- `.skill-card`, `.skill-grid`, `.skill-progress`
- `.tool-input`, `.tool-result`, `.tool-chart`

### Every new component MUST:
1. Use CSS variables (never hardcoded colors)
2. Work in both light and dark mode
3. Be responsive (mobile-first, test at 375px width)
4. Have proper contrast ratios (WCAG AA minimum)
5. Support keyboard navigation where interactive
6. Use `loading="lazy"` on images
7. Have smooth transitions (use `--transition-base`)

---

## 6. Data Architecture <a name="data-architecture"></a>

### Why JSON data files?

Without JSON, to know "what books are on the site," an agent must:
1. Open books/index.html
2. Parse through 200+ lines of HTML
3. Extract book titles, authors, etc.

With JSON, the agent reads `assets/data/books.json` and instantly knows everything. Adding a book = adding a JSON entry. The HTML page reads this JSON and renders cards dynamically.

**Critical SEO note:** Google can index JS-rendered content, but for safety, keep essential content (titles, descriptions) in the HTML as well. Use JSON for filtering/sorting/search functionality, not as the only source of visible content.

### affiliate-links.json (Most Important Data File)

```json
{
  "meta": {
    "amazon_associate_tag": "thesimpleguy-21",
    "flipkart_affiliate_id": "PENDING",
    "last_updated": "2026-04-04"
  },
  "books": {
    "siddhartha": {
      "amazon": "https://www.amazon.in/dp/XXXXX?tag=thesimpleguy-21",
      "flipkart": "https://www.flipkart.com/XXXXX?affid=XXXXX"
    },
    "the-alchemist": { ... }
  },
  "supplements": {
    "whey-protein-on": {
      "amazon": "...",
      "flipkart": "..."
    }
  },
  "skincare": { ... },
  "style": { ... },
  "tools": {
    "zerodha": { "referral": "..." },
    "groww": { "referral": "..." }
  }
}
```

**How it works:** A small JS function reads this file on page load and populates `href` attributes on elements with `data-affiliate` attributes. One JSON update = all pages updated. The script also auto-adds `rel="nofollow sponsored"` and `target="_blank"`.

### books.json (Example Structure)

```json
[
  {
    "id": "siddhartha",
    "title": "Siddhartha",
    "author": "Hermann Hesse",
    "cover": "/assets/images/books/siddhartha.jpg",
    "category": ["philosophy", "spirituality"],
    "rating": 5,
    "oneLineHook": "A book that doesn't just speak to you — it changes something within.",
    "review": "Full review HTML or markdown...",
    "keyTakeaways": ["Truth isn't given, it's lived", "Peace comes from within", "..."],
    "affiliateKey": "siddhartha",
    "dateAdded": "2025-07-05"
  }
]
```

### foods.json (For Diet Planner Tool)

```json
[
  {
    "name": "Paneer (100g)",
    "calories": 265,
    "protein": 18.3,
    "carbs": 1.2,
    "fat": 20.8,
    "category": "protein",
    "diet": ["vegetarian"],
    "region": ["north-india"],
    "costApprox": 40
  }
]
```

Build with 200-300 common Indian foods. Use Mifflin-St Jeor equation for BMR, multiply by activity factor for TDEE. JS algorithm selects foods to hit macro targets.

---

## 7. Content Inventory (Current State) <a name="content-inventory"></a>

### Books — 15 books reviewed
Siddhartha, The Alchemist, Book of Five Rings, Jonathan Livingston Seagull, Animal Farm, Clear Thinking, The Great CEO Within, Zorba the Buddha, Tao Te Ching, Principles, Almanack of Naval Ravikant, Poor Charlie's Almanack, Hsin Hsin Ming, The Prophet, Atomic Habits

**Categories breakdown:** Philosophy/Spirituality (6), Business/Leadership (3), Self-Help (3), Fiction (2), Investing (1)

**Missing:** No affiliate links, no buy buttons, no categories/filters, no ratings, no key takeaways. Book cover images are hotlinked from Amazon/external CDNs (fragile — they can break anytime).

### Finance — 8 modules
Understanding Money, Budgeting (50/30/20), Debt & Credit, Compounding, Investment Options India, Stock Market Basics, Tax Saving & Insurance, Building Financial Wisdom

**Missing:** No calculators, no tool recommendations, no interactive elements beyond accordions.

### Workout — 3 PPL days + diet basics
Push (7 exercises, YouTube embeds), Pull (7 exercises), Legs (5 exercises), Nutrition section

**Missing:** No supplement links, no routine generator, no diet planner, no progress tracking.

### Blog — 10 articles
Topics: Sam Altman on success, Pavel Durov interview, Naval's formulas, mental models (math + science), social media critique, political commentary, first principles, clear thinking

**Missing:** No dates, no categories, no individual post URLs, no sharing buttons, no comments.

### Contact — functional
Formspree form, LinkedIn + Instagram + Email links. Working fine.

---

## 8. Section Deep-Dives <a name="section-deep-dives"></a>

### 8.1 — 100 Days, 100 Skills (FLAGSHIP section)

**Why this section is the most important:**
This is Vikram's UNIQUE differentiator. Nobody else has a personal website documenting 100 different skills they tried. This creates:
- **100 pieces of content** (each skill = Instagram reel + website page + product links)
- **Massive affiliate potential** (every skill needs supplies: origami paper, Rubik's cube, harmonica, calligraphy pens, crochet hooks, bonsai kit, sushi mat...)
- **Viral shareability** ("This guy tried 100 skills in 100 days — check out Day 47: Learn Magic Tricks")
- **Return visits** (people come back daily to see the new skill)
- **SEO long-tail goldmine** ("how to solve rubik's cube beginner India", "calligraphy set for beginners Amazon India")

**Structure per skill page (`/100-skills/day-XXX-skill-name/index.html`):**
```
Hero: Day number + skill name + difficulty badge (Easy/Medium/Hard)
Section 1: "Why I Tried This" — personal story (2-3 paragraphs)
Section 2: "What You Need" — supplies list with affiliate buy links
Section 3: "How to Start" — step-by-step beginner guide (or curated resources/YouTube links)
Section 4: "My Attempt" — photos/videos of Vikram trying it (authentic, imperfect = relatable)
Section 5: "Difficulty Rating" — honest 1-5 stars + time invested
Section 6: "Would I Do It Again?" — honest verdict
Footer CTA: "Try this skill? Share your attempt @the.simple.guyyy"
```

**Overview page (`/100-skills/index.html`):**
- Visual grid of all 100 skills as cards (like a calendar/bingo board)
- Color-coded by difficulty: green (easy), yellow (medium), red (hard)
- Completed skills highlighted, upcoming skills grayed out
- Click → individual skill page
- Progress bar: "Day 34 of 100"
- Filter by category: Physical, Creative, Mental, Cooking, Music, etc.

**Skill categories (confirmed by Vikram):**
Creative: Calligraphy, Crochet, Origami, Bonsai, Pottery, Sketching, Photography basics
Physical: Calisthenics, Moonwalk, Backflip, Juggling, Jump rope tricks, Handstand
Music: Harmonica, Ukulele basics, Beatboxing, Drumming
Cooking: Sushi, Bread baking, Latte art, Fermentation
Mental: Rubik's cube, Memory palace, Speed reading, Chess openings, Card tricks, Magic
Life: Tie a tie, Iron a shirt, Basic car maintenance, Sewing a button

### 8.2 — Movies & Series

**Why:** Vikram already recommends things to friends. Formalizing this creates affiliate revenue (Amazon Prime rent/buy) and drives engagement. Movies/series reviews are extremely searchable.

**Card structure:**
```
Poster image | Title, Year, Genre badges
Platform badges (Netflix, Prime, Hotstar, etc.)
Vikram's rating (1-5 stars)
"Why I Recommend This" — 2-3 paragraph personal review
Mood/vibe tags: "Watch when you need motivation", "Perfect rainy day movie"
Affiliate link: "Rent/Buy on Amazon Prime"
```

**Features:** Genre filter, platform filter, rating sort, "Vikram's Top 10" featured section, "If you liked X, try Y" recommendations.

### 8.3 — Skincare & Grooming

**Why:** Indian men's grooming market is booming. Young Indian men are actively searching for skincare basics. Very high affiliate potential (products are repurchased monthly = recurring commissions via Nykaa, Amazon, Flipkart).

**Sections:**
1. "My Current Routine" — morning + night routine with exact products (affiliate links)
2. CTM Basics — Cleanse, Tone, Moisturize explained simply
3. Skin Type Guide — quiz/guide to identify your type (oily, dry, combination)
4. Product Recommendations — by category (face wash, moisturizer, sunscreen, serum) with budget/mid/premium options
5. Seasonal Tips — summer vs winter skincare in Indian climate
6. Grooming Basics — beard care, haircare, fragrance guide
7. Common Mistakes — what most Indian guys get wrong

### 8.4 — Wardrobe & Style

**Why:** "How to dress better" is one of the most searched self-improvement topics by young Indian men. High affiliate potential via Amazon Fashion, Myntra, Ajio.

**Sections:**
1. Capsule Wardrobe — the 20 essential items every guy needs (with buy links)
2. Outfit Formulas — "plug and play" outfit combinations by occasion (office, casual, date, gym, wedding)
3. Color Guide — what colors go with what, color wheel basics
4. Fit Guide — how clothes should actually fit (visual guide)
5. Budget Style — looking good under ₹5000 total wardrobe cost
6. Seasonal Guide — what to wear in Indian summer, monsoon, winter
7. "What I Wore This Week" — personal style diary (connects to Instagram content)

### 8.5 — Bachelor's Kitchen

**Why:** Every Indian bachelor/student struggles with food. "Easy recipes for hostel students" is massive search volume. This section doubles as the diet plan section.

**Sections:**
1. Equipment Guide — "What do you have?" filter (only kettle / hot plate / full kitchen) with affiliate buy links
2. High-Protein Indian Meals — for gym-goers, organized by meal (breakfast, lunch, dinner, snack)
3. Budget Meals — cost per serving shown, meals under ₹50
4. Meal Prep Guide — cook once, eat all week
5. "What Can I Cook With...?" — ingredient-based recipe finder (interactive JS tool)

**Diet Planner Tool (`/tools/diet-planner/`):**
- User inputs: age, gender, height, weight, activity level, goal (lose/maintain/gain), diet type (veg/non-veg/egg-itarian), budget
- JS calculates: BMR (Mifflin-St Jeor), TDEE, target calories, macro split
- Outputs: personalized meal plan from `foods.json` database
- "Print My Plan" button + "Share on WhatsApp" button
- Supplement recommendations at bottom (affiliate links)

### 8.6 — Finance (Enhanced)

**New features to add:**
- SIP Calculator — "If you invest ₹X/month at Y% for Z years" → visual chart
- EMI Calculator — loan amount, rate, tenure → monthly EMI + total interest
- "Can I Afford This?" calculator — input salary, expenses → shows if purchase is wise
- Tax Calculator — New vs Old Regime comparison (huge seasonal traffic Jan-Mar every year)
- Investment checklist — interactive, checkable, with progress
- Recommended books + apps sections with affiliate links

### 8.7 — Blog (Enhanced)

**Move to individual post pages** (`/blog/post-slug/index.html`):
- Each post gets its own URL (much better for SEO and sharing)
- Blog listing page shows card previews with title, date, reading time, category
- Add category tags: Wisdom, Startups, Science, Psychology, Life
- Add dates to all posts
- Add estimated reading time
- Add social sharing buttons (WhatsApp, Twitter/X, LinkedIn, Copy Link)
- Add Substack newsletter CTA at bottom of every post

---

## 9. Monetization Strategy <a name="monetization-strategy"></a>

### Revenue Streams (in order of implementation)

**Stream 1: Affiliate Marketing (Start immediately)**
| Platform | Sections | Commission |
|----------|----------|------------|
| Amazon Associates India | Books, Supplements, Skincare, Style, Kitchen, Skills supplies | 1-10% depending on category |
| Flipkart Affiliate | Books, Electronics, Fashion | 1-12% |
| Nykaa Affiliate | Skincare, Grooming | 5-15% |
| Myntra/Ajio Affiliate | Style, Wardrobe | 5-10% |
| Cuelinks | Aggregator for 500+ Indian brands | Varies |
| Groww Referral | Finance section | ₹100-500/referral |

**How affiliate links should appear:**
```html
<div class="buy-links">
  <p class="buy-label">Get this book:</p>
  <a href="..." class="buy-btn amazon" data-affiliate="books.siddhartha.amazon">Amazon</a>
  <a href="..." class="buy-btn flipkart" data-affiliate="books.siddhartha.flipkart">Flipkart</a>
</div>
```
Style: Small, clean buttons below content. NEVER pop-ups, NEVER interrupting reading flow. Always with disclosure.

**Stream 2: Digital Products (Month 2-3)**
- Notion templates: Student Life OS, Job Hunt Tracker, Monthly Budget Planner, Book Notes Template, Workout Tracker, Meal Planner
- Google Sheets: Tax Calculator, Investment Tracker, Expense Tracker
- PDF Cheat Sheets: Finance basics, Gym exercise guide, Interview prep checklist
- Pricing: ₹49-499 range
- Sell via Gumroad or Razorpay payment links
- Showcase on `/shop/index.html`

**Stream 3: Newsletter (Month 3+)**
- Platform: Substack (already has account)
- Cross-post blog content + exclusive weekly insights
- CTA on every page: "Get weekly life lessons — join X readers"
- Eventually: sponsored sections once at 1000+ subscribers

**Stream 4: Future (Month 6+)**
- Consulting: Resume reviews (₹199), Career chats (₹299) via Calendly
- Courses: Eventually on Graphy/Teachable
- Sponsored content: Indian D2C brands (Boat, Wakefit, Noise)

### Affiliate Disclosure (Required on Every Page with Affiliate Links)
```html
<aside class="affiliate-disclosure">
  <p><strong>Disclosure:</strong> Some links on this page are affiliate links.
  If you purchase through them, I may earn a small commission at no extra cost to you.
  I only recommend products I personally use or genuinely believe in.</p>
</aside>
```

---

## 10. Growth Roadmap (Phased) <a name="growth-roadmap"></a>

### PHASE 0: Foundation Restructure (Days 1-2) ✅ COMPLETED
**Goal:** Reorganize files for scale. This blocks everything else.

| # | Task | Why it matters | Est. time |
|---|------|---------------|-----------|
| 0.1 | Create new folder structure (assets/, books/, finance/, etc.) | Scalability — flat files become unmanageable at 20+ pages | 1 hr |
| 0.2 | Move style.css → assets/css/style.css | All assets in one place, clean separation | 15 min |
| 0.3 | Move script.js → assets/js/script.js | Same as above | 15 min |
| 0.4 | Move all images to assets/images/ organized by section | Agents find images instantly, no hunting | 30 min |
| 0.5 | Convert flat HTML files to folder-based (books.html → books/index.html) | Clean URLs (vikramaditya.me/books/ instead of /books.html) | 1 hr |
| 0.6 | Update all internal links across all pages | Nothing breaks after restructure | 1 hr |
| 0.7 | Create shared header/footer injection in script.js | Add new nav item = edit ONE file, not 15+ | 2 hr |
| 0.8 | Add .nojekyll file | Prevents GitHub Pages from processing files as Jekyll | 1 min |
| 0.9 | Add 404.html custom error page | Better UX when URLs are wrong | 30 min |
| 0.10 | Create assets/data/ folder + initial affiliate-links.json (placeholder tags) | Ready for when Vikram gets affiliate accounts | 30 min |
| 0.11 | Add robots.txt and basic sitemap.xml | SEO foundation | 15 min |
| 0.12 | Test entire site — every page, both themes, mobile | Nothing breaks on live site | 1 hr |

**Commit after Phase 0 and verify on live site before moving on.**

### PHASE 1: Monetization Foundation (Days 2-3) ✅ COMPLETED
**Goal:** Affiliate link infrastructure + first buyable links on books.

| # | Task | Why it matters |
|---|------|---------------|
| 1.1 | Create affiliate-links.json with placeholder structure for all sections | Central link management — update once, reflected everywhere |
| 1.2 | Build affiliate link loader in script.js (reads JSON, populates data-affiliate elements) | Automation — never manually paste affiliate URLs in HTML |
| 1.3 | Design buy-button component (.buy-btn) in style.css — clean, non-intrusive | Consistent look across all sections |
| 1.4 | Add buy buttons to ALL 15 books (Amazon + Flipkart placeholders) | Books are the easiest first affiliate section — Vikram already recommends them on Instagram |
| 1.5 | Add affiliate disclosure component | Legal requirement for affiliate marketing |
| 1.6 | Self-host book cover images in assets/images/books/ | Current hotlinked images from Amazon CDN can break anytime — owning images = reliability |
| 1.7 | Add "Recommended Books" section to finance page | Cross-selling: finance readers buy investing books |
| 1.8 | Add "Supplement & Protein" section to workout page with buy links | Gym audience buys supplements — high-intent affiliate clicks |

**Revenue impact:** Once Vikram gets Amazon Associates tag (this week), update affiliate-links.json ONCE and all 15+ book links go live immediately.

### PHASE 2: Analytics & SEO Basics (Day 3)
**Goal:** Start measuring everything. You can't improve what you don't measure.

| # | Task | Why it matters |
|---|------|---------------|
| 2.1 | Add Microsoft Clarity (free, unlimited) | Heatmaps + session recordings — see exactly how users interact with the site |
| 2.2 | Add Plausible Analytics or GoatCounter (free) | Privacy-friendly traffic analytics — no cookie banner needed |
| 2.3 | Add structured data (JSON-LD) for WebSite, Person, Article schemas | Google rich results — star ratings, author info in search results |
| 2.4 | Add unique OG meta tags to every page | When shared on WhatsApp/Instagram, each page shows its own preview image and description |
| 2.5 | Add canonical URLs to every page | Prevents duplicate content issues in Google |
| 2.6 | Update sitemap.xml with all current pages | Google discovers and indexes all pages |

### PHASE 3: Books Enhancement (Day 3-4)
**Goal:** Make books the best section on the site — the showcase for Vikram's taste.

| # | Task | Why it matters |
|---|------|---------------|
| 3.1 | Create books.json with all 15 books' structured data | Agent-readable content inventory + enables filtering/search |
| 3.2 | Add category badges to book cards (Philosophy, Business, Self-Help, etc.) | Visual scanning — readers find genres they like instantly |
| 3.3 | Add Vikram's rating (1-5 stars) to each card | Social proof — "what does he rate highest?" creates hierarchy |
| 3.4 | Add "Key Takeaways" collapsible per book | Some visitors want the TL;DR — takeaways serve them + improves SEO (more text content) |
| 3.5 | Add category filter bar at top | Users filter to see only Philosophy books, or only Business books |
| 3.6 | Redesign book cards — cover left, info right, buy buttons at bottom | Better visual hierarchy, buy buttons visible without scrolling into the review |
| 3.7 | Add "If you liked this, also read..." suggestions | Cross-recommendation increases page views and affiliate clicks |
| 3.8 | Add "Currently Reading" featured card at top | Creates return visits — "what's he reading now?" |

### PHASE 4: 100 Days, 100 Skills — Scaffold (Day 4-5)
**Goal:** Build the section structure + first 5-10 skill pages.

| # | Task | Why it matters |
|---|------|---------------|
| 4.1 | Create skills.json with all 100 planned skills metadata | Master list — agents know what's planned vs done |
| 4.2 | Build 100-skills/index.html — visual grid of 100 cards (calendar/bingo style) | The "wow factor" page — 100 tiles, colored by difficulty, completed ones highlighted |
| 4.3 | Design skill card component — day number, title, difficulty, category, image thumbnail | Consistent format for all 100 pages |
| 4.4 | Build individual skill page template | Standard template: hero, supplies, how-to, Vikram's attempt, verdict, buy links |
| 4.5 | Create first 5 skill pages (Day 1-5) with placeholder content | Vikram fills in real content as he does each skill |
| 4.6 | Add progress tracker bar on overview page | "Day X of 100 — Y% complete" creates anticipation |
| 4.7 | Add category filter on overview (Physical, Creative, Mental, Cooking, Music) | Users find skills they're interested in |
| 4.8 | Add "supplies list" component with affiliate buy links per skill | Every skill page = affiliate revenue opportunity |
| 4.9 | Add social share CTA: "Try this skill? Tag me @the.simple.guyyy" | Drives Instagram engagement back from website |

### PHASE 5: Movies & Series Section (Week 2)
**Goal:** Launch movies section with 10-15 initial entries.

| # | Task | Why it matters |
|---|------|---------------|
| 5.1 | Create movies.json structure | Structured data for all movie/series entries |
| 5.2 | Build movies/index.html — grid of movie/series cards | Visual, poster-heavy layout catches attention |
| 5.3 | Design movie card — poster, title, year, rating, platform badges, genre tags | All key info visible at a glance |
| 5.4 | Add genre filter + platform filter | "Show me only Netflix documentaries" |
| 5.5 | Add "Vikram's Top 10" featured section at top | Curated picks build trust |
| 5.6 | Add mood/vibe tags ("watch when you need motivation") | Unique angle — recommendation by mood, not just genre |
| 5.7 | Add affiliate links (Amazon Prime rent/buy) | Monetization for movie recommendations |
| 5.8 | Add nav link to all pages | Discoverable from everywhere |

### PHASE 6: Kitchen & Diet Section (Week 2-3)
**Goal:** Launch bachelor's kitchen + diet planner tool.

| # | Task | Why it matters |
|---|------|---------------|
| 6.1 | Create foods.json — 200+ Indian foods with calories, macros, veg/non-veg, region, cost | Database for diet planner tool |
| 6.2 | Build kitchen/index.html — recipe cards organized by meal type | Practical value for bachelor audience |
| 6.3 | Add "equipment filter" — what do you have? (kettle / hot plate / full kitchen) | Hostel students can't cook everything — show only what's possible |
| 6.4 | Build /tools/diet-planner/ — input form → personalized diet plan | HIGHEST engagement tool — users input details, get custom plan |
| 6.5 | Diet planner: calculate BMR/TDEE using Mifflin-St Jeor equation | Science-based, not random advice |
| 6.6 | Diet planner: generate meal plan from foods.json matching macro targets | Practical output user can actually follow |
| 6.7 | Add "Print My Plan" + "Save to Phone" functionality | Users take the plan with them |
| 6.8 | Add supplement recommendations at bottom of diet planner (affiliate) | Natural placement — "to hit your protein target, consider whey protein" |
| 6.9 | Add cost per day estimate to diet plans | Budget-conscious audience wants to know |
| 6.10 | Build /tools/macro-calculator/ | Standalone tool — shareable, SEO-rankable |

### PHASE 7: Skincare & Style Sections (Week 3-4)
**Goal:** Launch both sections with solid initial content.

| # | Task | Why it matters |
|---|------|---------------|
| 7.1 | Build skincare/index.html — routine-based layout | Step-by-step approach works best for skincare beginners |
| 7.2 | "My Current Routine" section with exact products (affiliate links) | Personal recommendation = highest trust = best conversion |
| 7.3 | Product recommendations grid — budget / mid / premium tiers | Serves every budget level |
| 7.4 | Skin type guide (interactive) | Users need to know their type before choosing products |
| 7.5 | Build style/index.html — capsule wardrobe approach | Practical, not fashion-magazine overwhelming |
| 7.6 | Outfit formulas by occasion — visual cards | "Copy this outfit" simplicity |
| 7.7 | Budget style guide — "Look good under ₹5000" | Indian audience is price-conscious |
| 7.8 | Add affiliate links throughout (Amazon, Myntra, Nykaa) | Every product mention = revenue opportunity |
| 7.9 | Add nav links to all pages | Discoverable |

### PHASE 8: Blog Enhancement (Month 2)
**Goal:** Make blog SEO-ready with individual post pages.

| # | Task | Why it matters |
|---|------|---------------|
| 8.1 | Move each blog post to its own page (/blog/post-slug/) | Individual URLs rank in Google, shareable, trackable |
| 8.2 | Blog listing page with card previews | Visual, scannable, shows latest first |
| 8.3 | Add dates, reading time, category tags to all posts | Professionalism + discoverability |
| 8.4 | Add social sharing buttons (WhatsApp, Twitter/X, LinkedIn, Copy Link) | WhatsApp sharing is HUGE in India |
| 8.5 | Add Substack newsletter CTA at bottom of every post | Every reader is a potential subscriber |
| 8.6 | Add "Related Posts" at bottom | Increases pages per session |

### PHASE 9: Interactive Tools Suite (Month 2-3)
**Goal:** Build all calculators and tools.

| # | Task | Why it matters |
|---|------|---------------|
| 9.1 | SIP Calculator (/tools/sip-calculator/) | "SIP calculator" is 50,000+ monthly searches in India |
| 9.2 | EMI Calculator (/tools/emi-calculator/) | Same — massive search volume |
| 9.3 | BMI + TDEE Calculator (/tools/bmi-calculator/) | Entry point for fitness section |
| 9.4 | Budget Planner — 50/30/20 (/tools/budget-planner/) | Interactive version of existing finance content |
| 9.5 | Tax Calculator — Old vs New Regime (/tools/tax-calculator/) | Seasonal SEO goldmine (Jan-Mar traffic spike every year) |
| 9.6 | "What Should I Read Next?" quiz | Fun engagement tool that recommends from Vikram's book list |

**Why tools matter architecturally:** Each tool lives at its own URL. Tools are the most shareable content type ("hey check out this SIP calculator"). They rank independently in Google. They drive return visits. They create natural placement for affiliate links and digital product CTAs.

### PHASE 10: Digital Products Shop (Month 3)
**Goal:** Launch shop with first digital products.

| # | Task | Why it matters |
|---|------|---------------|
| 10.1 | Build shop/index.html — product grid | Showcase for all digital products |
| 10.2 | Design product cards — preview image, title, price, description, buy button | Clean, trust-building design |
| 10.3 | Integrate payment (Gumroad or Razorpay links) | Indian payment methods essential (UPI, cards) |
| 10.4 | Create first 3 Notion templates | Vikram already has templates — just productize |
| 10.5 | Create 2-3 free PDF cheat sheets (lead magnets for email) | Free → trust → paid conversion funnel |
| 10.6 | Add shop CTAs in relevant sections | "Want the full budget template? Get it here" |

### PHASE 11: Community & Engagement (Month 3-4)

| # | Task | Why it matters |
|---|------|---------------|
| 11.1 | Add Substack embed/link on every page | Email list is the most valuable asset — algorithms can't take it away |
| 11.2 | Evaluate and add comment system (Cusdis for non-technical audience or Telegram redirect) | Community engagement — people feel heard |
| 11.3 | Add "Was this helpful?" buttons on guide sections | Feedback loop — know what content works |
| 11.4 | Add "Quote of the Day" rotating banner (JSON array, date-based) | Daily return reason |
| 11.5 | Add social proof counters ("X diet plans generated") | Trust signals — "others use this too" |

### PHASE 12: Future Vision (Month 6+)

| # | Task | Why it matters |
|---|------|---------------|
| 12.1 | Site-wide search | Users find content instantly as library grows |
| 12.2 | Reading list / bookmarks (localStorage) | "Save for later" increases return visits |
| 12.3 | PWA support — offline reading, install prompt | Mobile-first users can "install" the site |
| 12.4 | Gamification — points, streaks, badges for using tools/reading | Engagement loop |
| 12.5 | Cloudflare CDN in front of GitHub Pages | Performance when traffic scales past 10K+ monthly |
| 12.6 | Hindi language toggle for key sections | Reach non-English Indian audience |
| 12.7 | AI chatbot trained on site content ("Ask The Simple Guy") | Premium differentiator |

---

## 11. Agent Rules & Standards <a name="agent-rules"></a>

### Code Rules
1. **No frameworks.** Vanilla HTML5 + CSS3 + JS only. No React, Vue, Tailwind, SCSS, or build tools.
2. **Single CSS file** (`assets/css/style.css`). Add new styles at the end, grouped by section with clear `/* ===== Section Name ===== */` comment headers.
3. **Single JS file** (`assets/js/script.js`). Add new features at the end with clear section comment headers.
4. **Match existing patterns.** Before creating anything new, read existing pages to understand the patterns. Use the shared header/footer injection system.
5. **CSS variables only.** Never hardcode colors, spacing, or font sizes. Use the custom properties from `:root`.
6. **Dark mode mandatory.** Every new component must work in both light (`[data-theme="light"]`) and dark (`[data-theme="dark"]`). Test both.
7. **Mobile-first.** Design for 375px width first, enhance for larger screens. Test at 375px, 768px, 1024px.
8. **Lazy load all images.** `loading="lazy"` on every `<img>`. Use `fetchpriority="high"` only on hero/LCP images.
9. **Accessibility always.** Semantic HTML, ARIA labels on interactive elements, keyboard navigable, skip links, proper heading hierarchy (h1 → h2 → h3, never skip).
10. **No external JS libraries** without explicit approval. The exception: Chart.js for calculators if needed (lightweight, widely used).
11. **Use JSON data files** for structured content (books, movies, skills, foods). Don't hardcode data in HTML when it can be in JSON.
12. **Images in WebP** where possible. Always set width/height attributes to prevent layout shift.

### Content Rules
1. **Vikram's voice.** Personal, reflective, genuine. Uses philosophical quotes. Talks like a friend. Read existing content to match tone.
2. **Never salesy.** "I loved this book — here's where you can get it" not "BUY NOW!!!". No pop-ups, no aggressive CTAs.
3. **Always include affiliate disclosure** on pages with affiliate links.
4. **Indian context.** Currency in ₹. Indian platforms (Flipkart, Nykaa, Zerodha, Groww). Indian food, culture, climate references. INR pricing.
5. **Add content to JSON first**, then HTML references it. This keeps data centralized and queryable.

### Git Rules
1. **Repo:** https://github.com/vikramaditya26/vikramaditya.git
2. **Branch:** `main` for production (GitHub Pages deploys from main).
3. **Feature branches:** For large changes (new sections, restructure), work on a branch and merge.
4. **Commit often** with clear messages. One feature = one commit.
5. **Never modify CNAME file.**
6. **Never break the live site.** Test locally before pushing. When in doubt, use a branch.

### Priority Order (When Deciding What to Work on Next)
1. **Bugs / broken things** — fix immediately
2. **Monetization features** — affiliate links = revenue
3. **Vikram's active content** — if he's doing 100 Skills, prioritize that section
4. **Enhance existing sections** — improve what's there
5. **New sections** — expand the site
6. **Interactive tools** — calculators, planners
7. **SEO & analytics** — grow traffic
8. **Advanced features** — nice to have

### How to Read This Project Efficiently (For New Agents)
1. Read this AGENT.md completely (you're doing that now)
2. Check `assets/data/affiliate-links.json` for current monetization state
3. Check the Changelog at the bottom for recent changes
4. Read the specific section's HTML/JSON before modifying it
5. **Do NOT read every page's HTML** unless you're working on that specific page
6. Use JSON data files as the source of truth for content inventory

---

## 12. Quick References <a name="quick-references"></a>

### Adding a New Section (e.g., /skincare/)
1. Create folder: `skincare/index.html`
2. Use shared header/footer injection (check script.js for pattern)
3. Add nav link in the shared header component (ONE edit in script.js)
4. Add page-specific CSS in style.css under new section comment
5. Add explore card on index.html
6. Add to sitemap.xml
7. Create relevant JSON data file in assets/data/ if section has structured content
8. Test: both themes, mobile, all internal links work

### Adding a New Book
1. Add entry to `assets/data/books.json`
2. Save cover image to `assets/images/books/`
3. Add affiliate links to `assets/data/affiliate-links.json`
4. The books page auto-renders the new card (if using JSON-driven rendering)
5. Or: manually add HTML card to books/index.html following existing pattern

### Adding a New Skill (100 Days)
1. Add entry to `assets/data/skills.json`
2. Create folder: `100-skills/day-XXX-skill-name/index.html`
3. Follow the skill page template (hero, supplies, how-to, attempt, verdict)
4. Save images to `assets/images/skills/`
5. Add supply links to `assets/data/affiliate-links.json`
6. Update progress tracker on 100-skills/index.html

### Adding a New Tool/Calculator
1. Create folder: `tools/tool-name/index.html`
2. Self-contained JS within the page (or shared via script.js if reusable)
3. Add to sitemap.xml
4. Link from relevant section (e.g., diet planner linked from kitchen page and workout page)

---

## 13. Changelog <a name="changelog"></a>

| Date | Change | Phase |
|------|--------|-------|
| 2025-07-05 | Website created — 6 pages (index, finance, books, workout, blog, contact) | — |
| 2026-04-04 | AGENT.md v2 created — comprehensive architecture, 12-phase roadmap, data strategy | Phase 0 |
| 2026-04-04 | **Phase 0 complete** — Restructured flat HTML to folder-based URLs (`/books/`, `/finance/`, etc.). Moved all assets under `assets/` (css, js, images, data). Built shared header/footer injection via `script.js` (`renderHeader()`, `renderFooter()`, `injectComponents()`). Created `getBasePath()` for relative path resolution across folder depths. Added `.nojekyll`, `404.html`, `robots.txt`, `sitemap.xml`. Created `assets/data/books.json` (15 books) and `assets/data/affiliate-links.json` (centralized link registry). Removed old flat files. All 6 pages tested in both themes. Committed as `a5b912b`. | Phase 0 |
| 2026-04-05 | **Phase 1 complete** — Monetization foundation. Built affiliate link loader in `script.js` (reads `affiliate-links.json`, auto-populates `[data-affiliate]` elements with URLs, adds `rel="nofollow sponsored"` and `target="_blank"`). Designed `.buy-btn` CSS component (Amazon orange, Flipkart blue). Added buy buttons (Amazon + Flipkart) to all 15 book cards. Added `.affiliate-disclosure` component. Added "Supplements I Use" section to workout page (Whey Protein, Creatine, Multivitamin cards with buy links). Added "Books That Changed How I Think About Money" cross-sell section to finance page (4 recommended books with covers and buy links). All changes tested in both themes. | Phase 1 |

### How the affiliate system works (for future agents):
1. **Data source:** `assets/data/affiliate-links.json` — all affiliate URLs live here. Currently all `"#"` (placeholder). When Vikram gets Amazon Associates tag, update this ONE file.
2. **HTML markup:** Any link with `data-affiliate="section.key.platform"` attribute (e.g., `data-affiliate="books.siddhartha.amazon"`) gets auto-populated.
3. **JS loader:** In `script.js`, the `loadAffiliateLinks()` IIFE fetches the JSON, walks the dot-path, and sets `href`, `rel`, and `target` on matching elements.
4. **CSS components:** `.buy-btn.amazon` (orange), `.buy-btn.flipkart` (blue), `.buy-links` (flex container), `.affiliate-disclosure` (left-bordered aside).
5. **Adding new affiliate links:** Add entry to JSON → Add `data-affiliate` attribute to HTML link → Done. No JS changes needed.

---

*Last updated: 2026-04-05*
*Next priority: Phase 2 — Analytics & SEO Basics*
