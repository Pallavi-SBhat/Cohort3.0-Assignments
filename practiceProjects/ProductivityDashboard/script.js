/* =====================================================================
   DAYBASE — app logic
   Sections: Navigation · Clock/Background · Theme · Todo · Planner ·
             Goals · Pomodoro · Quote · Weather
===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTheme();
  initClockAndBackground();
  initTodo();
  initPlanner();
  initGoals();
  initPomodoro();
  initQuote();
  initWeather();
});

/* =====================================================================
   NAVIGATION — dashboard <-> feature views
===================================================================== */
function initNavigation(){
  const dashboard = document.getElementById('dashboardView');
  const features = Array.from(document.querySelectorAll('.feature'));
  let switching = false; // guards rapid double-clicks

  function showDashboard(){
    features.forEach(f => f.hidden = true);
    dashboard.hidden = false;
  }

  function openView(name){
    if (switching) return;
    switching = true;
    const target = document.getElementById(`view-${name}`);
    if (!target) { switching = false; return; }
    features.forEach(f => f.hidden = (f !== target));
    dashboard.hidden = true;
    target.querySelector('input, textarea')?.focus({ preventScroll: true });
    document.dispatchEvent(new CustomEvent('view:opened', { detail: { name } }));
    setTimeout(() => { switching = false; }, 150);
  }

  document.querySelectorAll('[data-open]').forEach(card => {
    card.addEventListener('click', () => openView(card.dataset.open));
  });
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', showDashboard);
  });

  showDashboard();
}

/* =====================================================================
   THEME SWITCH
===================================================================== */
function initTheme(){
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');

  function apply(theme){
    root.setAttribute('data-theme', theme);
    localStorage.setItem('daybook-theme', theme);
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    icon.textContent = theme === 'dark' ? '☾' : '☀';
  }

  // Theme was already applied pre-paint in <head>; just sync the control.
  const current = root.getAttribute('data-theme') || 'dark';
  apply(current);

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
  });
}

