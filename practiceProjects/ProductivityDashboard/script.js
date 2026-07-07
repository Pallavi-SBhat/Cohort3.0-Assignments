
const Nav = (() => {
  const dashboard   = document.getElementById('dashboard');
  const featureView = document.getElementById('feature-view');
  const panels      = document.querySelectorAll('.feature-panel');

  let activeFeature = null;  
  let isSwitching   = false; 

  function openFeature(name) {

    if (isSwitching) return;
  
    if (activeFeature === name) return;

    const targetPanel = document.querySelector(`.feature-panel[data-panel="${name}"]`);
    if (!targetPanel) return; // unknown feature name, nothing to do

    isSwitching = true;

    panels.forEach(p => p.classList.remove('is-active'));
    targetPanel.classList.add('is-active');

    dashboard.classList.remove('is-active');
    featureView.classList.add('is-active');

    activeFeature = name;

    window.setTimeout(() => { isSwitching = false; }, 220);

 
    document.dispatchEvent(new CustomEvent('feature:open', { detail: { name } }));
  }

  function goBack() {
    if (isSwitching) return;
    if (activeFeature === null) return;

    isSwitching = true;

    featureView.classList.remove('is-active');
    dashboard.classList.add('is-active');
    activeFeature = null;

    window.setTimeout(() => { isSwitching = false; }, 220);
  }

  function init() {
    document.querySelectorAll('.card[data-feature]').forEach(card => {
      card.addEventListener('click', () => openFeature(card.dataset.feature));
    });
    document.querySelectorAll('[data-action="back"]').forEach(btn => {
      btn.addEventListener('click', goBack);
    });
  }

  return { init, openFeature, goBack };
})();


const ClockWidget = (() => {
  const timeEl = document.getElementById('clock-time');
  const dateEl = document.getElementById('clock-date');

  function tick() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    dateEl.textContent = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
  }

  function init() {
    tick();
    setInterval(tick, 1000);
  }
  return { init };
})();

const WeatherWidget = (() => {
  const tempEl  = document.getElementById('weather-temp');
  const placeEl = document.getElementById('weather-place');

  const codeLabel = (code) => {
    if (code === 0) return 'Clear';
    if ([1, 2, 3].includes(code)) return 'Cloudy';
    if ([45, 48].includes(code)) return 'Foggy';
    if (code >= 51 && code <= 67) return 'Rainy';
    if (code >= 71 && code <= 77) return 'Snowy';
    if (code >= 80 && code <= 82) return 'Showers';
    if (code >= 95) return 'Stormy';
    return 'Mild';
  };

  async function fetchWeather(lat, lon) {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
      const res = await fetch(url);
      const data = await res.json();
      const c = data.current;
      tempEl.textContent = `${Math.round(c.temperature_2m)}°C`;
      placeEl.textContent = codeLabel(c.weather_code);
    } catch (err) {
      tempEl.textContent = '—';
      placeEl.textContent = 'unavailable';
    }
  }

  function init() {
    if (!('geolocation' in navigator)) {
      tempEl.textContent = '—';
      placeEl.textContent = 'no location access';
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => {
        tempEl.textContent = '—';
        placeEl.textContent = 'location denied';
      },
      { timeout: 6000 }
    );
  }
  return { init };
})();

const Store = {
  load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
    }
  }
};


