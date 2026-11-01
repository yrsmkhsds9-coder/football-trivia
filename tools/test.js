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
  await p.click('#hintBtn'); await p.click('#hintBtn'); await new Promise(r=>setTimeout(r,500));
  await p.screenshot({path:'/workspace/shot-2-career.png'});
  // answer correctly
  const ans = await p.evaluate(()=>__ft.state.items[__ft.state.i].answer);
  await p.click(`.ans[data-k="${ans}"]`); await new Promise(r=>setTimeout(r,1300));
  await p.screenshot({path:'/workspace/shot-3-career-answered.png'});
  // play through rest quickly
  for(let i=1;i<10;i++){ await p.click('#nextBtn'); const a=await p.evaluate(()=>__ft.state.items[__ft.state.i].answer); await p.click(`.ans[data-k="${(a+ (i%3?0:1))%4}"]`); }
  await p.click('#nextBtn'); await new Promise(r=>setTimeout(r,800));
  await p.screenshot({path:'/workspace/shot-5-end.png'});
  // trivia mode
  await p.click('#homeBtn'); await new Promise(r=>setTimeout(r,300));
  await p.click('.mode[data-mode=trivia]'); await new Promise(r=>setTimeout(r,500));
  await p.click('.ans[data-k="0"]'); await new Promise(r=>setTimeout(r,900));
  await p.screenshot({path:'/workspace/shot-4-trivia.png'});
  const best = await p.evaluate(()=>localStorage.getItem('ft_best_career'));
  // scroll heights check: does long career overflow?
  const overflow = await p.evaluate(()=>document.documentElement.scrollHeight);
  console.log('errors',errs,'best',best,'scrollH',overflow);
  await b.close();
})();
