/* =====================================================================
   Private Tracker — client-side, encrypted, local-only.
   Data is AES-GCM encrypted with a password and stored in localStorage.
   Nothing is ever sent to a server.
   ===================================================================== */
(function () {
  'use strict';

  // ---------- storage keys ----------
  const K_SALT = 'trk_salt';
  const K_VAULT = 'trk_vault';
  const K_THEME = 'trk_theme';

  // ---------- runtime state ----------
  let CRYPTO_KEY = null;   // derived AES key (kept in memory only while unlocked)
  let DATA = null;         // decrypted data object
  let curDate = todayStr();
  let saveTimer = null;

  // =====================================================================
  //  Crypto helpers
  // =====================================================================
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  function b64(bytes) { let s = ''; bytes.forEach(b => s += String.fromCharCode(b)); return btoa(s); }
  function unb64(str) { return Uint8Array.from(atob(str), c => c.charCodeAt(0)); }

  async function deriveKey(password, salt) {
    const mat = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 160000, hash: 'SHA-256' },
      mat, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  }
  async function encryptObj(obj, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(JSON.stringify(obj))));
    const out = new Uint8Array(iv.length + ct.length);
    out.set(iv); out.set(ct, iv.length);
    return b64(out);
  }
  async function decryptObj(blobB64, key) {
    const raw = unb64(blobB64);
    const iv = raw.slice(0, 12), ct = raw.slice(12);
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
    return JSON.parse(dec.decode(pt));
  }

  async function persist() {
    if (!CRYPTO_KEY || !DATA) return;
    DATA.meta.updatedAt = new Date().toISOString();
    localStorage.setItem(K_VAULT, await encryptObj(DATA, CRYPTO_KEY));
  }
  function queueSave() { clearTimeout(saveTimer); saveTimer = setTimeout(persist, 250); }

  // =====================================================================
  //  Date helpers
  // =====================================================================
  function todayStr() { const d = new Date(); return fmt(d); }
  function fmt(d) { return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()); }
  function p2(n) { return String(n).padStart(2, '0'); }
  function shiftDate(str, days) { const d = new Date(str + 'T00:00'); d.setDate(d.getDate() + days); return fmt(d); }
  function dow(str) { return new Date(str + 'T00:00').toLocaleDateString('en-US', { weekday: 'long' }); }
  function prettyDate(str) { return new Date(str + 'T00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  function lastNDates(n, end) {
    const out = []; let d = end || todayStr();
    for (let i = 0; i < n; i++) { out.unshift(d); d = shiftDate(d, -1); }
    return out;
  }

  // =====================================================================
  //  Data model
  // =====================================================================
  function blankDay() {
    return { weight: null, water: 0, meals: [], workout: { type: 'Rest', done: false, exercises: [] }, journal: { mood: 0, text: '' }, habits: {} };
  }
  function day(date) {
    if (!DATA.days[date]) DATA.days[date] = blankDay();
    const d = DATA.days[date];
    if (!d.workout) d.workout = { type: 'Rest', done: false, exercises: [] };
    if (!d.journal) d.journal = { mood: 0, text: '' };
    if (!d.habits) d.habits = {};
    if (!d.meals) d.meals = [];
    return d;
  }
  const HABITS = [
    { k: 'sleep', label: '😴 8h sleep' },
    { k: 'water', label: '💧 3L water' },
    { k: 'protein', label: '🥛 Protein hit' },
    { k: 'nojunk', label: '🚫 No junk' },
    { k: 'meditate', label: '🧘 Meditate' },
    { k: 'steps', label: '🚶 10k steps' },
  ];
  const PPL = {
    Push: ['Incline Dumbbell Press', 'Flat Dumbbell Fly', 'Weighted Dips', 'Overhead Press', 'Lateral Raise', 'Tricep Pushdown'],
    Pull: ['Deadlift', 'Lat Pulldown', 'Barbell Row', 'Face Pull', 'Bicep Curl', 'Hammer Curl'],
    Legs: ['Squat', 'Romanian Deadlift', 'Leg Press', 'Leg Extension', 'Leg Curl', 'Calf Raise'],
    Rest: [],
  };

  // =====================================================================
  //  Sample data seeding (vegetarian Indian bulk, PPL split)
  // =====================================================================
  function seedData() {
    const d = {
      meta: { created: new Date().toISOString(), updatedAt: new Date().toISOString(), version: 1 },
      profile: { name: 'Vikram', age: 22, heightCm: 175, startWeight: 55, goalWeight: 68, kcalGoal: 2800, proteinGoal: 130 },
      days: {},
      books: [
        { id: id(), title: 'Atomic Habits', author: 'James Clear', status: 'reading', totalPages: 320, pagesRead: 210, rating: 5, notes: 'Systems > goals. 1% better every day.', startedOn: shiftDate(todayStr(), -20), finishedOn: null },
        { id: id(), title: 'Sapiens', author: 'Yuval Noah Harari', status: 'reading', totalPages: 498, pagesRead: 120, rating: 4, notes: 'Shared myths let humans cooperate at scale.', startedOn: shiftDate(todayStr(), -8), finishedOn: null },
        { id: id(), title: 'Deep Work', author: 'Cal Newport', status: 'done', totalPages: 296, pagesRead: 296, rating: 5, notes: 'Focus is the new superpower. Time-block everything.', startedOn: shiftDate(todayStr(), -40), finishedOn: shiftDate(todayStr(), -15) },
        { id: id(), title: 'The Almanack of Naval Ravikant', author: 'Eric Jorgenson', status: 'want', totalPages: 242, pagesRead: 0, rating: 0, notes: 'Wealth + happiness. On the list.', startedOn: null, finishedOn: null },
      ],
    };

    const meals = {
      breakfast: [
        { name: 'Paneer bhurji + 3 rotis', kcal: 620, protein: 32 },
        { name: 'Oats + milk + peanut butter + banana', kcal: 540, protein: 24 },
        { name: 'Besan chilla (3) + curd', kcal: 480, protein: 26 },
        { name: 'Poha + boiled sprouts + milk', kcal: 500, protein: 20 },
      ],
      lunch: [
        { name: 'Rajma + rice + curd + salad', kcal: 720, protein: 28 },
        { name: 'Dal + 4 rotis + paneer sabzi', kcal: 780, protein: 34 },
        { name: 'Chole + rice + soya chunks', kcal: 760, protein: 38 },
        { name: 'Mixed veg + roti + dal + curd', kcal: 700, protein: 26 },
      ],
      snack: [
        { name: 'Whey shake + almonds', kcal: 320, protein: 32 },
        { name: 'Greek yogurt + granola', kcal: 280, protein: 20 },
        { name: 'Peanut chikki + milk', kcal: 340, protein: 14 },
      ],
      dinner: [
        { name: 'Paneer tikka + 3 rotis + dal', kcal: 760, protein: 40 },
        { name: 'Tofu stir-fry + rice', kcal: 640, protein: 30 },
        { name: 'Khichdi + curd + ghee + papad', kcal: 680, protein: 22 },
        { name: 'Dal makhani + jeera rice + salad', kcal: 720, protein: 24 },
      ],
    };
    const journals = [
      "Good day. Hit my protein target and the gym felt strong on push. Reading Atomic Habits before bed — the 2-minute rule is sticking.",
      "Bit tired today, slept only 6 hours. Still got the workout in. Need to fix my sleep — that's the bottleneck for the bulk.",
      "Rest day. Long walk, called family, journaled about the Crushky roadmap. Feeling clear-headed and grateful.",
      "Legs day destroyed me in the best way. Ate big to recover. Weight trending up slowly — patience.",
      "Great deep-work block in the morning. Weight is up 0.3kg this week. Small wins compound.",
      "Missed a meal because of a busy day at work. Made up with an extra shake. Consistency over perfection.",
      "Felt a little low in the evening but the pull workout lifted my mood. Wrote for 20 mins. Onward.",
    ];
    const types = ['Push', 'Pull', 'Legs', 'Rest', 'Push', 'Pull', 'Legs', 'Rest', 'Push', 'Pull', 'Legs', 'Rest', 'Push', 'Pull'];
    const weights = [55.0, 55.1, 55.0, 55.3, 55.2, 55.4, 55.5, 55.4, 55.6, 55.8, 55.7, 55.9, 56.1, 56.2];

    const dates = lastNDates(14);
    dates.forEach((date, i) => {
      const isRest = types[i] === 'Rest';
      const dm = [
        pick(meals.breakfast, i), pick(meals.lunch, i + 1), pick(meals.snack, i), pick(meals.dinner, i + 2),
      ].map(m => ({ id: id(), name: m.name, kcal: m.kcal, protein: m.protein }));
      const totProtein = dm.reduce((s, m) => s + m.protein, 0);
      d.days[date] = {
        weight: weights[i],
        water: 2 + (i % 3) * 0.5,
        meals: dm,
        workout: {
          type: types[i],
          done: !isRest,
          exercises: isRest ? [] : PPL[types[i]].slice(0, 5).map((n, j) => ({
            id: id(), name: n, sets: 4, reps: [8, 10, 12][j % 3], weight: 10 + j * 5,
          })),
        },
        journal: { mood: [4, 3, 5, 4, 5, 3, 4][i % 7], text: journals[i % journals.length] },
        habits: {
          sleep: i % 3 !== 1, water: i % 2 === 0, protein: totProtein >= 120,
          nojunk: i % 4 !== 0, meditate: i % 2 === 1, steps: i % 3 === 0,
        },
      };
    });
    return d;
  }
  function pick(arr, i) { return arr[i % arr.length]; }
  function id() { return Math.random().toString(36).slice(2, 10); }

  // =====================================================================
  //  Auth gate
  // =====================================================================
  const gate = $('#gate'), app = $('#app');
  const pw1 = $('#pw1'), pw2 = $('#pw2'), gateErr = $('#gateErr');
  const gateTitle = $('#gateTitle'), gateSub = $('#gateSub'), gateBtn = $('#gateBtn'), gateNote = $('#gateNote');
  const isNewUser = !localStorage.getItem(K_SALT);

  function setupGate() {
    if (isNewUser) {
      gateTitle.textContent = 'Create your tracker';
      gateSub.textContent = 'Set a password to encrypt your private data.';
      gateBtn.textContent = 'Create';
      pw2.style.display = 'block';
      pw1.setAttribute('autocomplete', 'new-password');
      pw1.placeholder = 'New password';
    }
  }
  $('#gateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    gateErr.textContent = '';
    const p = pw1.value;
    if (!p || p.length < 4) { gateErr.textContent = 'Password must be at least 4 characters.'; return; }
    gateBtn.disabled = true;
    try {
      if (isNewUser) {
        if (p !== pw2.value) { gateErr.textContent = 'Passwords do not match.'; gateBtn.disabled = false; return; }
        const salt = crypto.getRandomValues(new Uint8Array(16));
        localStorage.setItem(K_SALT, b64(salt));
        CRYPTO_KEY = await deriveKey(p, salt);
        DATA = seedData();
        await persist();
      } else {
        const salt = unb64(localStorage.getItem(K_SALT));
        CRYPTO_KEY = await deriveKey(p, salt);
        const blob = localStorage.getItem(K_VAULT);
        DATA = blob ? await decryptObj(blob, CRYPTO_KEY) : seedData();
        if (!blob) await persist();
      }
      launch();
    } catch (err) {
      gateErr.textContent = 'Wrong password.';
      CRYPTO_KEY = null;
      gateBtn.disabled = false;
    }
  });

  function launch() {
    gate.style.display = 'none';
    app.style.display = 'block';
    renderAll();
  }
  function lock() {
    CRYPTO_KEY = null; DATA = null;
    location.reload();
  }

  // =====================================================================
  //  Shell: tabs, theme, settings
  // =====================================================================
  function initTheme() {
    const saved = localStorage.getItem(K_THEME) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', saved);
    $('#themeBtn').textContent = saved === 'dark' ? '☀️' : '🌙';
  }
  $('#themeBtn').addEventListener('click', () => {
    const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', now);
    localStorage.setItem(K_THEME, now);
    $('#themeBtn').textContent = now === 'dark' ? '☀️' : '🌙';
    if (DATA) renderDashboard(); // redraw charts for theme colors
  });
  $('#lockBtn').addEventListener('click', lock);

  $('#tabs').addEventListener('click', (e) => {
    const t = e.target.closest('.tab'); if (!t) return;
    $$('.tab').forEach(x => x.classList.toggle('active', x === t));
    const v = t.dataset.view;
    $$('.view').forEach(x => x.classList.toggle('active', x.id === 'view-' + v));
    if (v === 'dashboard') renderDashboard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Settings modal
  const sm = $('#settingsModal');
  $('#menuBtn').addEventListener('click', () => {
    $('#setKcal').value = DATA.profile.kcalGoal;
    $('#setProtein').value = DATA.profile.proteinGoal;
    $('#setGoalW').value = DATA.profile.goalWeight;
    sm.classList.add('show');
  });
  $('#closeSettings').addEventListener('click', () => sm.classList.remove('show'));
  sm.addEventListener('click', (e) => { if (e.target === sm) sm.classList.remove('show'); });
  $('#saveSettings').addEventListener('click', () => {
    DATA.profile.kcalGoal = +$('#setKcal').value || DATA.profile.kcalGoal;
    DATA.profile.proteinGoal = +$('#setProtein').value || DATA.profile.proteinGoal;
    DATA.profile.goalWeight = +$('#setGoalW').value || DATA.profile.goalWeight;
    persist(); toast('Goals saved'); renderAll();
  });
  $('#exportBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'tracker-backup-' + todayStr() + '.json';
    a.click(); URL.revokeObjectURL(url);
    toast('Backup downloaded');
  });
  $('#importBtn').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const obj = JSON.parse(r.result);
        if (!obj.days || !obj.profile) throw new Error('bad');
        DATA = obj; persist(); renderAll(); toast('Backup imported');
        sm.classList.remove('show');
      } catch { toast('Invalid backup file'); }
    };
    r.readAsText(f);
  });
  $('#changePwBtn').addEventListener('click', async () => {
    const np = prompt('New password (min 4 chars). Keep it safe — no recovery.');
    if (!np || np.length < 4) { if (np !== null) toast('Too short'); return; }
    const salt = crypto.getRandomValues(new Uint8Array(16));
    localStorage.setItem(K_SALT, b64(salt));
    CRYPTO_KEY = await deriveKey(np, salt);
    await persist(); toast('Password changed');
  });
  $('#wipeBtn').addEventListener('click', () => {
    if (confirm('Erase ALL tracker data on this device? This cannot be undone. Export a backup first if unsure.')) {
      localStorage.removeItem(K_VAULT); localStorage.removeItem(K_SALT);
      location.reload();
    }
  });

  // =====================================================================
  //  Small DOM utils
  // =====================================================================
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.from((r || document).querySelectorAll(s)); }
  function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  let toastT;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800); }

  // Shared date bar
  function dateBar(onChange) {
    const wrap = el(`<div class="datebar">
      <button class="nav" data-d="-1">‹</button>
      <input type="date" value="${curDate}" max="${todayStr()}" />
      <button class="nav" data-d="1">›</button>
      <button class="today-btn">Today</button>
      <span class="dow">${dow(curDate)}</span>
    </div>`);
    const input = $('input', wrap), dowEl = $('.dow', wrap);
    function refresh() { input.value = curDate; dowEl.textContent = dow(curDate); onChange(); }
    $$('.nav', wrap).forEach(b => b.addEventListener('click', () => {
      const next = shiftDate(curDate, +b.dataset.d);
      if (next > todayStr()) return;
      curDate = next; refresh();
    }));
    input.addEventListener('change', () => { curDate = input.value; refresh(); });
    $('.today-btn', wrap).addEventListener('click', () => { curDate = todayStr(); refresh(); });
    return wrap;
  }

  // =====================================================================
  //  Canvas charts (no external libs)
  // =====================================================================
  function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function setupCanvas(canvas, h) {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.parentElement.clientWidth;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
    return { ctx, w, h };
  }
  function lineChart(canvas, series, opts) {
    opts = opts || {};
    const { ctx, w, h } = setupCanvas(canvas, opts.height || 200);
    const pad = { l: 38, r: 12, t: 14, b: 24 };
    const grid = cssVar('--grid'), textc = cssVar('--muted');
    const all = series.flatMap(s => s.data.filter(v => v != null));
    if (!all.length) { emptyChart(ctx, w, h, textc); return; }
    let min = opts.min != null ? opts.min : Math.min(...all);
    let max = opts.max != null ? opts.max : Math.max(...all);
    if (min === max) { min -= 1; max += 1; }
    const pd = (max - min) * 0.12; min -= pd; max += pd;
    const n = series[0].data.length;
    const X = i => pad.l + (w - pad.l - pad.r) * (n === 1 ? 0.5 : i / (n - 1));
    const Y = v => pad.t + (h - pad.t - pad.b) * (1 - (v - min) / (max - min));
    // grid + y labels
    ctx.strokeStyle = grid; ctx.fillStyle = textc; ctx.font = '10px Inter, sans-serif'; ctx.lineWidth = 1;
    for (let g = 0; g <= 4; g++) {
      const val = min + (max - min) * g / 4, y = Y(val);
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
      ctx.textAlign = 'right'; ctx.fillText(fmtNum(val), pad.l - 6, y + 3);
    }
    // x labels (sparse)
    ctx.textAlign = 'center';
    (opts.labels || []).forEach((lab, i) => {
      if (n > 8 && i % Math.ceil(n / 6) !== 0 && i !== n - 1) return;
      ctx.fillText(lab, X(i), h - 6);
    });
    // goal line
    if (opts.goal != null && opts.goal >= min && opts.goal <= max) {
      ctx.strokeStyle = cssVar('--amber'); ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(pad.l, Y(opts.goal)); ctx.lineTo(w - pad.r, Y(opts.goal)); ctx.stroke();
      ctx.setLineDash([]);
    }
    series.forEach(s => {
      const color = cssVar(s.color || '--accent');
      // area
      if (s.fill) {
        const grad = ctx.createLinearGradient(0, pad.t, 0, h - pad.b);
        grad.addColorStop(0, hexA(color, .22)); grad.addColorStop(1, hexA(color, 0));
        ctx.beginPath();
        let started = false;
        s.data.forEach((v, i) => { if (v == null) return; const x = X(i), y = Y(v); started ? ctx.lineTo(x, y) : (ctx.moveTo(x, y), started = true); });
        const pts = s.data.map((v, i) => v == null ? null : i).filter(i => i != null);
        if (pts.length) { ctx.lineTo(X(pts[pts.length - 1]), h - pad.b); ctx.lineTo(X(pts[0]), h - pad.b); ctx.closePath(); ctx.fillStyle = grad; ctx.fill(); }
      }
      // line
      ctx.beginPath(); ctx.lineWidth = 2.4; ctx.strokeStyle = color; ctx.lineJoin = 'round';
      let started = false;
      s.data.forEach((v, i) => { if (v == null) return; const x = X(i), y = Y(v); started ? ctx.lineTo(x, y) : (ctx.moveTo(x, y), started = true); });
      ctx.stroke();
      // dots
      ctx.fillStyle = color;
      s.data.forEach((v, i) => { if (v == null) return; ctx.beginPath(); ctx.arc(X(i), Y(v), 2.6, 0, 7); ctx.fill(); });
    });
  }
  function barChart(canvas, bars, opts) {
    opts = opts || {};
    const { ctx, w, h } = setupCanvas(canvas, opts.height || 200);
    const pad = { l: 38, r: 12, t: 14, b: 24 };
    const grid = cssVar('--grid'), textc = cssVar('--muted');
    const vals = bars.map(b => b.value);
    if (!vals.length) { emptyChart(ctx, w, h, textc); return; }
    let max = Math.max(opts.goal || 0, ...vals) * 1.15 || 1;
    const Y = v => pad.t + (h - pad.t - pad.b) * (1 - v / max);
    ctx.strokeStyle = grid; ctx.fillStyle = textc; ctx.font = '10px Inter, sans-serif'; ctx.lineWidth = 1;
    for (let g = 0; g <= 4; g++) {
      const val = max * g / 4, y = Y(val);
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
      ctx.textAlign = 'right'; ctx.fillText(fmtNum(val), pad.l - 6, y + 3);
    }
    const n = bars.length, bw = (w - pad.l - pad.r) / n * 0.6;
    const cx = i => pad.l + (w - pad.l - pad.r) * (i + 0.5) / n;
    if (opts.goal != null) {
      ctx.strokeStyle = cssVar('--amber'); ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(pad.l, Y(opts.goal)); ctx.lineTo(w - pad.r, Y(opts.goal)); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.textAlign = 'center';
    bars.forEach((b, i) => {
      const x = cx(i), y = Y(b.value), bh = (h - pad.b) - y;
      const color = cssVar(opts.goal != null && b.value >= opts.goal ? '--green' : (b.color || '--accent'));
      ctx.fillStyle = color;
      roundRect(ctx, x - bw / 2, y, bw, Math.max(bh, 1), 4); ctx.fill();
      ctx.fillStyle = textc;
      if (n <= 10 || i % Math.ceil(n / 7) === 0 || i === n - 1) ctx.fillText(b.label, x, h - 6);
    });
  }
  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function emptyChart(ctx, w, h, c) { ctx.fillStyle = c; ctx.font = '13px Inter'; ctx.textAlign = 'center'; ctx.fillText('No data yet', w / 2, h / 2); }
  function fmtNum(n) { return Math.abs(n) >= 1000 ? (n / 1000).toFixed(1) + 'k' : (Number.isInteger(n) ? n : n.toFixed(1)); }
  function hexA(hex, a) {
    hex = hex.trim();
    if (hex.startsWith('rgb')) return hex.replace(/rgba?\(([^)]+)\)/, (m, p) => `rgba(${p.split(',').slice(0, 3).join(',')},${a})`);
    let h = hex.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  // =====================================================================
  //  Aggregations
  // =====================================================================
  function dayKcal(date) { const d = DATA.days[date]; return d && d.meals ? d.meals.reduce((s, m) => s + (+m.kcal || 0), 0) : 0; }
  function dayProtein(date) { const d = DATA.days[date]; return d && d.meals ? d.meals.reduce((s, m) => s + (+m.protein || 0), 0) : 0; }
  function workoutStreak() {
    let streak = 0, d = todayStr();
    // allow today to be not-yet-done without breaking streak
    if (!(DATA.days[d] && DATA.days[d].workout && DATA.days[d].workout.done)) d = shiftDate(d, -1);
    while (DATA.days[d] && DATA.days[d].workout && DATA.days[d].workout.done) { streak++; d = shiftDate(d, -1); }
    return streak;
  }
  function latestWeight() {
    const dates = Object.keys(DATA.days).filter(d => DATA.days[d].weight != null).sort();
    return dates.length ? { date: dates[dates.length - 1], val: DATA.days[dates[dates.length - 1]].weight } : null;
  }

  // =====================================================================
  //  VIEW: Dashboard
  // =====================================================================
  function renderDashboard() {
    const v = $('#view-dashboard');
    const lw = latestWeight();
    const gw = DATA.profile.goalWeight, sw = DATA.profile.startWeight;
    const curW = lw ? lw.val : sw;
    const toGoal = (gw - curW);
    const progressPct = Math.max(0, Math.min(100, ((curW - sw) / (gw - sw)) * 100)) || 0;
    const kToday = dayKcal(todayStr()), pToday = dayProtein(todayStr());
    const streak = workoutStreak();
    const dates14 = lastNDates(14);
    const avgKcal = Math.round(dates14.reduce((s, d) => s + dayKcal(d), 0) / dates14.filter(d => DATA.days[d]).length || 0) || 0;

    v.innerHTML = '';
    v.appendChild(el(`<div class="section-title"><h1>📊 Dashboard</h1><span class="hint">${prettyDate(todayStr())}</span></div>`));

    // stat tiles
    const stats = el(`<div class="grid grid-4"></div>`);
    stats.appendChild(statTile('Current weight', (curW).toFixed(1), 'kg',
      lw ? deltaBadge(curW - sw, 'kg since start') : ''));
    stats.appendChild(statTile('To goal', (toGoal > 0 ? '+' : '') + toGoal.toFixed(1), 'kg',
      `<div class="delta flat">${gw} kg target</div>`));
    stats.appendChild(statTile('Workout streak', streak, streak === 1 ? 'day' : 'days',
      `<div class="delta ${streak ? 'up' : 'flat'}">${streak ? '🔥 keep going' : 'start today'}</div>`));
    stats.appendChild(statTile('Today · kcal', kToday || '—', kToday ? '/ ' + DATA.profile.kcalGoal : '',
      `<div class="delta flat">${pToday}g protein</div>`));
    v.appendChild(stats);

    // weight goal progress
    const prog = el(`<div class="card" style="margin-top:16px">
      <h3>Bulk progress · ${sw}kg → ${gw}kg</h3>
      <div class="bar green" style="margin:6px 0 10px"><span style="width:${progressPct}%"></span></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-2)">
        <span>${sw} kg</span><span>${progressPct.toFixed(0)}% there</span><span>${gw} kg</span>
      </div></div>`);
    v.appendChild(prog);

    // charts grid
    const charts = el(`<div class="grid grid-2" style="margin-top:16px"></div>`);
    // weight trend
    const wDates = lastNDates(14);
    const wCard = el(`<div class="card"><h3>Weight trend · 14 days</h3><div class="chart-wrap"><canvas></canvas></div></div>`);
    charts.appendChild(wCard);
    // calories
    const cCard = el(`<div class="card"><h3>Calories · 14 days</h3><div class="chart-wrap"><canvas></canvas></div>
      <div class="legend"><span><i style="background:var(--accent)"></i>Intake</span><span><i style="background:var(--amber)"></i>Goal ${DATA.profile.kcalGoal}</span></div></div>`);
    charts.appendChild(cCard);
    // protein
    const pCard = el(`<div class="card"><h3>Protein · 14 days</h3><div class="chart-wrap"><canvas></canvas></div>
      <div class="legend"><span><i style="background:var(--green)"></i>Hit goal</span><span><i style="background:var(--amber)"></i>Goal ${DATA.profile.proteinGoal}g</span></div></div>`);
    charts.appendChild(pCard);
    // mood
    const mCard = el(`<div class="card"><h3>Mood · 14 days</h3><div class="chart-wrap"><canvas></canvas></div></div>`);
    charts.appendChild(mCard);
    v.appendChild(charts);

    // workout split + books mini
    const bottom = el(`<div class="grid grid-2" style="margin-top:16px"></div>`);
    bottom.appendChild(workoutSplitCard());
    bottom.appendChild(booksMiniCard());
    v.appendChild(bottom);

    // draw (elements are already in the DOM, so clientWidth is available)
    const drawCharts = () => {
      lineChart($('canvas', wCard), [{ data: wDates.map(d => DATA.days[d] ? DATA.days[d].weight : null), color: '--accent', fill: true }],
        { labels: wDates.map(shortLab), goal: gw, height: 190 });
      barChart($('canvas', cCard), wDates.map(d => ({ label: shortLab(d), value: dayKcal(d) })),
        { goal: DATA.profile.kcalGoal, height: 190 });
      barChart($('canvas', pCard), wDates.map(d => ({ label: shortLab(d), value: dayProtein(d) })),
        { goal: DATA.profile.proteinGoal, height: 190, color: '--purple' });
      lineChart($('canvas', mCard), [{ data: wDates.map(d => DATA.days[d] && DATA.days[d].journal.mood ? DATA.days[d].journal.mood : null), color: '--purple', fill: true }],
        { labels: wDates.map(shortLab), min: 1, max: 5, height: 190 });
    };
    drawCharts();
    // redraw next frame too, in case layout width wasn't final on first paint
    requestAnimationFrame(drawCharts);
  }
  function shortLab(d) { return new Date(d + 'T00:00').toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }); }
  function statTile(label, value, unit, extra) {
    return el(`<div class="stat"><div class="label">${label}</div>
      <div class="value">${value} <small>${unit || ''}</small></div>${extra || ''}</div>`);
  }
  function deltaBadge(n, suffix) {
    const cls = n > 0.05 ? 'up' : (n < -0.05 ? 'down' : 'flat');
    const arrow = n > 0.05 ? '▲' : (n < -0.05 ? '▼' : '—');
    return `<div class="delta ${cls}">${arrow} ${Math.abs(n).toFixed(1)} ${suffix}</div>`;
  }
  function workoutSplitCard() {
    const last30 = lastNDates(30);
    const counts = { Push: 0, Pull: 0, Legs: 0, Rest: 0 };
    last30.forEach(d => { const w = DATA.days[d] && DATA.days[d].workout; if (w && w.done) counts[w.type] = (counts[w.type] || 0) + 1; });
    const total = counts.Push + counts.Pull + counts.Legs || 1;
    const rows = ['Push', 'Pull', 'Legs'].map(t => {
      const pct = Math.round(counts[t] / total * 100);
      return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><span>${t}</span><span style="color:var(--text-2)">${counts[t]} sessions</span></div><div class="bar"><span style="width:${pct}%"></span></div></div>`;
    }).join('');
    return el(`<div class="card"><h3>Workout split · 30 days</h3>${rows}
      <div style="margin-top:12px;font-size:13px;color:var(--text-2)">Total sessions: <b style="color:var(--text)">${counts.Push + counts.Pull + counts.Legs}</b></div></div>`);
  }
  function booksMiniCard() {
    const reading = DATA.books.filter(b => b.status === 'reading');
    const done = DATA.books.filter(b => b.status === 'done').length;
    const rows = reading.length ? reading.map(b => {
      const pct = b.totalPages ? Math.round(b.pagesRead / b.totalPages * 100) : 0;
      return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><span class="t" style="font-weight:600">${esc(b.title)}</span><span style="color:var(--text-2)">${pct}%</span></div><div class="bar amber"><span style="width:${pct}%"></span></div></div>`;
    }).join('') : '<div class="empty">No books in progress</div>';
    return el(`<div class="card"><h3>Currently reading · ${done} finished</h3>${rows}</div>`);
  }

  // =====================================================================
  //  VIEW: Diet
  // =====================================================================
  function renderDiet() {
    const v = $('#view-diet');
    v.innerHTML = '';
    v.appendChild(el(`<div class="section-title"><h1>🥗 Diet</h1><span class="hint">Veg · Indian · bulk</span></div>`));
    v.appendChild(dateBar(renderDiet));
    const d = day(curDate);

    // summary
    const kcal = dayKcal(curDate), protein = dayProtein(curDate);
    const kGoal = DATA.profile.kcalGoal, pGoal = DATA.profile.proteinGoal;
    const summary = el(`<div class="grid grid-3">
      ${miniStat('Calories', kcal, kGoal, 'kcal', 'accent')}
      ${miniStat('Protein', protein, pGoal, 'g', 'green')}
      ${miniStat('Water', d.water, 3, 'L', 'amber')}
    </div>`);
    v.appendChild(summary);

    // weight + water card
    const wc = el(`<div class="card">
      <div class="row">
        <div><label class="fld">Weight today (kg)</label><input class="input" type="number" step="0.1" id="dWeight" value="${d.weight != null ? d.weight : ''}" placeholder="e.g. 55.5"></div>
        <div><label class="fld">Water (litres)</label><input class="input" type="number" step="0.25" id="dWater" value="${d.water || ''}" placeholder="e.g. 3"></div>
      </div></div>`);
    v.appendChild(wc);
    $('#dWeight', wc).addEventListener('input', e => { d.weight = e.target.value === '' ? null : +e.target.value; queueSave(); });
    $('#dWater', wc).addEventListener('input', e => { d.water = +e.target.value || 0; queueSave(); });

    // meals
    const mealCard = el(`<div class="card">
      <h3>Meals</h3>
      <div id="mealList"></div>
      <div class="row" style="margin-top:12px">
        <div style="flex:2"><label class="fld">Food</label><input class="input" id="mName" placeholder="e.g. Paneer bhurji + 2 rotis"></div>
        <div><label class="fld">kcal</label><input class="input" type="number" id="mKcal" placeholder="500"></div>
        <div><label class="fld">Protein (g)</label><input class="input" type="number" id="mProt" placeholder="30"></div>
        <div style="flex:0 0 auto"><button class="btn" id="mAdd">Add</button></div>
      </div></div>`);
    v.appendChild(mealCard);
    const renderMeals = () => {
      const list = $('#mealList', mealCard);
      list.innerHTML = d.meals.length ? '' : '<div class="empty">No meals logged yet</div>';
      d.meals.forEach(m => {
        const row = el(`<div class="item"><div class="grow"><div class="t">${esc(m.name)}</div><div class="m">${m.kcal} kcal · ${m.protein}g protein</div></div><button class="x" title="Remove">×</button></div>`);
        $('.x', row).addEventListener('click', () => { d.meals = d.meals.filter(x => x.id !== m.id); persist(); renderMeals(); renderDietSummary(); });
        list.appendChild(row);
      });
    };
    const addMeal = () => {
      const name = $('#mName', mealCard).value.trim();
      if (!name) return;
      d.meals.push({ id: id(), name, kcal: +$('#mKcal', mealCard).value || 0, protein: +$('#mProt', mealCard).value || 0 });
      $('#mName', mealCard).value = $('#mKcal', mealCard).value = $('#mProt', mealCard).value = '';
      persist(); renderMeals(); renderDietSummary(); $('#mName', mealCard).focus();
    };
    $('#mAdd', mealCard).addEventListener('click', addMeal);
    mealCard.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') addMeal(); });
    renderMeals();

    // habits
    const hc = el(`<div class="card"><h3>Daily habits</h3><div class="ticks" id="habits"></div></div>`);
    v.appendChild(hc);
    const hbox = $('#habits', hc);
    HABITS.forEach(hb => {
      const on = !!d.habits[hb.k];
      const b = el(`<button class="tick ${on ? 'on' : ''}"><span class="box">${on ? '✓' : ''}</span>${hb.label}</button>`);
      b.addEventListener('click', () => {
        d.habits[hb.k] = !d.habits[hb.k];
        b.classList.toggle('on', d.habits[hb.k]);
        $('.box', b).textContent = d.habits[hb.k] ? '✓' : '';
        queueSave();
      });
      hbox.appendChild(b);
    });

    function renderDietSummary() {
      const k = dayKcal(curDate), p = dayProtein(curDate);
      updateMini(summary.children[0], k, kGoal);
      updateMini(summary.children[1], p, pGoal);
    }
  }
  function miniStat(label, val, goal, unit, color) {
    const pct = goal ? Math.min(100, Math.round(val / goal * 100)) : 0;
    return `<div class="stat"><div class="label">${label}</div>
      <div class="value" data-v>${val || 0} <small>/ ${goal} ${unit}</small></div>
      <div class="bar ${color}" style="margin-top:8px"><span data-bar style="width:${pct}%"></span></div></div>`;
  }
  function updateMini(node, val, goal) {
    $('[data-v]', node).childNodes[0].nodeValue = (val || 0) + ' ';
    $('[data-bar]', node).style.width = (goal ? Math.min(100, Math.round(val / goal * 100)) : 0) + '%';
  }

  // =====================================================================
  //  VIEW: Exercise
  // =====================================================================
  function renderExercise() {
    const v = $('#view-exercise');
    v.innerHTML = '';
    v.appendChild(el(`<div class="section-title"><h1>💪 Exercise</h1><span class="hint">Push · Pull · Legs</span></div>`));
    v.appendChild(dateBar(renderExercise));
    const d = day(curDate);
    const w = d.workout;

    // type selector + done
    const head = el(`<div class="card">
      <h3>Day type</h3>
      <div class="seg" id="typeSeg">
        ${['Push', 'Pull', 'Legs', 'Rest'].map(t => `<button data-t="${t}" class="${w.type === t ? 'on' : ''}">${t}</button>`).join('')}
      </div>
      <div style="margin-top:14px">
        <button class="tick ${w.done ? 'on' : ''}" id="doneBtn"><span class="box">${w.done ? '✓' : ''}</span>Workout completed</button>
      </div></div>`);
    v.appendChild(head);
    $$('#typeSeg button', head).forEach(b => b.addEventListener('click', () => {
      w.type = b.dataset.t;
      if (w.type === 'Rest') w.done = false;
      persist(); renderExercise();
    }));
    $('#doneBtn', head).addEventListener('click', () => {
      w.done = !w.done;
      $('#doneBtn', head).classList.toggle('on', w.done);
      $('#doneBtn .box', head).textContent = w.done ? '✓' : '';
      persist();
    });

    if (w.type === 'Rest') {
      v.appendChild(el(`<div class="card"><div class="empty">😌 Rest day — recovery is where you grow. Eat well, sleep well.</div></div>`));
      return;
    }

    // exercises
    const exCard = el(`<div class="card">
      <h3>${w.type} exercises</h3>
      <div id="exList"></div>
      <div class="row" style="margin-top:12px">
        <div style="flex:2"><label class="fld">Exercise</label>
          <input class="input" id="exName" list="exSug" placeholder="Add exercise">
          <datalist id="exSug">${PPL[w.type].map(n => `<option value="${esc(n)}">`).join('')}</datalist></div>
        <div><label class="fld">Sets</label><input class="input" type="number" id="exSets" placeholder="4"></div>
        <div><label class="fld">Reps</label><input class="input" type="number" id="exReps" placeholder="10"></div>
        <div><label class="fld">Kg</label><input class="input" type="number" id="exWt" placeholder="20"></div>
        <div style="flex:0 0 auto"><button class="btn" id="exAdd">Add</button></div>
      </div>
      <div class="sub" style="margin:12px 0 0">Quick add from ${w.type} template:</div>
      <div class="ticks" id="quickEx" style="margin-top:8px"></div>
    </div>`);
    v.appendChild(exCard);

    const renderEx = () => {
      const list = $('#exList', exCard);
      list.innerHTML = w.exercises.length ? '' : '<div class="empty">No exercises logged yet</div>';
      w.exercises.forEach(ex => {
        const row = el(`<div class="item"><div class="grow"><div class="t">${esc(ex.name)}</div><div class="m">${ex.sets} sets × ${ex.reps} reps${ex.weight ? ' · ' + ex.weight + ' kg' : ''}</div></div><button class="x">×</button></div>`);
        $('.x', row).addEventListener('click', () => { w.exercises = w.exercises.filter(x => x.id !== ex.id); persist(); renderEx(); });
        list.appendChild(row);
      });
    };
    const addEx = (name, sets, reps, wt) => {
      name = (name || $('#exName', exCard).value).trim(); if (!name) return;
      w.exercises.push({ id: id(), name, sets: +sets || +$('#exSets', exCard).value || 3, reps: +reps || +$('#exReps', exCard).value || 10, weight: +wt || +$('#exWt', exCard).value || 0 });
      $('#exName', exCard).value = $('#exSets', exCard).value = $('#exReps', exCard).value = $('#exWt', exCard).value = '';
      if (!w.done) { } persist(); renderEx();
    };
    $('#exAdd', exCard).addEventListener('click', () => addEx());
    exCard.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') addEx(); });
    // quick add buttons
    const qbox = $('#quickEx', exCard);
    PPL[w.type].forEach(n => {
      const b = el(`<button class="tick">+ ${n}</button>`);
      b.addEventListener('click', () => addEx(n, 4, 10, 0));
      qbox.appendChild(b);
    });
    renderEx();
  }

  // =====================================================================
  //  VIEW: Journal
  // =====================================================================
  const MOODS = ['😞', '😕', '😐', '🙂', '😄'];
  function renderJournal() {
    const v = $('#view-journal');
    v.innerHTML = '';
    v.appendChild(el(`<div class="section-title"><h1>📔 Journal</h1><span class="hint">One honest line a day</span></div>`));
    v.appendChild(dateBar(renderJournal));
    const d = day(curDate);

    const card = el(`<div class="card">
      <h3>How was ${prettyDate(curDate)}?</h3>
      <div class="moods" id="moods">${MOODS.map((m, i) => `<button class="mood ${d.journal.mood === i + 1 ? 'on' : ''}" data-m="${i + 1}">${m}</button>`).join('')}</div>
      <div style="margin-top:16px"><label class="fld">Entry</label>
        <textarea class="input" id="jText" placeholder="What happened, what you learned, what you're grateful for..." style="min-height:150px">${esc(d.journal.text)}</textarea></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px">
        <span class="sub" id="jCount" style="margin:0">${d.journal.text.length} chars</span>
        <span class="pill accent" id="jSaved" style="opacity:0">Saved ✓</span>
      </div>
    </div>`);
    v.appendChild(card);
    $$('#moods button', card).forEach(b => b.addEventListener('click', () => {
      d.journal.mood = +b.dataset.m;
      $$('#moods button', card).forEach(x => x.classList.toggle('on', x === b));
      queueSave(); flashSaved(card);
    }));
    const ta = $('#jText', card);
    ta.addEventListener('input', () => {
      d.journal.text = ta.value; $('#jCount', card).textContent = ta.value.length + ' chars';
      queueSave(); flashSaved(card);
    });

    // past entries
    const past = Object.keys(DATA.days).filter(k => DATA.days[k].journal && DATA.days[k].journal.text.trim() && k !== curDate).sort().reverse();
    const list = el(`<div class="card"><h3>Past entries · ${past.length}</h3><div id="jPast"></div></div>`);
    const pbox = $('#jPast', list);
    if (!past.length) pbox.innerHTML = '<div class="empty">No past entries</div>';
    past.slice(0, 30).forEach(k => {
      const j = DATA.days[k].journal;
      const e = el(`<div class="jentry"><div class="jhead">${MOODS[j.mood - 1] || '·'} <b style="color:var(--text)">${prettyDate(k)}</b> <span>· ${dow(k)}</span></div><div class="jtext">${esc(j.text)}</div></div>`);
      e.style.cursor = 'pointer';
      e.title = 'Open this day';
      e.addEventListener('click', () => { curDate = k; renderJournal(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      pbox.appendChild(e);
    });
    v.appendChild(list);
  }
  let savedT;
  function flashSaved(card) { const s = $('#jSaved', card); if (!s) return; s.style.opacity = '1'; clearTimeout(savedT); savedT = setTimeout(() => s.style.opacity = '0', 1200); }

  // =====================================================================
  //  VIEW: Books
  // =====================================================================
  function renderBooks() {
    const v = $('#view-books');
    v.innerHTML = '';
    v.appendChild(el(`<div class="section-title"><h1>📚 Books</h1><span class="hint">${DATA.books.length} tracked</span></div>`));

    // add
    const add = el(`<div class="card"><h3>Add a book</h3>
      <div class="row">
        <div style="flex:2"><label class="fld">Title</label><input class="input" id="bTitle" placeholder="Book title"></div>
        <div style="flex:1.5"><label class="fld">Author</label><input class="input" id="bAuthor" placeholder="Author"></div>
        <div><label class="fld">Pages</label><input class="input" type="number" id="bPages" placeholder="300"></div>
        <div style="flex:0 0 auto"><button class="btn" id="bAdd">Add</button></div>
      </div></div>`);
    v.appendChild(add);
    $('#bAdd', add).addEventListener('click', () => {
      const t = $('#bTitle', add).value.trim(); if (!t) return;
      DATA.books.unshift({ id: id(), title: t, author: $('#bAuthor', add).value.trim(), status: 'want', totalPages: +$('#bPages', add).value || 0, pagesRead: 0, rating: 0, notes: '', startedOn: null, finishedOn: null });
      persist(); renderBooks();
    });

    // groups
    ['reading', 'want', 'done'].forEach(status => {
      const books = DATA.books.filter(b => b.status === status);
      const titles = { reading: '📖 Reading', want: '🔖 Want to read', done: '✅ Finished' };
      const card = el(`<div class="card"><h3>${titles[status]} · ${books.length}</h3><div class="bwrap"></div></div>`);
      const wrap = $('.bwrap', card);
      if (!books.length) wrap.innerHTML = '<div class="empty">Nothing here yet</div>';
      books.forEach(b => wrap.appendChild(bookRow(b)));
      v.appendChild(card);
    });
  }
  function bookRow(b) {
    const pct = b.totalPages ? Math.round(b.pagesRead / b.totalPages * 100) : 0;
    const stars = [1, 2, 3, 4, 5].map(s => `<span data-s="${s}" style="cursor:pointer;color:${s <= b.rating ? 'var(--amber)' : 'var(--muted)'}">★</span>`).join('');
    const row = el(`<div style="padding:14px 0;border-bottom:1px solid var(--border)">
      <div style="display:flex;justify-content:space-between;gap:10px">
        <div class="grow"><div class="t" style="font-weight:600">${esc(b.title)}</div><div class="m" style="font-size:12px;color:var(--text-2)">${esc(b.author || '')}</div></div>
        <button class="x" title="Remove">×</button>
      </div>
      ${b.status !== 'want' ? `<div class="bar amber" style="margin:10px 0 6px"><span style="width:${pct}%"></span></div>
      <div class="row" style="align-items:center;gap:8px">
        <div style="flex:0 0 auto;font-size:12px;color:var(--text-2)">Pages</div>
        <div style="flex:0 0 90px"><input class="input" type="number" value="${b.pagesRead}" data-pages style="padding:6px 8px"></div>
        <div style="flex:0 0 auto;font-size:12px;color:var(--text-2)">/ ${b.totalPages || '?'} · ${pct}%</div>
        <div style="flex:1;text-align:right;font-size:17px" data-stars>${stars}</div>
      </div>` : ''}
      <div style="margin-top:10px"><textarea class="input" data-notes placeholder="Notes / key takeaways..." style="min-height:54px">${esc(b.notes || '')}</textarea></div>
      <div class="seg" style="margin-top:10px" data-status>
        ${['want', 'reading', 'done'].map(s => `<button data-st="${s}" class="${b.status === s ? 'on' : ''}">${{ want: 'Want', reading: 'Reading', done: 'Done' }[s]}</button>`).join('')}
      </div>
    </div>`);
    $('.x', row).addEventListener('click', () => { if (confirm('Remove "' + b.title + '"?')) { DATA.books = DATA.books.filter(x => x.id !== b.id); persist(); renderBooks(); } });
    const pg = $('[data-pages]', row);
    if (pg) pg.addEventListener('input', () => { b.pagesRead = Math.max(0, Math.min(+pg.value || 0, b.totalPages || 99999)); queueSave(); const bar = $('.bar > span', row); if (bar) bar.style.width = (b.totalPages ? Math.round(b.pagesRead / b.totalPages * 100) : 0) + '%'; });
    $('[data-notes]', row).addEventListener('input', e => { b.notes = e.target.value; queueSave(); });
    $$('[data-status] button', row).forEach(btn => btn.addEventListener('click', () => {
      b.status = btn.dataset.st;
      if (b.status === 'done') { b.finishedOn = todayStr(); if (b.totalPages) b.pagesRead = b.totalPages; }
      if (b.status === 'reading' && !b.startedOn) b.startedOn = todayStr();
      persist(); renderBooks();
    }));
    const sw = $('[data-stars]', row);
    if (sw) $$('[data-s]', sw).forEach(st => st.addEventListener('click', () => { b.rating = +st.dataset.s; persist(); renderBooks(); }));
    return row;
  }

  // =====================================================================
  //  Render router
  // =====================================================================
  function renderAll() {
    renderDashboard();
    renderDiet();
    renderExercise();
    renderJournal();
    renderBooks();
  }
  // redraw dashboard charts on resize
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (DATA && $('#view-dashboard').classList.contains('active')) renderDashboard(); }, 200); });

  // =====================================================================
  //  Boot
  // =====================================================================
  initTheme();
  setupGate();
  pw1.focus();
})();