const TodoFeature = (() => {
  const KEY = 'daybase.todos';
  let todos = Store.load(KEY, []);

  const form   = document.getElementById('todo-form');
  const input  = document.getElementById('todo-input');
  const list   = document.getElementById('todo-list');
  const empty  = document.getElementById('todo-empty');
  const count  = document.getElementById('todo-count');

  function render() {
    list.innerHTML = '';
    todos.forEach(t => {
      const li = document.createElement('li');
      li.className = 'item' + (t.done ? ' is-done' : '');
      li.innerHTML = `
        <button class="item__check" data-id="${t.id}" aria-label="Toggle complete"></button>
        <span class="item__text">${escapeHtml(t.text)}</span>
        <button class="item__del" data-id="${t.id}" aria-label="Delete task">✕</button>
      `;
      list.appendChild(li);
    });
    const openCount = todos.filter(t => !t.done).length;
    count.textContent = `${openCount} open`;
    empty.classList.toggle('is-visible', todos.length === 0);
  }

  function addTodo(text) {
    todos.push({ id: crypto.randomUUID(), text, done: false });
    Store.save(KEY, todos);
    render();
  }

  function toggleTodo(id) {
    const t = todos.find(t => t.id === id);
    if (t) { t.done = !t.done; Store.save(KEY, todos); render(); }
  }

  function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    Store.save(KEY, todos);
    render();
  }

  function init() {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      addTodo(text);
      input.value = '';
      input.focus();
    });

    list.addEventListener('click', (e) => {
      const checkBtn = e.target.closest('.item__check');
      const delBtn   = e.target.closest('.item__del');
      if (checkBtn) toggleTodo(checkBtn.dataset.id);
      if (delBtn) deleteTodo(delBtn.dataset.id);
    });

    render();
  }
  return { init };
})();


const PlannerFeature = (() => {
  const KEY = 'daybase.planner';
  let blocks = Store.load(KEY, []); // [{id, time, text}]

  const form    = document.getElementById('planner-form');
  const timeIn  = document.getElementById('planner-time');
  const textIn  = document.getElementById('planner-input');
  const list    = document.getElementById('planner-list');
  const empty   = document.getElementById('planner-empty');
  const dateEl  = document.getElementById('planner-date');

  function render() {
    const sorted = [...blocks].sort((a, b) => a.time.localeCompare(b.time));
    list.innerHTML = '';
    sorted.forEach(b => {
      const li = document.createElement('li');
      li.className = 'item';
      li.innerHTML = `
        <span class="item__time">${b.time}</span>
        <span class="item__text">${escapeHtml(b.text)}</span>
        <button class="item__del" data-id="${b.id}" aria-label="Remove block">✕</button>
      `;
      list.appendChild(li);
    });
    empty.classList.toggle('is-visible', blocks.length === 0);
    dateEl.textContent = new Date().toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function addBlock(time, text) {
    blocks.push({ id: crypto.randomUUID(), time, text });
    Store.save(KEY, blocks);
    render();
  }

  function deleteBlock(id) {
    blocks = blocks.filter(b => b.id !== id);
    Store.save(KEY, blocks);
    render();
  }

  function init() {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!timeIn.value || !textIn.value.trim()) return;
      addBlock(timeIn.value, textIn.value.trim());
      textIn.value = '';
      textIn.focus();
    });

    list.addEventListener('click', (e) => {
      const delBtn = e.target.closest('.item__del');
      if (delBtn) deleteBlock(delBtn.dataset.id);
    });

    render();
  }
  return { init, render };
})();

