(() => {
  const D = window.TRIVIA_DATA;
  const ROUND = 10, TRIVIA_TIME = 20, CAREER_TIME = 30;
  const $ = s => document.querySelector(s);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const LS = { get: k => +(localStorage.getItem("ft_" + k) || 0), set: (k, v) => localStorage.setItem("ft_" + k, v) };
  const ERA_LABEL = { "90s-00s": "ניינטיז/2000", classic: "קלאסי", modern: "מודרני" };
  const FINALS = { "ך": "כ", "ם": "מ", "ן": "נ", "ף": "פ", "ץ": "צ" };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = s => (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u0591-\u05C7]/g, "").replace(/[׳״'`´’‘"“”]/g, "").replace(/[-–—\s\u05BE]/g, "").replace(/[ךםןףץ]/g, ch => FINALS[ch]).toLowerCase();
  const POOL = (window.PLAYER_POOL || []).map(p => ({
    id: p.id || "",
    he: p.he,
    en: p.en || "",
    aka: p.aka || [],
    keys: [p.he, p.en].concat(p.aka || []).map(norm).filter(Boolean)
  }));
  const byId = new Map(POOL.filter(p => p.id).map(p => [p.id, p]));

  let era = localStorage.getItem("ft_era") || "all";
  let S = null, timerId = null;

  function show(id) {
    document.querySelectorAll(".confetti").forEach(c => c.remove());
    document.querySelectorAll(".screen").forEach(s => s.classList.toggle("active", s.id === id));
    window.scrollTo(0, 0);
  }
  function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("show"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 1100); }
  function vibrate(p) { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} }
  function confetti() {
    const colors = ["#d6f25c", "#f4f2ec", "#0c5a32", "#c5cad3"];
    for (let i = 0; i < 22; i++) {
      const c = document.createElement("div"); c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw"; c.style.background = colors[i % colors.length];
      c.style.animationDuration = 1.05 + Math.random() * 0.55 + "s"; c.style.animationDelay = Math.random() * .15 + "s";
      document.body.appendChild(c); setTimeout(() => c.remove(), 3500);
    }
  }

  // ---------- HOME ----------
  const ICONS = {
    career: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17.5V8.2"/><path d="M4 17.5h16"/><path d="M4 8.2c2.4 2.2 3.6 3 5.4 3 2.5 0 3.1-2.7 5.4-2.7 1.7 0 2.9.7 5.2 2.2"/><circle cx="4" cy="8.2" r="1.25"/><circle cx="9.4" cy="11.2" r="1.25"/><circle cx="14.8" cy="8.5" r="1.25"/><circle cx="20" cy="10.7" r="1.25"/></svg>',
    trivia: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10M7 12h10M7 17h6"/></svg>',
    crest: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5 19 6.2v5.4c0 4.2-2.8 6.7-7 8.9-4.2-2.2-7-4.7-7-8.9V6.2L12 3.5z"/></svg>'
  };

  function renderHome() {
    document.querySelectorAll(".chip").forEach(c => {
      const on = c.dataset.era === era;
      c.classList.toggle("active", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
    $("#modes").innerHTML = D.MODES.map(m => `
      <button class="mode" type="button" data-mode="${m.id}" ${m.enabled ? "" : "disabled"}>
        <span class="em" aria-hidden="true">${ICONS[m.id] || ""}</span>
        <span class="copy"><span class="t">${m.title}</span><span class="s">${m.subtitle}</span></span>
        ${m.enabled ? `<span class="best"><b>${LS.get("best_" + m.id)}</b>שיא</span>` : ""}
      </button>`).join("");
    document.querySelectorAll(".mode:not([disabled])").forEach(b => b.onclick = () => start(b.dataset.mode));
  }
  document.querySelectorAll(".chip").forEach(c => c.onclick = () => { era = c.dataset.era; localStorage.setItem("ft_era", era); renderHome(); });

  // ---------- ROUND BUILDERS ----------
  const byEra = arr => era === "all" ? arr : arr.filter(x => x.era === era);

  function careerItems() {
    return shuffle(byEra(D.PLAYERS)).slice(0, ROUND).map(p => ({ type: "career", player: p }));
  }
  function searchPool(q) {
    const n = norm(q);
    if (!n) return [];
    const hits = [];
    for (const p of POOL) {
      let rank = 0;
      for (const k of p.keys) {
        if (k.startsWith(n)) rank = Math.max(rank, 3);
        else if (k.includes(n)) rank = Math.max(rank, 1);
      }
      if (rank) hits.push({ p, rank, len: p.he.length });
    }
    hits.sort((a, b) => b.rank - a.rank || a.len - b.len || a.p.he.localeCompare(b.p.he, "he"));
    const missed = new Set((S && S.misses || []).map(m => m.he));
    return hits.map(h => h.p).filter(p => !missed.has(p.he)).slice(0, 8);
  }
  function isAnswerEntry(entry, player) {
    if (entry.id && entry.id === player.id) return true;
    const n = norm(player.name);
    return norm(entry.he) === n || entry.aka.some(a => norm(a) === n);
  }
  function triviaItems() {
    return shuffle(byEra(D.QUESTIONS)).slice(0, ROUND).map(q => {
      const idx = shuffle([0, 1, 2, 3]);
      return { type: "trivia", q, options: idx.map(i => q.o[i]), answer: idx.indexOf(q.a) };
    });
  }

  // ---------- GAME ----------
  function start(mode) {
    const items = mode === "career" ? careerItems() : triviaItems();
    S = { mode, items, i: 0, score: 0, correct: 0, streak: 0, maxStreak: 0 };
    $("#score").textContent = 0;
    show("game"); next();
  }

  function next() {
    stopTimer();
    if (S.i >= S.items.length) return finish();
    const it = S.items[S.i];
    S.locked = false; S.revealed = 1; S.misses = []; S.hi = 0;
    $("#qnum").textContent = `${S.i + 1}/${S.items.length}`;
    $("#progressFill").style.width = (S.i / S.items.length * 100) + "%";
    const bar = document.querySelector(".progress");
    if (bar) {
      bar.setAttribute("aria-valuenow", String(S.i));
      bar.setAttribute("aria-valuemax", String(S.items.length));
    }
    updateStreak();
    $("#answers").classList.toggle("grid2", false);
    $("#answers").classList.toggle("guess-mode", it.type === "career");
    if (it.type === "trivia") {
      $("#answers").innerHTML = it.options.map((o, k) => `<button class="ans" type="button" data-k="${k}">${o}</button>`).join("");
      document.querySelectorAll(".ans").forEach(b => b.onclick = () => answer(+b.dataset.k));
    } else $("#answers").innerHTML = "";
    renderCard(); renderActions();
    startTimer(it.type === "career" ? CAREER_TIME : TRIVIA_TIME);
  }

  function careerPoints() { const n = S.items[S.i].player.career.length; return Math.max(20, 100 - Math.round((S.revealed - 1) * (80 / Math.max(1, n - 1)))); }

  function renderCard() {
    const it = S.items[S.i];
    if (it.type === "trivia") {
      $("#card").innerHTML = `<div class="lower"><h2 class="question">${it.q.q}</h2></div>
        <div class="meta"><span>${D.LEAGUES[it.q.league]}</span><span>${ERA_LABEL[it.q.era]}</span></div>`;
      return;
    }
    const c = it.player.career;
    const rows = c.map((r, k) => k < S.revealed || S.locked
      ? `<li class="club"><span class="n">${k + 1}</span><span class="who">${r[0]}${r[2] ? ' <span class="loan">(השאלה)</span>' : ""}</span><span class="yr">${r[1]}</span></li>`
      : `<li class="club locked"><span class="n">${k + 1}</span><span class="who">???</span><span class="yr">????</span></li>`).join("");
    const misses = (S.misses || []).map(m => `<li>${esc(m.he)}</li>`).join("");
    $("#card").innerHTML = `<div class="lower"><div class="lower-row"><h2 class="question">מי השחקן?</h2>${S.locked ? "" : `<p class="worth">שווה <b>${careerPoints()}</b> נק׳</p>`}</div></div>
      <div class="meta"><span>${it.player.group === "il" ? "ישראלי" : "אירופה"}</span></div><ul class="clubs ${c.length > 11 ? "compact xcompact" : c.length > 7 ? "compact" : ""}">${rows}</ul>${misses ? `<ul class="misses">${misses}</ul>` : ""}`;
  }

  function renderGuess() {
    const box = $("#answers");
    box.classList.add("guess-mode");
    box.innerHTML = `<div class="guess"><p class="guess-worth">שווה <b>${careerPoints()}</b> נק׳</p><div class="guess-box"><ul class="guess-menu" id="guessMenu" role="listbox" hidden></ul><input id="guessInput" class="guess-input" type="text" enterkeyhint="go" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="הקלידו שם, ובחרו מהרשימה" aria-label="שם השחקן" aria-autocomplete="list" aria-controls="guessMenu" aria-expanded="false"></div></div>`;
    const input = $("#guessInput");
    const menu = $("#guessMenu");
    const paint = () => {
      const hits = searchPool(input.value);
      S.hi = Math.min(S.hi, Math.max(0, hits.length - 1));
      menu.hidden = !input.value.trim();
      input.setAttribute("aria-expanded", menu.hidden ? "false" : "true");
      if (!hits.length) {
        menu.innerHTML = `<li class="opt-empty" role="presentation">אין שם תואם</li>`;
        return;
      }
      menu.innerHTML = hits.map((p, i) => `<li role="presentation"><button type="button" class="opt${i === S.hi ? " on" : ""}" role="option" data-i="${i}" aria-selected="${i === S.hi ? "true" : "false"}"><span class="opt-he">${esc(p.he)}</span>${p.en ? `<span class="opt-en">${esc(p.en)}</span>` : ""}</button></li>`).join("");
      menu.querySelectorAll(".opt").forEach(b => {
        b.addEventListener("pointerdown", e => { e.preventDefault(); chooseGuess(hits[+b.dataset.i]); });
      });
    };
    input.addEventListener("input", () => { S.hi = 0; paint(); });
    input.addEventListener("keydown", e => {
      const hits = searchPool(input.value);
      if (e.key === "ArrowDown") { e.preventDefault(); S.hi = Math.min(hits.length - 1, S.hi + 1); paint(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); S.hi = Math.max(0, S.hi - 1); paint(); }
      else if (e.key === "Enter") { e.preventDefault(); if (hits.length) chooseGuess(hits[S.hi] || hits[0]); }
      else if (e.key === "Escape") { menu.hidden = true; input.setAttribute("aria-expanded", "false"); }
    });
    bindKeyboard(input);
    input.focus();
  }

  let kbBound = false;
  function bindKeyboard(input) {
    const vv = window.visualViewport;
    if (!vv) return;
    const app = document.getElementById("app");
    const sync = () => {
      app.style.height = Math.round(vv.height) + "px";
      app.style.transform = vv.offsetTop ? `translateY(${Math.round(vv.offsetTop)}px)` : "";
    };
    const reset = () => { app.style.height = ""; app.style.transform = ""; };
    if (!kbBound) {
      vv.addEventListener("resize", sync);
      vv.addEventListener("scroll", sync);
      kbBound = true;
    }
    input.addEventListener("focus", sync);
    input.addEventListener("blur", () => setTimeout(reset, 120));
  }

  function chooseGuess(entry) {
    if (!S || S.locked || !entry) return;
    const it = S.items[S.i];
    if (it.type !== "career") return;
    if ((S.misses || []).some(m => m.he === entry.he)) return;
    if (isAnswerEntry(entry, it.player)) return scoreCareer(true);
    S.misses.push(entry);
    S.revealed++;
    if (S.revealed >= it.player.career.length) return scoreCareer(false, "לא נכון. ");
    vibrate([40, 30, 40]);
    renderCard();
    renderActions();
  }

  function renderActions() {
    const it = S.items[S.i];
    if (S.locked) {
      $("#actions").innerHTML = `<button class="btn primary" type="button" id="nextBtn">${S.i + 1 >= S.items.length ? "לתוצאות" : "הבא"}</button>`;
      $("#nextBtn").onclick = () => { S.i++; next(); };
    } else if (it.type === "career") {
      const left = it.player.career.length - S.revealed;
      renderGuess();
      $("#actions").innerHTML = `<button class="btn secondary" type="button" id="hintBtn" ${left ? "" : "disabled"}>רמז נוסף${left ? ` (${left})` : ""}</button>
        <button class="btn secondary" type="button" id="giveBtn">ויתור</button>`;
      $("#hintBtn").onclick = () => {
        if (!left) return;
        S.revealed++;
        if (S.revealed >= it.player.career.length) scoreCareer(false, "נגמרו הקבוצות. ");
        else { renderCard(); renderActions(); }
      };
      $("#giveBtn").onclick = () => scoreCareer(false, "ויתור. ");
    } else $("#actions").innerHTML = "";
  }

  function award(base) {
    S.correct++; S.streak++; S.maxStreak = Math.max(S.maxStreak, S.streak);
    const mult = S.streak >= 5 ? 1.5 : S.streak >= 3 ? 1.2 : 1;
    const gained = Math.round(base * mult);
    S.score += gained;
    $("#score").textContent = S.score;
    const pill = $(".score-pill"); pill.classList.remove("pop"); void pill.offsetWidth; pill.classList.add("pop");
    toast(`+${gained}${mult > 1 ? ` ×${mult}` : ""}`); vibrate(30);
    if (S.streak === 3 || S.streak === 5) confetti();
    return gained;
  }

  function scoreCareer(ok, reason) {
    if (S.locked) return;
    const it = S.items[S.i];
    const base = ok ? careerPoints() : 0;
    S.locked = true; S.revealed = it.player.career.length; stopTimer();
    $("#answers").classList.remove("guess-mode");
    $("#answers").innerHTML = "";
    if (ok) award(base); else { S.streak = 0; vibrate([60, 40, 60]); }
    updateStreak();
    renderCard(); renderActions();
    const fb = document.createElement("div");
    fb.className = "feedback " + (ok ? "good" : "bad");
    fb.setAttribute("role", "status");
    fb.textContent = ok ? `נכון! ${it.player.name}` : `${reason || "לא נכון. "}התשובה: ${it.player.name}`;
    $("#actions").before(fb);
    setTimeout(() => { const nb = $("#nextBtn"); if (nb) nb.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 250);
  }

  function answer(k) {
    if (S.locked) return;
    S.locked = true; stopTimer();
    const it = S.items[S.i], ok = k === it.answer;
    document.querySelectorAll(".ans").forEach((b, j) => {
      b.disabled = true;
      if (j === it.answer) b.classList.add("correct"); else if (j === k) b.classList.add("wrong"); else b.classList.add("dim");
    });
    let gained = 0;
    if (ok) {
      S.correct++; S.streak++; S.maxStreak = Math.max(S.maxStreak, S.streak);
      const base = it.type === "career" ? careerPoints() : 50 + Math.round(50 * S.timeLeft / TRIVIA_TIME);
      const mult = S.streak >= 5 ? 1.5 : S.streak >= 3 ? 1.2 : 1;
      gained = Math.round(base * mult);
      S.score += gained;
      $("#score").textContent = S.score;
      const pill = $(".score-pill"); pill.classList.remove("pop"); void pill.offsetWidth; pill.classList.add("pop");
      toast(`+${gained}${mult > 1 ? ` ×${mult}` : ""}`); vibrate(30);
      if (S.streak === 3 || S.streak === 5) confetti();
    } else { S.streak = 0; vibrate([60, 40, 60]); }
    updateStreak();
    renderCard(); renderActions();
    const fb = document.createElement("div");
    fb.className = "feedback " + (ok ? "good" : "bad");
    fb.setAttribute("role", "status");
    fb.textContent = ok ? (it.type === "career" ? `נכון! ${it.player.name}` : "נכון!")
      : (k === -1 ? "נגמר הזמן. " : "לא נכון. ") + `התשובה: ${it.options[it.answer]}`;
    $("#actions").before(fb);
    setTimeout(() => { const nb = $("#nextBtn"); if (nb) nb.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 250);
  }

  function updateStreak() {
    const el = $("#streak"); el.classList.toggle("hidden", S.streak < 2); el.querySelector("b").textContent = S.streak;
  }

  function startTimer(sec) {
    S.timeLeft = sec; const el = $("#timer"); el.textContent = sec; el.classList.remove("low");
    timerId = setInterval(() => {
      S.timeLeft--; el.textContent = S.timeLeft; el.classList.toggle("low", S.timeLeft <= 5);
      if (S.timeLeft <= 0) { stopTimer(); if (S.items[S.i].type === "career") scoreCareer(false, "נגמר הזמן. "); else answer(-1); }
    }, 1000);
  }
  function stopTimer() { clearInterval(timerId); timerId = null; }
  // clear stale feedback when moving on
  const _next = next; next = function () { document.querySelectorAll(".feedback").forEach(f => f.remove()); _next(); };

  function finish() {
    stopTimer(); $("#toast").classList.remove("show");
    $("#progressFill").style.width = "100%";
    const bar = document.querySelector(".progress");
    if (bar) bar.setAttribute("aria-valuenow", String(S.items.length));
    const key = "best_" + S.mode, prev = LS.get(key), rec = S.score > prev;
    if (rec) LS.set(key, S.score);
    $("#endScore").textContent = S.score;
    $("#endCorrect").textContent = `${S.correct}/${S.items.length}`;
    $("#endStreak").textContent = S.maxStreak;
    $("#endBest").textContent = Math.max(prev, S.score);
    $("#newRecord").classList.toggle("hidden", !rec || S.score === 0);
    const r = S.correct / S.items.length;
    $("#endTitle").textContent = r >= .9 ? "אגדה!" : r >= .6 ? "יפה מאוד!" : r >= .3 ? "לא רע!" : "צריך עוד אימונים";
    show("end"); if (rec && S.score > 0) confetti();
  }

  $("#again").onclick = () => start(S.mode);
  $("#homeBtn").onclick = () => { renderHome(); show("home"); };
  $("#quit").onclick = () => { if (confirm("לצאת מהסבב?")) { stopTimer(); renderHome(); show("home"); } };

  renderHome();
  // expose for testing
  window.__ft = { start, answer, choose: chooseGuess, search: searchPool, get state() { return S; } };
})();
