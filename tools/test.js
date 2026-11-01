const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--lang=he']});
  const p = await b.newPage();
  await p.setViewport({width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true});
  await p.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1');
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  const url = process.argv[2]||'http://localhost:8787/';
  await p.goto(url,{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,600));
  await p.screenshot({path:'/workspace/shot-1-home.png'});
  // career mode
  await p.click('.mode[data-mode=career]'); await new Promise(r=>setTimeout(r,500));
  if (await p.$('#hintBtn')) { await p.click('#hintBtn'); await p.click('#hintBtn'); }
  await new Promise(r=>setTimeout(r,500));
  await p.screenshot({path:'/workspace/shot-2-career.png'});
  // answer correctly by picking the player from the pool
  await p.evaluate(() => {
    if (__ft.state.locked) return;
    const id = __ft.state.items[__ft.state.i].player.id;
    __ft.choose(window.PLAYER_POOL.find(x => x.id === id));
  });
  await new Promise(r=>setTimeout(r,400));
  await p.screenshot({path:'/workspace/shot-3-career-answered.png'});
  // play through rest quickly
  for(let i=1;i<10;i++){
    await p.click('#nextBtn');
    await p.evaluate((give) => {
      if (__ft.state.locked) return;
      if (give) { document.querySelector('#giveBtn').click(); return; }
      const id = __ft.state.items[__ft.state.i].player.id;
      __ft.choose(window.PLAYER_POOL.find(x => x.id === id));
    }, i % 3 === 0);
  }
  await p.click('#nextBtn'); await new Promise(r=>setTimeout(r,800));
  await p.screenshot({path:'/workspace/shot-5-end.png'});
  // trivia mode
  await p.click('#homeBtn'); await new Promise(r=>setTimeout(r,300));
  await p.click('.mode[data-mode=trivia]'); await new Promise(r=>setTimeout(r,500));
  await p.click('.ans[data-k="0"]'); await new Promise(r=>setTimeout(r,900));
  await p.screenshot({path:'/workspace/shot-4-trivia.png'});
  const best = await p.evaluate(()=>localStorage.getItem('ft_best_career'));
  const overflow = await p.evaluate(()=>document.documentElement.scrollHeight);
  console.log('errors',errs,'best',best,'scrollH',overflow);

  const kb = await b.newPage();
  await kb.evaluateOnNewDocument(() => {
    const bus = new EventTarget();
    const state = { width: 390, height: 844, offsetTop: 0, offsetLeft: 0, pageTop: 0, pageLeft: 0, scale: 1 };
    const vv = {
      get width() { return state.width; },
      get height() { return state.height; },
      get offsetTop() { return state.offsetTop; },
      get offsetLeft() { return state.offsetLeft; },
      get pageTop() { return state.pageTop; },
      get pageLeft() { return state.pageLeft; },
      get scale() { return state.scale; },
      addEventListener: (...args) => bus.addEventListener(...args),
      removeEventListener: (...args) => bus.removeEventListener(...args),
      dispatchEvent: (...args) => bus.dispatchEvent(...args)
    };
    window.__setVV = patch => {
      Object.assign(state, patch);
      bus.dispatchEvent(new Event('resize'));
      bus.dispatchEvent(new Event('scroll'));
    };
    Object.defineProperty(window, 'visualViewport', { configurable: true, get: () => vv });
  });
  await kb.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await kb.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1');
  await kb.goto(url, { waitUntil: 'networkidle0' });
  await kb.click('.mode[data-mode=career]');
  await kb.waitForSelector('#guessInput');
  await kb.evaluate(() => {
    const player = window.TRIVIA_DATA.PLAYERS.find(p => p.career.length >= 10);
    __ft.state.items[0] = { type: "career", player };
    __ft.state.i = 0;
    __ft.next();
  });
  for (let n = 0; n < 4; n++) await kb.click('#hintBtn');
  const query = await kb.evaluate(() => ['ר', 'מ', 'א', 'ב', 'ד', 'ס', 'י', 'ו'].find(ch => __ft.search(ch).length >= 4) || 'א');
  await kb.evaluate(() => window.__setVV({ width: 390, height: 508, offsetTop: 0 }));
  await kb.focus('#guessInput');
  await kb.type('#guessInput', query);
  await kb.evaluate(() => window.__setVV({ width: 390, height: 508, offsetTop: 72 }));
  const followed = await kb.evaluate(() => document.getElementById('app').style.top);
  await kb.evaluate(() => window.__setVV({ width: 390, height: 508, offsetTop: 0 }));
  await new Promise(r => setTimeout(r, 80));
  const metrics = await kb.evaluate(() => {
    const rect = el => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height, width: r.width };
    };
    const overlap = (a, b) => {
      if (!a || !b) return 0;
      const x = Math.max(0, Math.min(a.right || a.left + a.width, b.right || b.left + b.width) - Math.max(a.left || 0, b.left || 0));
      const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      return x > 0 ? y : 0;
    };
    const box = el => {
      const r = rect(el);
      if (!r) return null;
      r.left = el.getBoundingClientRect().left;
      r.right = el.getBoundingClientRect().right;
      return r;
    };
    const app = box(document.getElementById('app'));
    const clubs = box(document.querySelector('.clubs'));
    const menu = box(document.getElementById('guessMenu'));
    const input = box(document.getElementById('guessInput'));
    const actions = box(document.getElementById('actions'));
    const chrome = box(document.querySelector('.chrome'));
    const fresh = box(document.querySelector('.club.fresh'));
    const revealed = [...document.querySelectorAll('.club:not(.locked)')];
    const visibleRevealed = revealed.filter(el => {
      const r = el.getBoundingClientRect();
      return r.bottom > clubs.top + 1 && r.top < clubs.bottom - 1 && r.height > 8;
    }).length;
    const worths = (document.body.innerText.match(/שווה/g) || []).length;
    const opts = document.querySelectorAll('#guessMenu .opt').length;
    const qSize = parseFloat(getComputedStyle(document.querySelector('.question')).fontSize);
    return {
      kb: document.documentElement.classList.contains('kb'),
      appH: Math.round(app.height),
      appTop: Math.round(app.top),
      chromeH: Math.round(chrome.height),
      clubsH: Math.round(clubs.height),
      menuH: menu ? Math.round(menu.height) : 0,
      menuScroll: document.getElementById('guessMenu').scrollHeight,
      menuClient: document.getElementById('guessMenu').clientHeight,
      menuHidden: document.getElementById('guessMenu').hidden,
      opts,
      worths,
      qSize,
      scrollY: window.scrollY,
      clubsMenuOverlap: Math.round(overlap(clubs, menu)),
      clubsInputOverlap: Math.round(overlap(clubs, input)),
      inputBottom: Math.round(input.bottom),
      actionsBottom: Math.round(actions.bottom),
      freshTop: fresh ? Math.round(fresh.top) : null,
      freshBottom: fresh ? Math.round(fresh.bottom) : null,
      clubsTop: Math.round(clubs.top),
      clubsBottom: Math.round(clubs.bottom),
      visibleRevealed,
      revealed: revealed.length,
      cache: [...document.querySelectorAll('link[rel=stylesheet], script[src]')].map(el => el.getAttribute('href') || el.getAttribute('src'))
    };
  });
  console.log('keyboard', JSON.stringify(metrics), 'followedOffset', followed, 'query', query);
  const fail = [];
  if (!metrics.kb) fail.push('kb class missing');
  if (metrics.appH < 490 || metrics.appH > 530) fail.push('app height ' + metrics.appH);
  if (metrics.appTop !== 0) fail.push('app top ' + metrics.appTop);
  if (followed !== '72px') fail.push('offset follow ' + followed);
  if (metrics.chromeH > 48) fail.push('chrome not slim ' + metrics.chromeH);
  if (metrics.clubsH < 100) fail.push('clubs too short ' + metrics.clubsH);
  if (metrics.visibleRevealed < 2) fail.push('revealed clubs not visible ' + metrics.visibleRevealed);
  if (metrics.freshTop < metrics.clubsTop - 2 || metrics.freshBottom > metrics.clubsBottom + 2) fail.push('newest club clipped');
  if (metrics.menuHidden || metrics.opts < 1 || metrics.opts > 4) fail.push('suggestions ' + metrics.opts);
  if (metrics.menuScroll > metrics.menuClient + 2) fail.push('suggestions clipped ' + metrics.menuScroll + '>' + metrics.menuClient);
  if (metrics.clubsMenuOverlap > 2) fail.push('menu covers clubs ' + metrics.clubsMenuOverlap);
  if (metrics.clubsInputOverlap > 2) fail.push('input covers clubs');
  if (metrics.inputBottom > metrics.appH + metrics.appTop + 1) fail.push('input below visible area');
  if (metrics.actionsBottom > metrics.appH + metrics.appTop + 1) fail.push('actions below visible area');
  if (metrics.worths !== 1) fail.push('worth count ' + metrics.worths);
  if (metrics.qSize > 14) fail.push('heading still large ' + metrics.qSize);
  if (metrics.scrollY !== 0) fail.push('page scrolled');
  if (!metrics.cache.every(src => /\?v=5$/.test(src))) fail.push('cache bust ' + metrics.cache.join(','));
  if (fail.length) {
    await kb.screenshot({ path: '/workspace/shot-kb-fail.png' });
    throw new Error('keyboard layout: ' + fail.join('; '));
  }
  await kb.evaluate(() => {
    const old = document.getElementById('sim-kb');
    if (old) old.remove();
    const board = document.createElement('div');
    board.id = 'sim-kb';
    board.setAttribute('aria-hidden', 'true');
    const app = document.getElementById('app').getBoundingClientRect();
    board.style.cssText = `position:fixed;left:0;right:0;top:${app.bottom}px;height:${844 - app.bottom}px;background:#1c1c1e;z-index:40;display:flex;flex-direction:column;justify-content:flex-start;gap:8px;padding:8px 4px 22px;box-sizing:border-box;pointer-events:none;`;
    const rows = ['קראטוןםפשדגכעיחלךף', 'זסבהנמצתץ', ''];
    rows.forEach(row => {
      const line = document.createElement('div');
      line.style.cssText = 'display:flex;gap:5px;justify-content:center;direction:rtl;';
      const keys = row ? [...row] : ['רווח'];
      keys.forEach(key => {
        const k = document.createElement('div');
        k.textContent = key;
        k.style.cssText = `flex:1;max-width:${key === 'רווח' ? '220px' : 'none'};height:42px;border-radius:6px;background:#3a3a3c;color:#f4f2ec;display:grid;place-items:center;font:600 15px/1 Rubik,sans-serif;`;
        line.appendChild(k);
      });
      board.appendChild(line);
    });
    document.body.appendChild(board);
  });
  await kb.screenshot({ path: '/tmp/shot-kb-after.png' });
  await b.close();
  if (errs.length) throw new Error(errs.join('\n'));
})();