const MotivationFeature = (() => {
  const FAV_KEY = 'daybase.favorites';
  let favorites = Store.load(FAV_KEY, []); // [{id, text}]

  const sparks = [
    "Small steps, repeated daily, outrun big plans made once.",
    "You don't need to feel ready. You need to begin.",
    "Discipline is just a promise you keep to yourself.",
    "Progress hides inside the boring middle part.",
    "The task shrinks the moment you start it.",
    "Done today beats perfect someday.",
    "Momentum is built, one finished thing at a time.",
    "Your focus is a resource — spend it on purpose.",
    "Rest is part of the work, not a break from it.",
    "Every expert was once a beginner who didn't quit.",
    "Clarity comes from action, not from more thinking.",
    "Consistency turns effort into identity."
  ];

  let currentText = '';

  const textEl = document.getElementById('quote-text');
  const nextBtn = document.getElementById('quote-next');
  const favBtn  = document.getElementById('quote-fav');
  const favList = document.getElementById('favs-list');
  const favEmpty = document.getElementById('favs-empty');

  function pickNew() {
    let candidate = currentText;
    while (candidate === currentText && sparks.length > 1) {
      candidate = sparks[Math.floor(Math.random() * sparks.length)];
    }
    currentText = candidate;
    textEl.textContent = `"${currentText}"`;
    favBtn.setAttribute('aria-pressed', String(favorites.some(f => f.text === currentText)));
  }

  function toggleFavorite() {
    const already = favorites.find(f => f.text === currentText);
    if (already) {
      favorites = favorites.filter(f => f.text !== currentText);
    } else {
      favorites.push({ id: crypto.randomUUID(), text: currentText });
    }
    Store.save(FAV_KEY, favorites);
    favBtn.setAttribute('aria-pressed', String(!already));
    renderFavorites();
  }

  function renderFavorites() {
    favList.innerHTML = '';
    favorites.forEach(f => {
      const li = document.createElement('li');
      li.className = 'item';
      li.innerHTML = `
        <span class="item__text">"${escapeHtml(f.text)}"</span>
        <button class="item__del" data-id="${f.id}" aria-label="Remove favorite">✕</button>
      `;
      favList.appendChild(li);
    });
    favEmpty.classList.toggle('is-visible', favorites.length === 0);
  }

  function init() {
    nextBtn.addEventListener('click', pickNew);
    favBtn.addEventListener('click', toggleFavorite);
    favList.addEventListener('click', (e) => {
      const delBtn = e.target.closest('.item__del');
      if (!delBtn) return;
      favorites = favorites.filter(f => f.id !== delBtn.dataset.id);
      Store.save(FAV_KEY, favorites);
      favBtn.setAttribute('aria-pressed', String(favorites.some(f => f.text === currentText)));
      renderFavorites();
    });

    pickNew();
    renderFavorites();
  }
  return { init };
})();


const PomodoroFeature = (() => {
  const SESSIONS_KEY = 'daybase.pomo.sessions';
  const RING_CIRCUMFERENCE = 2 * Math.PI * 88; 

  let workMinutes  = 25;
  let breakMinutes = 5;
  let remaining    = workMinutes * 60;
  let mode         = 'Focus';         
  let timerId      = null;             
  let todaySessions = loadTodaySessions();

  const timeEl     = document.getElementById('pomo-time');
  const modeEl     = document.getElementById('pomo-mode');
  const startBtn   = document.getElementById('pomo-start');
  const resetBtn   = document.getElementById('pomo-reset');
  const progressEl = document.getElementById('pomo-progress');
  const sessionsEl = document.getElementById('pomo-sessions');
  const workInput  = document.getElementById('pomo-work');
  const breakInput = document.getElementById('pomo-break');

  function loadTodaySessions() {
    const rec = Store.load(SESSIONS_KEY, { date: '', count: 0 });
    const today = new Date().toDateString();
    if (rec.date !== today) return 0; 
    return rec.count;
  }

  function saveTodaySessions() {
    Store.save(SESSIONS_KEY, { date: new Date().toDateString(), count: todaySessions });
  }

  function format(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function renderTime() {
    timeEl.textContent = format(remaining);
    modeEl.textContent = mode;
    const total = (mode === 'Focus' ? workMinutes : breakMinutes) * 60;
    const fraction = total > 0 ? remaining / total : 0;
    progressEl.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - fraction);
    progressEl.style.stroke = mode === 'Focus' ? 'var(--accent)' : 'var(--mint)';
    sessionsEl.textContent = `${todaySessions} session${todaySessions === 1 ? '' : 's'} today`;
  }

  function switchPhase() {
    if (mode === 'Focus') {
      todaySessions += 1;
      saveTodaySessions();
      mode = 'Break';
      remaining = breakMinutes * 60;
    } else {
      mode = 'Focus';
      remaining = workMinutes * 60;
    }
    renderTime();
  }

  function tick() {
    remaining -= 1;
    if (remaining <= 0) {
      switchPhase();
    } else {
      renderTime();
    }
  }

  function start() {
    if (timerId) return; 
    timerId = setInterval(tick, 1000);
    startBtn.textContent = 'Pause';
  }

  function pause() {
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = 'Start';
  }

  function reset() {
    pause();
    mode = 'Focus';
    workMinutes  = Math.min(90, Math.max(1, Number(workInput.value) || 25));
    breakMinutes = Math.min(30, Math.max(1, Number(breakInput.value) || 5));
    remaining = workMinutes * 60;
    renderTime();
  }

  function init() {
    progressEl.style.strokeDasharray = RING_CIRCUMFERENCE;

    startBtn.addEventListener('click', () => (timerId ? pause() : start()));
    resetBtn.addEventListener('click', reset);
    workInput.addEventListener('change', () => { if (!timerId) reset(); });
    breakInput.addEventListener('change', () => { if (!timerId) reset(); });

    renderTime();
  }
  return { init };
})();

