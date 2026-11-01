(() => {
  const D = window.TRIVIA_DATA;
  const ROUND = 10, TRIVIA_TIME = 20, CAREER_TIME = 30;
  const $ = s => document.querySelector(s);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const LS = { get: k => +(localStorage.getItem("ft_" + k) || 0), set: (k, v) => localStorage.setItem("ft_" + k, v) };
  const ERA_LABEL = { "90s-00s": "ניינטיז/2000", classic: "קלאסי", modern: "מודרני" };

  let era = localStorage.getItem("ft_era") || "all";
  let S = null, timerId = null;

  function show(id) { document.querySelectorAll(".screen").forEach(s => s.classList.toggle("active", s.id === id)); window.scrollTo(0, 0); }
  function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("show"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 1100); }
  function vibrate(p) { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} }
  function confetti() {
    const colors = ["#ffd23f", "#ff6b35", "#2ecc71", "#4dabf7", "#fff"];
    for (let i = 0; i < 40; i++) {
      const c = document.createElement("div"); c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw"; c.style.background = colors[i % colors.length];
      c.style.animationDuration = 1.5 + Math.random() * 1.5 + "s"; c.style.animationDelay = Math.random() * .4 + "s";
      document.body.appendChild(c); setTimeout(() => c.remove(), 3500);
    }
  }

  // ---------- HOME ----------
  function renderHome() {
    document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.era === era));
    $("#modes").innerHTML = D.MODES.map(m => `
      <button class="mode" data-mode="${m.id}" ${m.enabled ? "" : "disabled"}>
        <span class="em">${m.emoji}</span>
        <span><div class="t">${m.title}</div><div class="s">${m.subtitle}</div></span>
        ${m.enabled ? `<span class="best"><b>${LS.get("best_" + m.id)}</b>שיא</span>` : ""}
      </button>`).join("");
    document.querySelectorAll(".mode:not([disabled])").forEach(b => b.onclick = () => start(b.dataset.mode));
  }
  document.querySelectorAll(".chip").forEach(c => c.onclick = () => { era = c.dataset.era; localStorage.setItem("ft_era", era); renderHome(); });

  // ---------- ROUND BUILDERS ----------
  const byEra = arr => era === "all" ? arr : arr.filter(x => x.era === era);

  function careerItems() {
    const pool = shuffle(byEra(D.PLAYERS)).slice(0, ROUND);
    return pool.map(p => {
      // distractors: same group (Israeli / European), prefer same era
      let cands = D.PLAYERS.filter(x => x.id !== p.id && x.group === p.group);
      const sameEra = cands.filter(x => x.era === p.era);
      if (sameEra.length >= 3) cands = sameEra;
      const opts = shuffle([p, ...shuffle(cands).slice(0, 3)]);
      return { type: "career", player: p, options: opts.map(o => o.name), answer: opts.indexOf(p) };
    });
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
    S.locked = false; S.revealed = 1;
    $("#qnum").textContent = `${S.i + 1}/${S.items.length}`;
    $("#progressFill").style.width = (S.i / S.items.length * 100) + "%";
    updateStreak();
    $("#answers").classList.toggle("grid2", it.type === "career");
    $("#answers").innerHTML = it.options.map((o, k) => `<button class="ans" data-k="${k}">${o}</button>`).join("");
    document.querySelectorAll(".ans").forEach(b => b.onclick = () => answer(+b.dataset.k));
    renderCard(); renderActions();
    startTimer(it.type === "career" ? CAREER_TIME : TRIVIA_TIME);
  }

  function careerPoints() { const n = S.items[S.i].player.career.length; return Math.max(20, 100 - Math.round((S.revealed - 1) * (80 / Math.max(1, n - 1)))); }

  function renderCard() {
    const it = S.items[S.i];
    if (it.type === "trivia") {
      $("#card").innerHTML = `<div class="label"><span class="badge">${D.LEAGUES[it.q.league]}</span><span class="badge">${ERA_LABEL[it.q.era]}</span></div>
        <div class="question">${it.q.q}</div>`;
      return;
    }
    const c = it.player.career;
    const rows = c.map((r, k) => k < S.revealed || S.locked
      ? `<li class="club"><span class="n">${k + 1}</span><span>${r[0]}${r[2] ? ' <span class="loan">(השאלה)</span>' : ""}</span><span class="yr">${r[1]}</span></li>`
      : `<li class="club locked"><span class="n">${k + 1}</span><span>???</span><span class="yr">????</span></li>`).join("");
    $("#card").innerHTML = `<div class="label"><span>מי השחקן? ${S.locked ? "" : `· שווה <b>${careerPoints()}</b> נק׳`}</span>
      <span class="badge">${it.player.group === "il" ? "🇮🇱 ישראלי" : "🌍 אירופה"}</span></div><ul class="clubs ${c.length > 11 ? "compact xcompact" : c.length > 7 ? "compact" : ""}">${rows}</ul>`;
  }

  function renderActions() {
    const it = S.items[S.i];
    if (S.locked) {
      $("#actions").innerHTML = `<button class="btn primary" id="nextBtn">${S.i + 1 >= S.items.length ? "לתוצאות 🏁" : "הבא ←"}</button>`;
      $("#nextBtn").onclick = () => { S.i++; next(); };
    } else if (it.type === "career") {
      const left = it.player.career.length - S.revealed;
      $("#actions").innerHTML = `<button class="btn secondary" id="hintBtn" ${left ? "" : "disabled"}>➕ עוד קבוצה (${left})</button>
        <button class="btn secondary" id="allBtn" ${left ? "" : "disabled"}>הצג הכל</button>`;
      $("#hintBtn").onclick = () => { S.revealed++; renderCard(); renderActions(); };
      $("#allBtn").onclick = () => { S.revealed = it.player.career.length; renderCard(); renderActions(); };
    } else $("#actions").innerHTML = "";
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
      toast(`+${gained}${mult > 1 ? ` 🔥x${mult}` : ""}`); vibrate(30);
      if (S.streak === 3 || S.streak === 5) confetti();
    } else { S.streak = 0; vibrate([60, 40, 60]); }
    updateStreak();
    renderCard(); renderActions();
    const fb = document.createElement("div");
    fb.className = "feedback " + (ok ? "good" : "bad");
    fb.textContent = ok ? (it.type === "career" ? `נכון! ${it.player.name} ✅` : "נכון! ✅")
      : (k === -1 ? "⏰ נגמר הזמן! " : "לא נכון. ") + `התשובה: ${it.options[it.answer]}`;
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
      if (S.timeLeft <= 0) { stopTimer(); answer(-1); }
    }, 1000);
  }
  function stopTimer() { clearInterval(timerId); timerId = null; }
  // clear stale feedback when moving on
  const _next = next; next = function () { document.querySelectorAll(".feedback").forEach(f => f.remove()); _next(); };

  function finish() {
    stopTimer(); $("#toast").classList.remove("show");
    $("#progressFill").style.width = "100%";
    const key = "best_" + S.mode, prev = LS.get(key), rec = S.score > prev;
    if (rec) LS.set(key, S.score);
    $("#endScore").textContent = S.score;
    $("#endCorrect").textContent = `${S.correct}/${S.items.length}`;
    $("#endStreak").textContent = S.maxStreak;
    $("#endBest").textContent = Math.max(prev, S.score);
    $("#newRecord").classList.toggle("hidden", !rec || S.score === 0);
    const r = S.correct / S.items.length;
    $("#endEmoji").textContent = r >= .9 ? "🏆" : r >= .6 ? "⚽" : r >= .3 ? "😅" : "🙈";
    $("#endTitle").textContent = r >= .9 ? "אגדה!" : r >= .6 ? "יפה מאוד!" : r >= .3 ? "לא רע!" : "צריך עוד אימונים";
    show("end"); if (rec && S.score > 0) confetti();
  }

  $("#again").onclick = () => start(S.mode);
  $("#homeBtn").onclick = () => { renderHome(); show("home"); };
  $("#quit").onclick = () => { if (confirm("לצאת מהסבב?")) { stopTimer(); renderHome(); show("home"); } };

  renderHome();
  // expose for testing
  window.__ft = { start, answer, get state() { return S; } };
})();
