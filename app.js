/* HawkerLens SG — vanilla JS, offline-first */
const FALLBACK = []; // filled from dishes.json at runtime; embedded copy below as fallback
let DISHES = [];
let state = { dishId: localStorage.getItem('hawkerlens_dish') || 'chicken-rice', lang: localStorage.getItem('hawkerlens_lang') || 'en', photo: null };

const $ = id => document.getElementById(id);
const grid = $('dishGrid'), result = $('result');

const T = {
  en: { search: 'Search: laksa, prata, fish soup…', empty: 'Pick your lunch above 👆 — see calories, allergens & a healthier swap in 30 seconds.', kcal: 'kcal', p: 'Protein', c: 'Carbs', f: 'Fat', swap: '💪 Eat smarter: ', tip: '😋 Tip: ', aller: 'Allergens:', none: 'None common', spice: '🌶 Spice', dis: 'Estimates from HPB averages — not medical advice. Built with the Devpost Learn Skill Pack (scope → prd → spec → build).' },
  zh: { search: '搜索：叻沙、煎饼、鱼汤…', empty: '👆 在上面选你的午餐 — 30秒看热量、过敏原和更健康吃法。', kcal: '千卡', p: '蛋白质', c: '碳水', f: '脂肪', swap: '💪 吃得更聪明：', tip: '😋 贴士：', aller: '过敏原：', none: '无常见', spice: '🌶 辣度', dis: '数据为HPB平均估算 — 非医疗建议。用 Devpost Learn Skill Pack 构建（scope → prd → spec → build）。' }
};

async function load() {
  try {
    const r = await fetch('data/dishes.json');
    if (!r.ok) throw 0;
    DISHES = await r.json();
  } catch { DISHES = EMBED; }
  if (!DISHES.find(d => d.id === state.dishId)) state.dishId = DISHES[0].id;
  renderAll();
}

function name(d){ return state.lang === 'zh' ? d.name_zh : d.name_en; }

function renderAll(){
  const t = T[state.lang];
  $('search').placeholder = t.search;
  $('disclaimer').textContent = t.dis;
  $('dishCount').textContent = state.lang === 'zh' ? `${DISHES.length} 道菜` : `${DISHES.length} dishes`;
  $('btnEN').classList.toggle('active', state.lang === 'en');
  $('btnZH').classList.toggle('active', state.lang === 'zh');
  renderGrid($('search').value || '');
  renderResult();
}

function renderGrid(filter){
  const f = filter.trim().toLowerCase();
  grid.innerHTML = '';
  DISHES.filter(d => !f || d.name_en.toLowerCase().includes(f) || d.name_zh.includes(filter.trim()))
    .forEach(d => {
      const b = document.createElement('button');
      b.className = 'dish' + (d.id === state.dishId ? ' sel' : '');
      b.innerHTML = `<div class="em">${d.emoji}</div><div class="nm">${name(d)}</div><div class="kc">${d.kcal} ${T[state.lang].kcal}</div>`;
      b.onclick = () => { state.dishId = d.id; localStorage.setItem('hawkerlens_dish', d.id); renderGrid($('search').value || ''); renderResult(); result.scrollIntoView({behavior:'smooth', block:'nearest'}); };
      grid.appendChild(b);
    });
}

function renderResult(){
  const t = T[state.lang];
  const d = DISHES.find(x => x.id === state.dishId);
  if (!d) { result.innerHTML = `<div class="empty">${t.empty}</div>`; return; }
  const photo = state.photo ? `<img src="${state.photo}" alt="dish photo">` : d.emoji;
  const allers = d.allergens.length ? d.allergens.map(a => `<span class="chip warn">⚠ ${a}</span>`).join('') : `<span class="chip">${t.none}</span>`;
  result.innerHTML = `
    <div class="big">
      <div class="photo">${photo}</div>
      <div><div style="font-size:20px;font-weight:800">${name(d)}</div>
      <div class="kcal">${d.kcal} <small>${t.kcal}</small></div>
      <div style="color:var(--muted);font-size:13px">${t.spice}: ${'🌶'.repeat(d.spice) || '—'}</div></div>
    </div>
    <div class="macros"><span class="macro">${t.p} ${d.protein}g</span><span class="macro">${t.c} ${d.carbs}g</span><span class="macro">${t.f} ${d.fat}g</span></div>
    <div><b>${t.aller}</b><div class="chips">${allers}</div></div>
    <div class="swap"><b>${t.swap}</b>${state.lang === 'zh' ? d.swap_zh : d.swap_en} <b>(−${d.kcal_saved})</b></div>
    <div class="tip"><b>${t.tip}</b>${state.lang === 'zh' ? d.tip_zh : d.tip_en}</div>`;
}