const GoalsFeature = (() => {
  const KEY = 'daybase.goals';
  let goals = Store.load(KEY, []); 

  const form  = document.getElementById('goals-form');
  const input = document.getElementById('goals-input');
  const list  = document.getElementById('goals-list');
  const empty = document.getElementById('goals-empty');
  const count = document.getElementById('goals-count');

  function render() {
    list.innerHTML = '';
    goals.forEach(g => {
      const li = document.createElement('li');
      li.className = 'goal-item' + (g.done ? ' is-done' : '');
      li.innerHTML = `
        <div class="goal-item__top">
          <span class="goal-item__name">${escapeHtml(g.text)}</span>
          <span class="goal-item__pct">${g.progress}%</span>
        </div>
        <input type="range" min="0" max="100" step="5" value="${g.progress}" data-id="${g.id}" ${g.done ? 'disabled' : ''}>
        <div class="goal-item__actions">
          <button data-action="done" data-id="${g.id}">${g.done ? 'Reopen' : 'Mark complete'}</button>
          <button data-action="delete" data-id="${g.id}">Delete</button>
        </div>
      `;
      list.appendChild(li);
    });
    count.textContent = `${goals.filter(g => !g.done).length} in progress`;
    empty.classList.toggle('is-visible', goals.length === 0);
  }

  function addGoal(text) {
    goals.push({ id: crypto.randomUUID(), text, progress: 0, done: false });
    Store.save(KEY, goals);
    render();
  }

  function updateProgress(id, value) {
    const g = goals.find(g => g.id === id);
    if (!g) return;
    g.progress = Number(value);
    if (g.progress >= 100) g.done = true;
    Store.save(KEY, goals);
    render();
  }

  function toggleDone(id) {
    const g = goals.find(g => g.id === id);
    if (!g) return;
    g.done = !g.done;
    if (g.done) g.progress = 100;
    Store.save(KEY, goals);
    render();
  }

  function deleteGoal(id) {
    goals = goals.filter(g => g.id !== id);
    Store.save(KEY, goals);
    render();
  }

  function init() {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      addGoal(text);
      input.value = '';
      input.focus();
    });

    list.addEventListener('input', (e) => {
      if (e.target.matches('input[type="range"]')) {
        updateProgress(e.target.dataset.id, e.target.value);
      }
    });

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      if (btn.dataset.action === 'done') toggleDone(btn.dataset.id);
      if (btn.dataset.action === 'delete') deleteGoal(btn.dataset.id);
    });

    render();
  }
  return { init };
})();

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener('feature:open', (e) => {
  if (e.detail.name === 'planner') PlannerFeature.render();
});

document.addEventListener('DOMContentLoaded', () => {
  Nav.init();
  ClockWidget.init();
  WeatherWidget.init();
  TodoFeature.init();
  PlannerFeature.init();
  MotivationFeature.init();
  PomodoroFeature.init();
  GoalsFeature.init();
});