/* =====================================================================
   CLOCK, DATE, DYNAMIC BACKGROUND
===================================================================== */
function initClockAndBackground(){
  const timeEl = document.getElementById('clockTime');
  const dateEl = document.getElementById('clockDate');

  const parts = [
    { key: 'night', start: 0,  end: 5,  color: '--tint-night' },
    { key: 'dawn',  start: 5,  end: 8,  color: '--tint-dawn'  },
    { key: 'day',   start: 8,  end: 17, color: '--tint-day'   },
    { key: 'dusk',  start: 17, end: 20, color: '--tint-dusk'  },
    { key: 'night2',start: 20, end: 24, color: '--tint-night' },
  ];

  function partFor(hour){
    return parts.find(p => hour >= p.start && hour < p.end) || parts[0];
  }

  function tick(){
    const now = new Date();

    // Time — 24hr with leading zeros
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${hh}:${mm}:${ss}`;

    // Date — e.g. "Thursday 9 Jul"
    const weekday = now.toLocaleDateString(undefined, { weekday: 'long' });
    const month = now.toLocaleDateString(undefined, { month: 'short' });
    dateEl.textContent = `${weekday} ${now.getDate()} ${month}`;

    // Dynamic background tint, changes automatically by time of day
    const part = partFor(now.getHours());
    document.documentElement.setAttribute('data-daypart', part.key);
    const hex = getComputedStyle(document.documentElement).getPropertyValue(part.color).trim();
    document.body.style.setProperty('--tint', hexToRgba(hex, 0.35));
  }

  tick();
  setInterval(tick, 1000); // single interval; function only ever called once
}

function hexToRgba(hex, alpha){
  const h = hex.replace('#', '');
  const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  const r = (bigint >> 16) & 255, g = (bigint >> 8) & 255, b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* =====================================================================
   SHARED HELPERS
===================================================================== */
function loadJSON(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }catch(e){ return fallback; }
}
function saveJSON(key, value){
  try{ localStorage.setItem(key, JSON.stringify(value)); }catch(e){ /* storage unavailable */ }
}
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function escapeHTML(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/* =====================================================================
   TODO LIST
===================================================================== */
function initTodo(){
  const STORE_KEY = 'daybook-todos';
  const listEl = document.getElementById('todoList');
  const emptyEl = document.getElementById('todoEmpty');
  const form = document.getElementById('todoForm');
  const input = document.getElementById('todoInput');
  const summaryEl = document.getElementById('todoSummary');

  let todos = loadJSON(STORE_KEY, []);

  function render(){
    listEl.innerHTML = todos.map(t => `
      <li class="list-item ${t.completed ? 'completed' : ''} ${t.important ? 'important' : ''}" data-id="${t.id}">
        <button class="list-item__btn ${t.completed ? 'active' : ''}" data-action="complete" title="Mark complete">${t.completed ? '☑' : '☐'}</button>
        <span class="list-item__text">${escapeHTML(t.text)}</span>
        <button class="list-item__btn ${t.important ? 'active' : ''}" data-action="important" title="Mark important">★</button>
        <button class="list-item__btn danger" data-action="delete" title="Delete">✕</button>
      </li>
    `).join('');

    emptyEl.classList.toggle('show', todos.length === 0);

    if (todos.length === 0){
      summaryEl.textContent = "Today's tasks";
    } else {
      const openCount = todos.filter(t => !t.completed).length;
      summaryEl.textContent = `${openCount} open · ${todos.length - openCount} done`;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    todos.unshift({ id: uid(), text, completed: false, important: false });
    saveJSON(STORE_KEY, todos);
    render();
    input.value = '';
    input.focus();
  });

  // Event delegation for complete / important / delete
  listEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const li = btn.closest('.list-item');
    const id = li.dataset.id;
    const action = btn.dataset.action;

    if (action === 'delete'){
      todos = todos.filter(t => t.id !== id);
    } else {
      todos = todos.map(t => {
        if (t.id !== id) return t;
        if (action === 'complete') return { ...t, completed: !t.completed };
        if (action === 'important') return { ...t, important: !t.important };
        return t;
      });
    }
    saveJSON(STORE_KEY, todos);
    render();
  });

  render();
}

/* =====================================================================
   DAILY PLANNER — custom time + task entries (add / edit / delete)
===================================================================== */
function initPlanner(){
  const STORE_KEY = 'daybook-planner-entries';
  const listEl = document.getElementById('plannerList');
  const emptyEl = document.getElementById('plannerEmpty');
  const form = document.getElementById('plannerForm');
  const timeInput = document.getElementById('plannerTimeInput');
  const taskInput = document.getElementById('plannerTaskInput');
  const summaryEl = document.getElementById('plannerSummary');

  let entries = loadJSON(STORE_KEY, []);
  let editingId = null;

  function currentHHMM(){
    const now = new Date();
    return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  }

  function formatTime(hhmm){
    const [h, m] = hhmm.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    let hour12 = h % 12;
    if (hour12 === 0) hour12 = 12;
    return `${hour12}:${String(m).padStart(2,'0')} ${period}`;
  }

  function sorted(){
    return [...entries].sort((a, b) => a.time.localeCompare(b.time));
  }

  function render(){
    const nowHH = currentHHMM().slice(0, 2); // highlight entries within the current hour
    const list = sorted();

    listEl.innerHTML = list.map(entry => {
      if (entry.id === editingId){
        return `
          <li class="list-item is-editing" data-id="${entry.id}">
            <input type="time" class="planner-edit-time" value="${entry.time}" />
            <input type="text" class="planner-edit-task" maxlength="140" value="${escapeHTML(entry.task)}" />
            <button class="list-item__btn" data-action="save" title="Save">✓</button>
            <button class="list-item__btn danger" data-action="cancel" title="Cancel">✕</button>
          </li>
        `;
      }
      const isNow = entry.time.slice(0, 2) === nowHH;
      return `
        <li class="list-item ${isNow ? 'is-now' : ''}" data-id="${entry.id}">
          <span class="planner-item__time">${formatTime(entry.time)}</span>
          <span class="list-item__text">${escapeHTML(entry.task)}</span>
          <button class="list-item__btn" data-action="edit" title="Edit">✎</button>
          <button class="list-item__btn danger" data-action="delete" title="Delete">✕</button>
        </li>
      `;
    }).join('');

    emptyEl.classList.toggle('show', entries.length === 0);
    summaryEl.textContent = entries.length === 0
      ? 'Block your day'
      : `${entries.length} task${entries.length === 1 ? '' : 's'} planned`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const time = timeInput.value;
    const task = taskInput.value.trim();
    if (!time || !task) return;

    entries.push({ id: uid(), time, task });
    saveJSON(STORE_KEY, entries);
    render();
    taskInput.value = '';
    timeInput.value = '';
    timeInput.focus();
  });

  listEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const li = btn.closest('.list-item');
    const id = li.dataset.id;
    const action = btn.dataset.action;

    if (action === 'delete'){
      entries = entries.filter(en => en.id !== id);
      saveJSON(STORE_KEY, entries);
      render();
    } else if (action === 'edit'){
      editingId = id;
      render();
    } else if (action === 'cancel'){
      editingId = null;
      render();
    } else if (action === 'save'){
      const newTime = li.querySelector('.planner-edit-time').value;
      const newTask = li.querySelector('.planner-edit-task').value.trim();
      if (!newTime || !newTask) return; // keep editing until valid
      entries = entries.map(en => en.id === id ? { ...en, time: newTime, task: newTask } : en);
      editingId = null;
      saveJSON(STORE_KEY, entries);
      render();
    }
  });

  // Re-check the "current hour" highlight periodically
  setInterval(render, 60000);

  render();
}

/* =====================================================================
   DAILY GOALS
===================================================================== */
function initGoals(){
  const STORE_KEY = 'daybook-goals';
  const listEl = document.getElementById('goalList');
  const emptyEl = document.getElementById('goalEmpty');
  const form = document.getElementById('goalForm');
  const input = document.getElementById('goalInput');
  const cardSummary = document.getElementById('goalsSummary');
  const progressFill = document.getElementById('goalProgressFill');
  const progressLabel = document.getElementById('goalProgressLabel');

  let goals = loadJSON(STORE_KEY, []);

  function render(){
    listEl.innerHTML = goals.map(g => `
      <li class="list-item ${g.completed ? 'completed' : ''}" data-id="${g.id}">
        <button class="list-item__btn ${g.completed ? 'active' : ''}" data-action="complete" title="Mark done">${g.completed ? '☑' : '☐'}</button>
        <span class="list-item__text">${escapeHTML(g.text)}</span>
        <button class="list-item__btn danger" data-action="delete" title="Delete">✕</button>
      </li>
    `).join('');

    emptyEl.classList.toggle('show', goals.length === 0);

    const done = goals.filter(g => g.completed).length;
    const total = goals.length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    progressFill.style.width = `${pct}%`;
    progressLabel.textContent = `${done} of ${total} completed`;
    cardSummary.textContent = total === 0 ? 'Track the long game' : `${done} of ${total} complete`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    goals.push({ id: uid(), text, completed: false });
    saveJSON(STORE_KEY, goals);
    render();
    input.value = '';
    input.focus();
  });

  listEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const id = btn.closest('.list-item').dataset.id;

    if (btn.dataset.action === 'delete'){
      goals = goals.filter(g => g.id !== id);
    } else {
      goals = goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
    }
    saveJSON(STORE_KEY, goals);
    render();
  });

  render();
}

/* =====================================================================
   POMODORO TIMER
===================================================================== */
function initPomodoro(){
  const WORK_SECONDS = 25 * 60;
  const BREAK_SECONDS = 5 * 60;

  const timeEl = document.getElementById('pomodoroTime');
  const sessionEl = document.getElementById('pomodoroSession');
  const summaryEl = document.getElementById('pomodoroSummary');
  const startBtn = document.getElementById('pomodoroStart');
  const pauseBtn = document.getElementById('pomodoroPause');
  const resetBtn = document.getElementById('pomodoroReset');

  let session = 'work';        // 'work' | 'break'
  let remaining = WORK_SECONDS;
  let intervalId = null;

  function format(total){
    const m = String(Math.floor(total / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateDisplay(){
    timeEl.textContent = format(remaining);
    sessionEl.textContent = session === 'work' ? 'Work Session' : 'Break';
    summaryEl.textContent = intervalId
      ? `${format(remaining)} · ${session === 'work' ? 'Work session' : 'Break'}`
      : 'Work in sprints';
  }

  function tick(){
    remaining -= 1;
    if (remaining <= 0){
      clearInterval(intervalId);
      intervalId = null;
      // Switch session type; wait for the user to press Start again.
      session = session === 'work' ? 'break' : 'work';
      remaining = session === 'work' ? WORK_SECONDS : BREAK_SECONDS;
      updateDisplay();
      notifySessionEnd(session);
      return;
    }
    updateDisplay();
  }

  function start(){
    if (intervalId) return; // never allow two intervals at once
    intervalId = setInterval(tick, 1000);
    updateDisplay();
  }
  function pause(){
    clearInterval(intervalId);
    intervalId = null;
    updateDisplay();
  }
  function reset(){
    clearInterval(intervalId);
    intervalId = null;
    session = 'work';
    remaining = WORK_SECONDS;
    updateDisplay();
  }

  function notifySessionEnd(nextSession){
    const msg = nextSession === 'break'
      ? 'Work session complete — time for a break.'
      : 'Break is over — ready for another work session.';
    beep();
    sessionEl.textContent = msg;
    setTimeout(updateDisplay, 2500);
  }

  function beep(){
    try{
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 660;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }catch(e){ /* audio unavailable */ }
  }

  startBtn.addEventListener('click', start);
  pauseBtn.addEventListener('click', pause);
  resetBtn.addEventListener('click', reset);

  updateDisplay();
}

/* =====================================================================
   MOTIVATION QUOTE — cached "quote of the day" + manual refresh
===================================================================== */
function initQuote(){
  const STORE_KEY = 'daybook-daily-quote';
  const textEl = document.getElementById('quoteText');
  const authorEl = document.getElementById('quoteAuthor');
  const newBtn = document.getElementById('quoteNew');
  const card = document.querySelector('.quote-card');

  const FALLBACK_QUOTES = [
    { text: 'Small steps, done daily, outrun big plans done never.', author: 'Daybase' },
    { text: 'Start before you feel ready.', author: 'Daybase' },
    { text: 'Focus is a decision you make every few minutes, not once.', author: 'Daybase' },
  ];

  function todayKey(){
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  function display(text, author){
    textEl.textContent = `“${text}”`;
    authorEl.textContent = `— ${author}`;
  }

  async function fetchAndCache(){
    card.classList.add('is-loading');
    textEl.textContent = 'Fetching a line for you…';
    authorEl.textContent = '';
    try{
      const res = await fetch('https://dummyjson.com/quotes/random');
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      display(data.quote, data.author);
      saveJSON(STORE_KEY, { date: todayKey(), text: data.quote, author: data.author });
    }catch(err){
      const pick = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
      display(pick.text, `${pick.author} (offline)`);
    }finally{
      card.classList.remove('is-loading');
    }
  }

  function loadDailyQuote(){
    const cached = loadJSON(STORE_KEY, null);
    if (cached && cached.date === todayKey()){
      display(cached.text, cached.author);
      return;
    }
    fetchAndCache(); // new day (or first run) — get a fresh one and cache it
  }

  newBtn.addEventListener('click', fetchAndCache);
  loadDailyQuote();
}

/* =====================================================================
   WEATHER WIDGET — compact header badge
===================================================================== */
function initWeather(){
  const valueEl = document.getElementById('weatherValue');
  const subEl = document.getElementById('weatherSub');
  const badgeEl = document.getElementById('weatherWidget');

  const DEFAULT_LOCATION = { name: 'Mangaluru', lat: 12.9141, lon: 74.8560 };

  const CODE_MAP = {
    0:  { label: 'Clear sky', icon: '☀' },
    1:  { label: 'Mostly clear', icon: '🌤' },
    2:  { label: 'Partly cloudy', icon: '⛅' },
    3:  { label: 'Overcast', icon: '☁' },
    45: { label: 'Fog', icon: '🌫' },
    48: { label: 'Fog', icon: '🌫' },
    51: { label: 'Light drizzle', icon: '🌦' },
    53: { label: 'Drizzle', icon: '🌦' },
    55: { label: 'Dense drizzle', icon: '🌦' },
    61: { label: 'Light rain', icon: '🌧' },
    63: { label: 'Rain', icon: '🌧' },
    65: { label: 'Heavy rain', icon: '🌧' },
    71: { label: 'Light snow', icon: '🌨' },
    73: { label: 'Snow', icon: '🌨' },
    75: { label: 'Heavy snow', icon: '🌨' },
    80: { label: 'Rain showers', icon: '🌦' },
    81: { label: 'Rain showers', icon: '🌦' },
    82: { label: 'Violent showers', icon: '⛈' },
    95: { label: 'Thunderstorm', icon: '⛈' },
  };

  function describe(code){
    return CODE_MAP[code] || { label: 'Conditions unavailable', icon: '❔' };
  }

  async function fetchWeather(lat, lon, locationLabel){
    try{
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
                  `&current_weather=true&hourly=relativehumidity_2m,precipitation&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather request failed');
      const data = await res.json();

      const current = data.current_weather;
      const info = describe(current.weathercode);

      valueEl.textContent = `${info.icon} ${Math.round(current.temperature)}°`;
      subEl.textContent = locationLabel ? `${locationLabel} · ${info.label}` : info.label;

      let humidity = '—', precipitation = '—';
      if (data.hourly && data.hourly.time){
        const idx = data.hourly.time.indexOf(current.time);
        if (idx !== -1){
          humidity = data.hourly.relativehumidity_2m[idx];
          precipitation = data.hourly.precipitation[idx];
        }
      }
      badgeEl.title = `Weather Widget — Precip ${precipitation} mm · Humidity ${humidity}% · Wind ${Math.round(current.windspeed)} km/h`;
    }catch(err){
      valueEl.textContent = '—';
      subEl.textContent = 'Weather unavailable';
    }
  }

  if (!('geolocation' in navigator)){
    fetchWeather(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon, DEFAULT_LOCATION.name);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, null),
    (err) => {
      // Permission denied or unavailable — briefly reflect that, then fall back to a default city
      if (err.code === err.PERMISSION_DENIED){
        valueEl.textContent = '—';
        subEl.textContent = 'location denied';
      }
      fetchWeather(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon, DEFAULT_LOCATION.name);
    },
    { timeout: 6000 }
  );
}