$('search').addEventListener('input', e => renderGrid(e.target.value));
$('btnEN').onclick = () => { state.lang = 'en'; localStorage.setItem('hawkerlens_lang', 'en'); renderAll(); };
$('btnZH').onclick = () => { state.lang = 'zh'; localStorage.setItem('hawkerlens_lang', 'zh'); renderAll(); };
$('photoInput').addEventListener('change', e => {
  const f = e.target.files[0]; const w = $('uploadWarn'); w.hidden = true;
  if (!f) return;
  if (!f.type.startsWith('image/')) { w.textContent = 'Wah, that is not an image lah. Try JPG/PNG.'; w.hidden = false; return; }
  if (f.size > 5 * 1024 * 1024) { w.textContent = 'Wah, file too big (>5MB). Try a smaller photo.'; w.hidden = false; return; }
  const r = new FileReader();
  r.onload = ev => { state.photo = ev.target.result; renderResult(); };
  r.readAsDataURL(f);
});

const EMBED = [{"allergens":["soy","sesame","egg"],"carbs":55,"emoji":"🍗","fat":25,"id":"chicken-rice","kcal":607,"kcal_saved":180,"name_en":"Hainanese Chicken Rice","name_zh":"海南鸡饭","protein":32,"spice":1,"swap_en":"Less rice + extra cucumber, lim kopi-o kosong — save ~180 kcal","swap_zh":"少饭多黄瓜，咖啡乌 kosong — 省约180千卡","tip_en":"Wah, shiok but rich! Ask for less oil on rice.","tip_zh":"哇，很好吃但很油！叫少油饭。"},{"allergens":["shellfish","gluten","egg","soy"],"carbs":82,"emoji":"🍜","fat":52,"id":"laksa","kcal":920,"kcal_saved":300,"name_en":"Laksa","name_zh":"叻沙","protein":28,"spice":3,"swap_en":"Try laksa yong-tau-foo soup version — save ~300 kcal","swap_zh":"试试叻沙酿豆腐汤版 — 省约300千卡","tip_en":"Wah, 920 kcal! Share the gravy, don't drink finish.","tip_zh":"哇，920千卡！汤不要喝完。"},{"allergens":["shellfish","gluten","egg","soy"],"carbs":75,"emoji":"🍳","fat":38,"id":"char-kway-teow","kcal":744,"kcal_saved":200,"name_en":"Char Kway Teow","name_zh":"炒粿条","protein":18,"spice":2,"swap_en":"Ask for less oil + extra bean sprouts — save ~200 kcal","swap_zh":"叫少油多豆芽 — 省约200千卡","tip_en":"Wok hei power! Half plate + fruit is steady.","tip_zh":"锅气十足！吃半盘加水果更稳。"},{"allergens":["gluten","egg","dairy"],"carbs":95,"emoji":"🥞","fat":18,"id":"roti-prata","kcal":600,"kcal_saved":220,"name_en":"Roti Prata (2pc + curry)","name_zh":"印度煎饼两片加咖喱","protein":14,"spice":2,"swap_en":"1 kosong + dhal instead of curry — save ~220 kcal","swap_zh":"一片 kosong 配扁豆咖喱 — 省约220千卡","tip_en":"Crispy kosong hits different. Dhal > curry.","tip_zh":"脆脆 kosong 最好吃。扁豆咖喱更健康。"},{"allergens":["soy","gluten"],"carbs":60,"emoji":"🍚","fat":12,"id":"yong-tau-foo","kcal":380,"kcal_saved":120,"name_en":"Yong Tau Foo (soup, 6pc)","name_zh":"酿豆腐汤六件","protein":25,"spice":1,"swap_en":"Soup base + brown rice, skip fried items — save ~120 kcal","swap_zh":"选汤底加糙米，不拿油炸 — 省约120千卡","tip_en":"Best hawker hack already. Soup don't finish can liao.","tip_zh":"已经是最聪明的选择。汤别喝完就行。"},{"allergens":["gluten","egg","pork"],"carbs":70,"emoji":"🥟","fat":22,"id":"wanton-mee","kcal":520,"kcal_saved":150,"name_en":"Wanton Mee","name_zh":"云吞面","protein":24,"spice":1,"swap_en":"Soup version + extra chye sim — save ~150 kcal","swap_zh":"选汤面加多菜心 — 省约150千卡","tip_en":"Dry or soup both can. Chilli small-small can liao.","tip_zh":"干捞汤面都行。辣椒少少就好。"},{"allergens":["dairy","egg"],"carbs":45,"emoji":"🍛","fat":35,"id":"nasi-lemak","kcal":680,"kcal_saved":250,"name_en":"Nasi Lemak (standard)","name_zh":"椰浆饭","protein":20,"spice":3,"swap_en":"Less santan rice + ikan kuning, skip luncheon meat — save ~250 kcal","swap_zh":"少椰浆饭选甘望鱼，不加午餐肉 — 省约250千卡","tip_en":"Sambal is life but sodium bomb. Dab, don't drown.","tip_zh":"参巴是灵魂但很咸。点到为止。"},{"allergens":["peanut","shellfish","egg","soy"],"carbs":55,"emoji":"🥗","fat":28,"id":"satay","kcal":480,"kcal_saved":140,"name_en":"Satay (10 sticks)","name_zh":"沙爹十串","protein":30,"spice":2,"swap_en":"Chicken-only sticks + ketupat half — save ~140 kcal","swap_zh":"全选鸡肉串加半个马来粽 — 省约140千卡","tip_en":"Protein king! Peanut sauce two spoon max.","tip_zh":"蛋白质之王！花生酱最多两勺。"},{"allergens":["gluten","soy","sesame"],"carbs":85,"emoji":"🍲","fat":15,"id":"bak-chor-mee","kcal":550,"kcal_saved":130,"name_en":"Bak Chor Mee","name_zh":"肉脞面","protein":26,"spice":2,"swap_en":"Mee kia soup + lean pork, less lard — save ~130 kcal","swap_zh":"选幼面汤加瘦肉少猪油 — 省约130千卡","tip_en":"Vinegar kick shiok. Ask 'less lard' uncle understands.","tip_zh":"黑醋够味。讲少猪油 uncle 明白的。"},{"allergens":["egg","dairy","gluten"],"carbs":60,"emoji":"🥘","fat":30,"id":"mee-goreng","kcal":620,"kcal_saved":170,"name_en":"Mee Goreng Mamak","name_zh":"马来炒面","protein":16,"spice":3,"swap_en":"Half portion + telur rebus (not goreng) — save ~170 kcal","swap_zh":"吃半盘加水煮蛋 — 省约170千卡","tip_en":"Sweet-spicy shiok. Lime squeeze cuts the jelak.","tip_zh":"酸甜辣过瘾。挤酸柑解腻。"},{"allergens":[],"carbs":65,"emoji":"🐟","fat":8,"id":"fish-soup","kcal":320,"kcal_saved":90,"name_en":"Sliced Fish Soup + rice","name_zh":"鱼片汤加饭","protein":28,"spice":1,"swap_en":"Brown rice + extra lettuce — save ~90 kcal","swap_zh":"换糙米多生菜 — 省约90千卡","tip_en":"Lightest legend. Add milk only if you must.","tip_zh":"最清爽的选择。加奶少少就好。"},{"allergens":["gluten","soy","sesame","peanut"],"carbs":78,"emoji":"🍜","fat":20,"id":"lor-mee","kcal":580,"kcal_saved":160,"name_en":"Lor Mee","name_zh":"卤面","protein":22,"spice":1,"swap_en":"Less gravy + extra vinegar + half noodles — save ~160 kcal","swap_zh":"少卤汁多醋少面 — 省约160千卡","tip_en":"Gravy lover? Ask gravy separate, you control.","tip_zh":"爱卤汁？叫卤汁分开，自己控制。"}]; // fetch fallback unused when served over http; file:// users get grid from dishes.json via fallback below
load();
