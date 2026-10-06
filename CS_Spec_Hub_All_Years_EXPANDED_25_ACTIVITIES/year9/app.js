
const DATA = window.SITE_DATA;
const STORE='year9_cs_spec_hub_v1';
function state(){try{return Object.assign({xp:0,done:{},topics:{}},JSON.parse(localStorage.getItem(STORE)||'{}'))}catch(e){return {xp:0,done:{},topics:{}}}}
function save(s){localStorage.setItem(STORE,JSON.stringify(s));hud()}
function hud(){
 const s=state(), done=Object.keys(s.done||{}).length;
 document.querySelectorAll('[data-xp]').forEach(e=>e.textContent=s.xp);
 document.querySelectorAll('[data-done]').forEach(e=>e.textContent=done);
 const total=DATA.reduce((n,t)=>n+t.subs.reduce((m,sub)=>m+sub.tasks.length,0),0);
 document.querySelectorAll('.bar').forEach(e=>e.style.width=Math.min(100,done/total*100)+'%')
}
function award(id,xp=20){const s=state();if(!s.done[id]){s.done[id]=true;s.xp+=xp;save(s);return true}return false}
function byId(id){return document.getElementById(id)}
function showHome(){location.hash='';render()}
function render(){
 const hash=location.hash.replace('#','');
 if(!hash){renderHome();return}
 const [topicId,subId]=hash.split('/');
 const topic=DATA.find(t=>t.id===topicId);
 if(!topic){renderHome();return}
 if(!subId){renderTopic(topic);return}
 const sub=topic.subs.find(s=>s.id===subId);
 if(!sub){renderTopic(topic);return}
 renderSub(topic,sub);
}
function shell(inner){
 byId('app').innerHTML=inner;hud();window.scrollTo({top:0,behaviour:'smooth'});
}
function renderHome(){
 shell(`
 <section class="hero platform-hero">
  <div class="hero-copy">
    <div class="kicker">Year 9 • Pearson Edexcel GCSE Computer Science</div>
    <h1>Computer Science<br><span class="accent-word">Spec Hub</span></h1>
    <p>Pick the topic you are learning, build the knowledge, then move through guided practice, application and mastery challenges.</p>
    <div class="hero-actions">
      <button class="btn" onclick="document.getElementById('topicGrid').scrollIntoView({behaviour:'smooth'})">Choose a topic ↓</button>
      <span class="mini-status"><b data-done>0</b> tasks completed</span>
    </div>
    <div class="progress"><div class="bar"></div></div>
    <p class="muted progress-note">Your progress is stored on this browser.</p>
  </div>

  <div class="hero-brand-panel">
    <img src="hero_cs_fun_art.png" alt="Fun computer science illustration">
    <div class="hero-brand-tags">
      <span>Learn</span><span>Practise</span><span>Apply</span><span>Master</span>
    </div>
  </div>
</section>

<section class="quick-strip" aria-label="What the site includes">
  <div><b>32</b><span>subtopics</span></div>
  <div><b>148</b><span>activities</span></div>
  <div><b>6</b><span>spec areas</span></div>
  <div><b>∞</b><span>replayable practice</span></div>
</section>

<h2 class="section-title">Choose a specification area</h2>
 <input id="search" class="searchbox" placeholder="Search for trace tables, binary, loops, networks..." oninput="filterCards(this.value)">
 <section class="grid" id="topicGrid">
 ${DATA.map(t=>`<a class="card topic-card" data-search="${(t.title+' '+t.desc+' '+t.subs.map(s=>s.title).join(' ')).toLowerCase()}" href="#${t.id}">
 <div class="topic-icon">${t.icon}</div><h3>${t.title}</h3><p>${t.desc}</p><span class="badge">${t.subs.length} subtopics</span></a>`).join('')}
 </section>`)
}
function filterCards(q){
 q=q.toLowerCase();document.querySelectorAll('.topic-card').forEach(c=>c.classList.toggle('hidden',!c.dataset.search.includes(q)))
}
function renderTopic(topic){
 shell(`<div class="breadcrumbs"><a href="#">Home</a> › ${topic.title}</div>
 <div class="topic-head"><div><div class="kicker">Specification area</div><h1>${topic.icon} ${topic.title}</h1><p class="muted">${topic.desc}</p></div><button class="btn" onclick="showHome()">← All topics</button></div>
 <section class="subgrid">${topic.subs.map(s=>`<a class="subcard" href="#${topic.id}/${s.id}"><div class="spec">${s.spec}</div><h3>${s.title}</h3><p class="muted">${s.learn[0]}</p></a>`).join('')}</section>`)
}

function visualFor(subId){
 const V={

'decomposition':`
<div class="visual"><div class="visual-title">Visual model — break a big problem into parts</div>
<svg viewBox="0 0 900 280" aria-label="Decomposition diagram">
<defs><marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#4b7f9c"/></marker></defs>
<rect x="330" y="20" rx="18" ry="18" width="240" height="64" fill="#1b6d99"/><text x="450" y="60" text-anchor="middle" fill="white" font-size="24" font-weight="700">School Lunch App</text>
<g stroke="#4b7f9c" stroke-width="3" marker-end="url(#arr)"><line x1="450" y1="84" x2="120" y2="165"/><line x1="450" y1="84" x2="330" y2="165"/><line x1="450" y1="84" x2="570" y2="165"/><line x1="450" y1="84" x2="780" y2="165"/></g>
<g fill="white" stroke="#8fbfd7" stroke-width="2">
<rect x="35" y="165" rx="14" width="170" height="70"/><rect x="245" y="165" rx="14" width="170" height="70"/><rect x="485" y="165" rx="14" width="170" height="70"/><rect x="695" y="165" rx="14" width="170" height="70"/></g>
<g fill="#17324a" font-size="20" font-weight="700" text-anchor="middle"><text x="120" y="207">Login</text><text x="330" y="207">Menu</text><text x="570" y="207">Payment</text><text x="780" y="207">Confirm</text></g>
</svg></div>`,

'abstraction':`
<div class="visual"><div class="visual-title">Visual model — keep what matters</div>
<div class="visual-grid"><div class="v-card"><b>Keep</b><p>Route number<br>Stops<br>Journey time<br>Destination</p></div>
<div class="v-card"><b>Ignore for this model</b><p>Driver's shoe size<br>Bus paint scratches<br>Nearby shop colours<br>Weather from last year</p></div></div></div>`,

'algorithm-basics':`
<div class="visual"><div class="visual-title">Flowchart example — input → decision → output</div>
<svg viewBox="0 0 900 390">
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#487a96"/></marker></defs>
<ellipse class="flow-step" cx="450" cy="45" rx="90" ry="32"/><text x="450" y="52" text-anchor="middle" fill="#17324a" font-size="20">START</text>
<path class="flow-line" d="M450 77 L450 115"/>
<polygon class="flow-step" points="340,115 560,115 530,175 310,175"/><text x="435" y="151" text-anchor="middle" fill="#17324a" font-size="20">INPUT age</text>
<path class="flow-line" d="M450 175 L450 220"/>
<polygon class="flow-diamond" points="450,220 560,275 450,330 340,275"/><text x="450" y="281" text-anchor="middle" fill="#17324a" font-size="19">age ≥ 13?</text>
<path class="flow-line" d="M340 275 L180 275"/><path class="flow-line" d="M560 275 L720 275"/>
<rect class="flow-step" x="70" y="245" rx="12" width="210" height="60"/><rect class="flow-step" x="620" y="245" rx="12" width="210" height="60"/>
<text x="175" y="281" text-anchor="middle" fill="#17324a" font-size="18">OUTPUT "Child"</text><text x="725" y="281" text-anchor="middle" fill="#17324a" font-size="18">OUTPUT "Teen"</text>
<text x="300" y="260" fill="#8b5a00" font-size="16">No</text><text x="580" y="260" fill="#8b5a00" font-size="16">Yes</text>
</svg></div>`,

'sequence-selection-repetition':`
<div class="visual"><div class="visual-title">Three core constructs</div><div class="logic-row">
<div class="logic-box"><b>Sequence</b><div class="logic-gate">1 → 2 → 3</div><small>Instructions run in order.</small></div>
<div class="logic-box"><b>Selection</b><div class="logic-gate">IF ?</div><small>Choose a path.</small></div>
<div class="logic-box"><b>Repetition</b><div class="logic-gate">↻ LOOP</div><small>Repeat instructions.</small></div>
</div></div>`,

'trace-tables':`
<div class="visual"><div class="visual-title">Trace table model</div>
<table class="csv-table"><tr><th>Step</th><th>x</th><th>y</th><th>Output</th></tr>
<tr><td>x ← 4</td><td>4</td><td>–</td><td>–</td></tr><tr><td>y ← 3</td><td>4</td><td>3</td><td>–</td></tr>
<tr><td>x ← x + y</td><td>7</td><td>3</td><td>–</td></tr><tr><td>y ← x × 2</td><td>7</td><td>14</td><td>–</td></tr>
<tr><td>OUTPUT y</td><td>7</td><td>14</td><td>14</td></tr></table></div>`,

'searching':`
<div class="visual"><div class="visual-title">Binary search — keep halving the search area</div>
<div class="sort-list"><span class="sort-item">4</span><span class="sort-item">9</span><span class="sort-item">14</span><span class="sort-item sort-swap">20</span><span class="sort-item">31</span><span class="sort-item">44</span><span class="sort-item">58</span></div>
<p class="muted" style="text-align:centre">Check the middle value. Decide whether the target is lower or higher, then discard half.</p></div>`,

'sorting':`
<div class="visual"><div class="visual-title">Bubble sort — adjacent comparison</div>
<div class="sort-list"><span class="sort-item sort-swap">7</span><span class="sort-item sort-swap">3</span><span class="sort-item">5</span></div>
<p style="text-align:centre">Compare 7 and 3 → swap</p>
<div class="sort-list"><span class="sort-item">3</span><span class="sort-item sort-swap">7</span><span class="sort-item sort-swap">5</span></div>
<p style="text-align:centre">Compare 7 and 5 → swap</p>
<div class="sort-list"><span class="sort-item">3</span><span class="sort-item">5</span><span class="sort-item">7</span></div></div>`,

'logic-basics':`
<div class="visual"><div class="visual-title">Logic gates — AND, OR, NOT</div><div class="logic-row">
<div class="logic-box"><b>AND</b><svg viewBox="0 0 220 120"><line x1="10" y1="35" x2="65" y2="35" stroke="#355c74" stroke-width="4"/><line x1="10" y1="85" x2="65" y2="85" stroke="#355c74" stroke-width="4"/><path d="M65 15 L115 15 Q180 60 115 105 L65 105 Z" fill="#fff" stroke="#1b6d99" stroke-width="4"/><line x1="162" y1="60" x2="210" y2="60" stroke="#355c74" stroke-width="4"/></svg><small>1 only when both inputs are 1.</small></div>
<div class="logic-box"><b>OR</b><svg viewBox="0 0 220 120"><line x1="10" y1="35" x2="65" y2="35" stroke="#355c74" stroke-width="4"/><line x1="10" y1="85" x2="65" y2="85" stroke="#355c74" stroke-width="4"/><path d="M62 15 Q100 60 62 105 Q120 105 175 60 Q120 15 62 15 Z" fill="#fff" stroke="#7057c7" stroke-width="4"/><line x1="174" y1="60" x2="210" y2="60" stroke="#355c74" stroke-width="4"/></svg><small>1 when at least one input is 1.</small></div>
<div class="logic-box"><b>NOT</b><svg viewBox="0 0 220 120"><line x1="15" y1="60" x2="60" y2="60" stroke="#355c74" stroke-width="4"/><polygon points="60,20 60,100 155,60" fill="#fff" stroke="#23875d" stroke-width="4"/><circle cx="168" cy="60" r="12" fill="#fff" stroke="#23875d" stroke-width="4"/><line x1="180" y1="60" x2="210" y2="60" stroke="#355c74" stroke-width="4"/></svg><small>Flips the input.</small></div>
</div></div>`,

'combined-truth':`
<div class="visual"><div class="visual-title">Three inputs = 8 combinations</div>
<table class="csv-table"><tr><th>A</th><th>B</th><th>C</th><th>(A OR B)</th><th>NOT C</th><th>Final</th></tr>
<tr><td>F</td><td>F</td><td>F</td><td>F</td><td>T</td><td>F</td></tr>
<tr><td>F</td><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td></tr>
<tr><td>T</td><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td></tr></table>
<p class="muted">Use intermediate columns to reduce mistakes.</p></div>`,

'program-structure':`
<div class="visual"><div class="visual-title">Variable lifecycle</div><div class="visual-grid">
<div class="v-card"><b>Initialise</b><div class="code">score = 0</div><small>Give the variable a starting value.</small></div>
<div class="v-card"><b>Assign a new value</b><div class="code">score = score + 1</div><small>Update the value during the program.</small></div>
</div></div>`,

'loops':`
<div class="visual"><div class="visual-title">Count-controlled vs condition-controlled</div>
<div class="visual-grid">
<div class="v-card"><b>FOR</b><div class="code">for i in range(5):
    print(i)</div><small>Repeat a known number of times.</small></div>
<div class="v-card"><b>WHILE</b><div class="code">while password != "python":
    password = input("Try again: ")</div><small>Repeat until a condition changes.</small></div>
</div></div>`,

'strings':`
<div class="visual"><div class="visual-title">String positions</div>
<div class="string-strip"><span class="charbox">H<small>0</small></span><span class="charbox">a<small>1</small></span><span class="charbox">r<small>2</small></span><span class="charbox">l<small>3</small></span><span class="charbox">e<small>4</small></span><span class="charbox">y<small>5</small></span></div>
<p class="muted">Python string indexing starts at 0.</p></div>`,

'csv-files':`
<div class="visual"><div class="visual-title">CSV example</div>
<table class="csv-table"><tr><th>Name</th><th>Age</th><th>Score</th></tr><tr><td>Harley</td><td>12</td><td>80</td></tr><tr><td>Kingsley</td><td>10</td><td>74</td></tr></table>
<div class="code">Harley,12,80
Kingsley,10,74</div></div>`,

'lan-wan':`
<div class="visual"><div class="visual-title">LAN vs WAN</div><div class="network-diagram">
<div class="net-node">🏫 School LAN<br><small>One site / local area</small></div>
<div class="router">WAN LINK</div>
<div class="net-node">🏢 Remote Office LAN<br><small>Another town/country</small></div>
</div></div>`,

'internet-structure':`
<div class="visual"><div class="visual-title">Internet path</div><div class="network-diagram">
<div class="net-node">💻 Device<br><small>source IP</small></div><div class="router">ROUTER</div><div class="net-node">🌐 Other Network<br><small>destination IP</small></div>
</div><p class="muted" style="text-align:centre">Routers forward packets between networks towards the destination.</p></div>`,

'wired-wireless':`
<div class="visual"><div class="visual-title">Connection trade-offs</div><div class="visual-grid">
<div class="v-card"><b>Ethernet</b><p>Often stable<br>Low interference<br>Good latency<br>Requires cable</p></div>
<div class="v-card"><b>Wi‑Fi</b><p>Mobile<br>Convenient<br>Range matters<br>Can suffer interference</p></div>
</div></div>`,

'binary-basics':`
<div class="visual"><div class="visual-title">8-bit place values</div><div class="binary-strip">
${[128,64,32,16,8,4,2,1].map(v=>`<div class="bitbox"><b>${v}</b><span>place</span></div>`).join('')}
</div><p class="muted">Each place value doubles as you move left.</p></div>`,

'binary-conversion':`
<div class="visual"><div class="visual-title">Worked conversion — 10110100</div>
<div class="binary-strip">
<div class="bitbox"><b>1</b><span>128</span></div><div class="bitbox"><b>0</b><span>64</span></div><div class="bitbox"><b>1</b><span>32</span></div><div class="bitbox"><b>1</b><span>16</span></div><div class="bitbox"><b>0</b><span>8</span></div><div class="bitbox"><b>1</b><span>4</span></div><div class="bitbox"><b>0</b><span>2</span></div><div class="bitbox"><b>0</b><span>1</span></div>
</div><p style="text-align:centre;font-weight:800">128 + 32 + 16 + 4 = 180</p></div>`,

'binary-shifts':`
<div class="visual"><div class="visual-title">Logical shift</div>
<div class="v-card"><b>Left shift by 1</b><div class="code">00000101  →  00001010
     5           10</div><small>For unsigned values, this usually doubles the value if no significant bit is lost.</small></div>
</div>`,

'overflow':`
<div class="visual"><div class="visual-title">Why overflow happens</div>
<div class="code">8-bit unsigned maximum = 255
250 + 10 = 260  ✗
260 needs more than 8 bits</div></div>`,

'hexadecimal':`
<div class="visual"><div class="visual-title">Binary nibble ↔ hex digit</div>
<table class="csv-table"><tr><th>Binary</th><th>Hex</th><th>Binary</th><th>Hex</th></tr>
<tr><td>0000</td><td>0</td><td>1000</td><td>8</td></tr><tr><td>0001</td><td>1</td><td>1001</td><td>9</td></tr>
<tr><td>1010</td><td>A</td><td>1100</td><td>C</td></tr><tr><td>1110</td><td>E</td><td>1111</td><td>F</td></tr></table>
<p class="muted">One hexadecimal digit always represents 4 binary bits.</p></div>`
 };
 return V[subId]||'';
}

function renderSub(topic,sub){
 shell(`<div class="breadcrumbs"><a href="#">Home</a> › <a href="#${topic.id}">${topic.title}</a> › ${sub.title}</div>
 <div class="topic-head"><div><div class="kicker">${sub.spec}</div><h1>${sub.title}</h1></div><a class="btn" href="#${topic.id}">← ${topic.title}</a></div>
 <section class="learn"><h2>Learn it</h2><ul>${sub.learn.map(x=>`<li>${x}</li>`).join('')}</ul><div class="example"><b>Worked example</b><br>${sub.example}</div>${visualFor(sub.id)}</section>
 <h2 class="section-title">Practise → Apply → Master</h2>
 ${renderTaskStages(topic,sub)}
 <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:25px"><a class="btn" href="#${topic.id}">← Back to subtopics</a><button class="btn good" onclick="window.scrollTo({top:0,behaviour:'smooth'})">Back to top ↑</button></div>`)
}

function renderTaskStages(topic,sub){
 const labels=['Stage 1 — Foundation','Stage 2 — Build','Stage 3 — Apply','Stage 4 — Challenge','Stage 5 — Mastery'];
 return sub.tasks.map((task,i)=>{
   const head=i%5===0?`<div class="activity-stage"><div><span>${labels[Math.floor(i/5)]||'Extra Practice'}</span><b>Activities ${i+1}–${Math.min(i+5,sub.tasks.length)}</b></div><small>${Math.min(i+5,sub.tasks.length)} / ${sub.tasks.length}</small></div>`:'';
   return head+taskHTML(topic,sub,task,i);
 }).join('');
}

function taskHTML(topic,sub,t,i){
 const id=`${topic.id}-${sub.id}-${i}`, title=t.t==='boss'?t.q:(t.q||'');
 const xpBase=20+i*5;
 let body='';
 const binaryLead=binaryHelper(topic,sub,t);

 if(t.t==='mcq') body=`
   ${binaryLead}
   <div class="options">
     ${t.o.map((o,j)=>`<button type="button" class="option selectable" data-v="${j}" onclick="selectMCQ(this)">${o}</button>`).join('')}
   </div>
   <button type="button" class="btn check-btn" onclick='checkMCQ(this,${t.a},${JSON.stringify(id)},${xpBase},${JSON.stringify(t.why||"")})'>Check answer</button>
   <div class="feedback"></div>`;


 if(t.t==='match') body=`
   ${binaryLead}
   <div class="drag-match">
     <div class="match-bank">
       ${t.pairs.map((p,j)=>`<div class="match-card" draggable="true" data-key="${j}">${p[0]}<span class="drag-handle">↕</span></div>`).join('')}
     </div>
     <div class="match-targets">
       ${t.pairs.map((p,j)=>({p,j})).sort((a,b)=>String(a.p[1]).localeCompare(String(b.p[1]))).map(x=>`<div class="match-bin" data-answer="${x.j}"><div class="match-definition">${x.p[1]}</div><div class="match-drop"></div></div>`).join('')}
     </div>
   </div>
   <div class="drag-tip">Drag each concept onto the description it matches.</div>
   <button type="button" class="btn check-btn" onclick='checkMatch(this,${JSON.stringify(id)},${40+i*5})'>Check matches</button>
   <div class="feedback"></div>`;

 if(t.t==='order') body=`
   ${binaryLead}
   <div class="drag-order" data-answer='${JSON.stringify(t.a)}'>
     ${t.items.map(x=>`<div class="drag-token" draggable="true" data-key="${x[1]}">${x[0]}<span class="drag-handle">↕</span></div>`).join('')}
   </div>
   <div class="drag-tip">Drag the cards into the correct order.</div>
   <button type="button" class="btn check-btn" onclick='checkDragOrder(this,${JSON.stringify(t.a)},${JSON.stringify(id)},${30+i*5})'>Check answer</button>
   <div class="feedback"></div>`;

 if(t.t==='classify') body=`
   ${binaryLead}
   <div class="drag-classify" data-cats='${JSON.stringify(t.cats)}'>
     <div class="drag-bank">
       ${t.items.map((x,j)=>`<div class="classify-card" draggable="true" data-answer="${x[1]}" data-item="${j}">${x[0]}<span class="drag-handle">↕</span></div>`).join('')}
     </div>
     <div class="drop-grid">
       ${t.cats.map((c,k)=>`<div class="drop-bin" data-cat="${k}"><div class="drop-bin-title">${c}</div><div class="drop-zone"></div></div>`).join('')}
     </div>
   </div>
   <div class="drag-tip">Drag every card into the correct category.</div>
   <button type="button" class="btn check-btn" onclick='checkDragClassify(this,${JSON.stringify(id)},${35+i*5})'>Check answer</button>
   <div class="feedback"></div>`;

 if(t.t==='short') body=`
   ${binaryLead}
   <input type="text" placeholder="Type a short answer…" data-keys='${JSON.stringify(t.keys)}'>
   <button type="button" class="btn check-btn" onclick='shortCheck(this,${JSON.stringify(id)},${35+i*5},${JSON.stringify(t.hint||"")})'>Check answer</button>
   <div class="feedback"></div>`;

 if(t.t==='number'){
   const answer=String(t.answer||'');
   if(isBinaryArea(topic,sub) && /^[01]{4,16}$/.test(answer)){
     body=`${binaryLead}${binaryEntry(answer,id,35+i*5,t.hint||'')}`;
   }else{
     body=`
       ${binaryLead}
       <input type="text" placeholder="Enter your answer" data-answer="${answer}">
       <button type="button" class="btn check-btn" onclick='numberCheck(this,${JSON.stringify(id)},${35+i*5},${JSON.stringify(t.hint||"")})'>Check answer</button>
       <div class="feedback"></div>`;
   }
 }

 if(t.t==='trace') body=`
   ${binaryLead}
   <div class="code">${t.code}</div>
   <div class="trace-grid">${t.fields.map((f,j)=>`<label>${f[0]}<input type="text" data-answer="${f[1]}" placeholder="?"></label>`).join('')}</div>
   <button type="button" class="btn check-btn" onclick='traceCheck(this,${JSON.stringify(id)},${45+i*5})'>Check answer</button>
   <div class="feedback"></div>`;

 if(t.t==='truth') body=`
   ${binaryLead}
   <div class="code">${t.rows.map(r=>r.slice(0,-1).join(' | ')+' | ?').join('\n')}</div>
   <div class="trace-grid">${t.rows.map((r,j)=>`<label>Row ${j+1} output<input type="text" data-answer="${r[r.length-1]}" placeholder="True / False"></label>`).join('')}</div>
   <button type="button" class="btn check-btn" onclick='traceCheck(this,${JSON.stringify(id)},${50+i*5})'>Check answer</button>
   <div class="feedback"></div>`;

 if(t.t==='searchsim') body=renderSearchSim(t,id,55+i*5);
 if(t.t==='sortsim') body=renderSortSim(t,id,60+i*5);

 if(t.t==='boss') body=`
   ${binaryLead}
   <textarea class="response" placeholder="Write a detailed response here. Open challenges are checked for sufficient detail; compare the final reasoning with your notes or teacher."></textarea>
   <button type="button" class="btn warn check-btn" onclick='bossDone(this,${JSON.stringify(id)},${70+i*5})'>Check response</button>
   <div class="feedback"></div>`;

 if(!body) body=`<div class="feedback bad">This activity type could not be loaded.</div>`;

 return `<section class="task ${t.t==='boss'?'boss':''}"><h3>${t.t==='boss'?'★ Mastery Challenge':`Task ${i+1}`}</h3><p>${title.replace(/\n/g,'<br>')}</p>${body}</section>`
}

function renderSearchSim(t,id,xp){
 const vals=t.values||[];
 return `
 <div class="search-sim" data-mode="${t.mode}" data-target="${t.target}" data-id="${id}" data-xp="${xp}">
   <div class="search-status">Target: <b>${t.target}</b> • Checks made: <span class="search-count">0</span></div>
   <div class="search-track">
     ${vals.map((v,i)=>`<div class="search-cell" data-index="${i}" data-value="${v}" ondragover="event.preventDefault()" ondrop="dropSearchMarker(event,this)">${v}</div>`).join('')}
   </div>
   <div class="search-marker" draggable="true" ondragstart="dragSearchMarker(event)">🔎 Search marker</div>
   <div class="drag-tip">${t.mode==='binary'?'Use the binary-search rule: inspect the middle of the remaining range, then discard the impossible half.':'Start at the first value and inspect one item at a time.'}</div>
   <button type="button" class="btn check-btn" onclick="checkSearchSim(this)">Check search</button>
   <button type="button" class="ghost mini-reset" onclick="resetSearchSim(this)">Reset</button>
   <div class="feedback"></div>
 </div>`;
}

function renderSortSim(t,id,xp){
 if(t.mode==='merge'){
   return `
   <div class="sort-sim merge-sim" data-mode="merge" data-answer='${JSON.stringify(t.a)}' data-id="${id}" data-xp="${xp}">
     <div class="merge-columns">
       <div><b>Left list</b><div class="merge-source">${t.left.map(v=>`<div class="sort-card" draggable="true" data-value="${v}" ondragstart="dragSortCard(event)">${v}</div>`).join('')}</div></div>
       <div><b>Right list</b><div class="merge-source">${t.right.map(v=>`<div class="sort-card" draggable="true" data-value="${v}" ondragstart="dragSortCard(event)">${v}</div>`).join('')}</div></div>
     </div>
     <div class="merge-output" ondragover="event.preventDefault()" ondrop="dropMergeCard(event,this)"><span class="placeholder">Drag values here in merged order</span></div>
     <button type="button" class="btn check-btn" onclick="checkSortSim(this)">Check sort</button>
     <button type="button" class="ghost mini-reset" onclick="resetSortSim(this)">Reset</button>
     <div class="feedback"></div>
   </div>`;
 }
 return `
 <div class="sort-sim" data-mode="${t.mode}" data-answer='${JSON.stringify(t.a)}' data-id="${id}" data-xp="${xp}">
   <div class="sort-drag-row">
     ${(t.values||[]).map(v=>`<div class="sort-card" draggable="true" data-value="${v}" ondragstart="dragSortCard(event)">${v}</div>`).join('')}
   </div>
   <div class="drag-tip">Drag a value to a new position. For bubble sort, think in adjacent swaps as you work.</div>
   <button type="button" class="btn check-btn" onclick="checkSortSim(this)">Check sort</button>
   <button type="button" class="ghost mini-reset" onclick="resetSortSim(this)">Reset</button>
   <div class="feedback"></div>
 </div>`;
}

let activeDrag=null;
document.addEventListener('dragstart',e=>{
 const el=e.target.closest('.drag-token,.classify-card,.sort-card,.match-card');
 if(el){activeDrag=el;e.dataTransfer.effectAllowed='move';}
});
document.addEventListener('dragover',e=>{
 if(!activeDrag)return;
 const order=e.target.closest('.drag-order');
 if(order && activeDrag.classList.contains('drag-token')){
   e.preventDefault();
   const after=[...order.querySelectorAll('.drag-token')].find(x=>{
     const r=x.getBoundingClientRect(); return e.clientY < r.top+r.height/2;
   });
   if(after) order.insertBefore(activeDrag,after); else order.appendChild(activeDrag);
 }
 const zone=e.target.closest('.drop-zone,.drag-bank');
 if(zone && activeDrag.classList.contains('classify-card')) e.preventDefault();
 const matchZone=e.target.closest('.match-drop,.match-bank');
 if(matchZone && activeDrag.classList.contains('match-card')) e.preventDefault();
 const row=e.target.closest('.sort-drag-row');
 if(row && activeDrag.classList.contains('sort-card')){
   e.preventDefault();
   const cards=[...row.querySelectorAll('.sort-card')].filter(x=>x!==activeDrag);
   const after=cards.find(x=>{const r=x.getBoundingClientRect(); return e.clientX < r.left+r.width/2;});
   if(after) row.insertBefore(activeDrag,after); else row.appendChild(activeDrag);
 }
});
document.addEventListener('drop',e=>{
 const zone=e.target.closest('.drop-zone,.drag-bank');
 if(zone && activeDrag && activeDrag.classList.contains('classify-card')){e.preventDefault();zone.appendChild(activeDrag);}
 const matchZone=e.target.closest('.match-drop,.match-bank');
 if(matchZone && activeDrag && activeDrag.classList.contains('match-card')){e.preventDefault();matchZone.appendChild(activeDrag);}
 activeDrag=null;
});


function checkMatch(btn,id,xp){
 const box=btn.closest('.task'),cards=[...box.querySelectorAll('.match-card')],f=box.querySelector('.feedback');
 if(cards.some(c=>!c.closest('.match-drop'))){f.textContent='Match every concept before checking.';f.className='feedback bad';return}
 const ok=cards.every(c=>Number(c.dataset.key)===Number(c.closest('.match-bin').dataset.answer));
 f.textContent=ok?'All concepts are matched correctly.':'Some matches are incorrect — move the cards and try again.';
 f.className='feedback '+(ok?'ok':'bad');
 if(ok&&award(id,xp))f.innerHTML+=` <b>+${xp} XP</b>`;
}

function checkDragOrder(btn,ans,id,xp){
 const box=btn.closest('.task'),got=[...box.querySelectorAll('.drag-token')].map(x=>x.dataset.key),f=box.querySelector('.feedback');
 const ok=got.join('|')===ans.join('|');
 f.textContent=ok?'Correct order.':'Not quite — keep dragging the cards and try again.';
 f.className='feedback '+(ok?'ok':'bad');
 if(ok&&award(id,xp))f.innerHTML+=` <b>+${xp} XP</b>`;
}
function checkDragClassify(btn,id,xp){
 const box=btn.closest('.task'),cards=[...box.querySelectorAll('.classify-card')],f=box.querySelector('.feedback');
 if(cards.some(c=>!c.closest('.drop-zone'))){f.textContent='Place every card into a category before checking.';f.className='feedback bad';return}
 const ok=cards.every(c=>Number(c.closest('.drop-bin').dataset.cat)===Number(c.dataset.answer));
 f.textContent=ok?'All cards are in the correct categories.':'Some cards are in the wrong category — move them and try again.';
 f.className='feedback '+(ok?'ok':'bad');
 if(ok&&award(id,xp))f.innerHTML+=` <b>+${xp} XP</b>`;
}
function dragSearchMarker(e){e.dataTransfer.setData('text/plain','search-marker')}
function expectedSearchSequence(mode,vals,target){
 if(mode==='linear'){
   const out=[];for(let i=0;i<vals.length;i++){out.push(i);if(vals[i]===target)break}return out;
 }
 let lo=0,hi=vals.length-1,out=[];
 while(lo<=hi){
   const mid=Math.floor((lo+hi)/2);out.push(mid);
   if(vals[mid]===target)break;
   if(target<vals[mid])hi=mid-1;else lo=mid+1;
 }
 return out;
}
function dropSearchMarker(e,cell){
 e.preventDefault();
 const sim=cell.closest('.search-sim'),idx=Number(cell.dataset.index);
 let seq=JSON.parse(sim.dataset.seq||'[]');
 if(seq.includes(idx) && seq[seq.length-1]===idx)return;
 seq.push(idx);sim.dataset.seq=JSON.stringify(seq);
 cell.classList.add('searched');
 const marker=sim.querySelector('.search-marker');cell.appendChild(marker);
 sim.querySelector('.search-count').textContent=seq.length;
}
function checkSearchSim(btn){
 const sim=btn.closest('.search-sim'),vals=[...sim.querySelectorAll('.search-cell')].map(c=>Number(c.dataset.value)),
 target=Number(sim.dataset.target),seq=JSON.parse(sim.dataset.seq||'[]'),exp=expectedSearchSequence(sim.dataset.mode,vals,target),
 f=sim.querySelector('.feedback');
 const ok=seq.join('|')===exp.join('|');
 f.textContent=ok?'Correct — you carried out the search in the correct sequence.':'Not yet — reset and follow the search rule carefully.';
 f.className='feedback '+(ok?'ok':'bad');
 if(ok&&award(sim.dataset.id,Number(sim.dataset.xp)))f.innerHTML+=` <b>+${sim.dataset.xp} XP</b>`;
}
function resetSearchSim(btn){
 const sim=btn.closest('.search-sim');sim.dataset.seq='[]';
 sim.querySelectorAll('.search-cell').forEach(c=>c.classList.remove('searched'));
 sim.querySelector('.search-count').textContent='0';
 const marker=sim.querySelector('.search-marker');
 sim.insertBefore(marker,sim.querySelector('.drag-tip'));
 sim.querySelector('.feedback').textContent='';
}
function dragSortCard(e){e.dataTransfer.setData('text/plain',e.target.dataset.value)}
function dropMergeCard(e,zone){
 e.preventDefault();
 const val=e.dataTransfer.getData('text/plain'),sim=zone.closest('.merge-sim');
 const source=[...sim.querySelectorAll('.merge-source .sort-card')].find(c=>c.dataset.value===val);
 if(source){zone.querySelector('.placeholder')?.remove();zone.appendChild(source)}
}
function checkSortSim(btn){
 const sim=btn.closest('.sort-sim'),ans=JSON.parse(sim.dataset.answer),f=sim.querySelector('.feedback');
 let got;
 if(sim.dataset.mode==='merge')got=[...sim.querySelectorAll('.merge-output .sort-card')].map(c=>Number(c.dataset.value));
 else got=[...sim.querySelectorAll('.sort-drag-row .sort-card')].map(c=>Number(c.dataset.value));
 const ok=got.length===ans.length && got.every((v,i)=>v===ans[i]);
 f.textContent=ok?'Correct — the values are in the right order.':'Not yet — keep rearranging the values and try again.';
 f.className='feedback '+(ok?'ok':'bad');
 if(ok&&award(sim.dataset.id,Number(sim.dataset.xp)))f.innerHTML+=` <b>+${sim.dataset.xp} XP</b>`;
}
function resetSortSim(btn){location.reload()}


function selectMCQ(btn){
 const box=btn.closest('.task');
 box.querySelectorAll('.option').forEach(b=>b.classList.remove('selected'));
 btn.classList.add('selected');
 const f=box.querySelector('.feedback');
 if(f){f.textContent='';f.className='feedback'}
}

function checkMCQ(btn,ans,id,xp,why){
 const box=btn.closest('.task'), selected=box.querySelector('.option.selected'), f=box.querySelector('.feedback');
 if(!selected){
   f.textContent='Select an answer before checking.';
   f.className='feedback bad';
   return;
 }
 const ok=Number(selected.dataset.v)===Number(ans);
 box.querySelectorAll('.option').forEach(b=>b.classList.remove('correct','wrong'));
 selected.classList.add(ok?'correct':'wrong');
 f.textContent=(ok?'Correct. ':'Not quite — try again. ')+(why||'');
 f.className='feedback '+(ok?'ok':'bad');
 if(ok&&award(id,xp))f.innerHTML+=` <b>+${xp} XP</b>`;
}

function isBinaryArea(topic,sub){
 const ids=['binary-basics','signed-unsigned','binary-conversion','binary-addition','binary-shifts','overflow','hexadecimal','signed-binary','binary-arithmetic'];
 return (topic.id==='data-representation'||topic.id==='data') && ids.includes(sub.id);
}

function binaryValues(n){
 if(n===4)return [8,4,2,1];
 if(n===8)return [128,64,32,16,8,4,2,1];
 return Array.from({length:n},(_,i)=>Math.pow(2,n-1-i));
}

function binaryTable(bits,label='Binary value'){
 const clean=String(bits).replace(/\s/g,'');
 const vals=binaryValues(clean.length);
 if(!/^[01]+$/.test(clean))return '';
 return `<div class="binary-context">
   <div class="binary-caption">${label}</div>
   <div class="binary-table-wrap"><table class="binary-table">
     <thead><tr>${vals.map(v=>`<th>${v}</th>`).join('')}</tr></thead>
     <tbody><tr>${clean.split('').map(b=>`<td>${b}</td>`).join('')}</tr></tbody>
   </table></div>
 </div>`;
}

function binaryHelper(topic,sub,t){
 if(!isBinaryArea(topic,sub))return '';
 const q=String(t.q||'');
 const matches=q.match(/\b[01]{4,16}\b/g)||[];
 if(matches.length){
   return `<div class="binary-helper"><div class="binary-instruction">Binary work is shown in place-value tables. Read place values left → right; when entering an answer, start at the <b>1</b> column and work right → left.</div>${matches.map((m,i)=>binaryTable(m,matches.length>1?`Binary value ${i+1}`:'Binary value')).join('')}</div>`;
 }
 const vals=[128,64,32,16,8,4,2,1];
 return `<div class="binary-helper"><div class="binary-instruction">Use the 8-bit place-value table. Enter binary answers from the <b>1</b> column towards <b>128</b> (right → left).</div><div class="binary-table-wrap"><table class="binary-table blank"><thead><tr>${vals.map(v=>`<th>${v}</th>`).join('')}</tr></thead><tbody><tr>${vals.map(()=>'<td>·</td>').join('')}</tr></tbody></table></div></div>`;
}

function binaryEntry(answer,id,xp,hint){
 const clean=String(answer).replace(/\s/g,'');
 const vals=binaryValues(clean.length);
 return `<div class="binary-entry-block">
   <div class="binary-entry-title">Enter your binary answer right → left</div>
   <div class="binary-entry-note">Start in the <b>${vals[vals.length-1]}</b> column. After each 0 or 1, focus moves one place left automatically.</div>
   <div class="binary-table-wrap"><table class="binary-table binary-entry-table">
     <thead><tr>${vals.map(v=>`<th>${v}</th>`).join('')}</tr></thead>
     <tbody><tr>${vals.map((v,j)=>`<td><input class="bit-input ${j===vals.length-1?'start-bit':''}" type="text" inputmode="numeric" maxlength="1" pattern="[01]" data-pos="${j}" aria-label="${v} column" oninput="binaryDigit(this)"></td>`).join('')}</tr></tbody>
   </table></div>
   <button type="button" class="btn check-btn" onclick='binaryCheck(this,${JSON.stringify(clean)},${JSON.stringify(id)},${xp},${JSON.stringify(hint||"")})'>Check answer</button>
   <div class="feedback"></div>
 </div>`;
}

function binaryDigit(inp){
 inp.value=inp.value.replace(/[^01]/g,'').slice(-1);
 if(!inp.value)return;
 const ins=[...inp.closest('.binary-entry-block').querySelectorAll('.bit-input')];
 const idx=ins.indexOf(inp);
 if(idx>0)ins[idx-1].focus();
}

function binaryCheck(btn,answer,id,xp,hint){
 const box=btn.closest('.task'), ins=[...box.querySelectorAll('.bit-input')], f=box.querySelector('.feedback');
 const got=ins.map(i=>i.value).join('');
 if(ins.some(i=>i.value==='')){
   f.textContent='Complete every binary column before checking.';
   f.className='feedback bad';
   return;
 }
 const ok=got===String(answer);
 f.textContent=ok?'Correct.':`Not yet. ${hint||'Check each place value and work from right to left.'}`;
 f.className='feedback '+(ok?'ok':'bad');
 ins.forEach((i,j)=>{i.classList.toggle('bit-wrong',!ok && i.value!==String(answer)[j]);});
 if(ok&&award(id,xp))f.innerHTML+=` <b>+${xp} XP</b>`;
}


function move(btn,dir){const row=btn.parentElement,zone=row.parentElement,target=dir<0?row.previousElementSibling:row.nextElementSibling;if(target)zone.insertBefore(dir<0?row:target,dir<0?target:row)}
function checkOrder(btn,ans,id,xp){const box=btn.closest('.task'),got=[...box.querySelectorAll('.token')].map(e=>e.dataset.key),ok=got.join('|')===ans.join('|'),f=box.querySelector('.feedback');f.textContent=ok?'Correct sequence.':'Not yet — review what must happen before the next step.';f.className='feedback '+(ok?'ok':'bad');if(ok&&award(id,xp))f.innerHTML+=` <b>+${xp} XP</b>`}
function checkClassify(btn,id,xp){const box=btn.closest('.task'),sels=[...box.querySelectorAll('select')],f=box.querySelector('.feedback');if(sels.some(s=>s.value==='')){f.textContent='Make a choice for every row before checking.';f.className='feedback bad';return}const ok=sels.every(s=>Number(s.value)===Number(s.dataset.a));f.textContent=ok?'All classifications correct.':'Some choices are not correct yet — change them and check again.';f.className='feedback '+(ok?'ok':'bad');if(ok&&award(id,xp))f.innerHTML+=` <b>+${xp} XP</b>`}
function shortCheck(btn,id,xp,hint){const box=btn.closest('.task'),inp=box.querySelector('input[data-keys]'),keys=JSON.parse(inp.dataset.keys),v=inp.value.toLowerCase(),f=box.querySelector('.feedback');if(!v.trim()){f.textContent='Type an answer before checking.';f.className='feedback bad';return}const ok=keys.every(k=>v.includes(String(k).toLowerCase()));f.textContent=ok?'Good — your answer includes the key idea.':'Develop it further. '+hint;f.className='feedback '+(ok?'ok':'bad');if(ok&&award(id,xp))f.innerHTML+=` <b>+${xp} XP</b>`}
function numberCheck(btn,id,xp,hint){const box=btn.closest('.task'),inp=box.querySelector('input[data-answer]'),norm=s=>s.trim().toLowerCase().replace(/\s+/g,''),f=box.querySelector('.feedback');if(!inp.value.trim()){f.textContent='Enter an answer before checking.';f.className='feedback bad';return}const ok=norm(inp.value)===norm(inp.dataset.answer);f.textContent=ok?'Correct.':'Not yet. '+hint;f.className='feedback '+(ok?'ok':'bad');if(ok&&award(id,xp))f.innerHTML+=` <b>+${xp} XP</b>`}
function traceCheck(btn,id,xp){const box=btn.closest('.task'),ins=[...box.querySelectorAll('input[data-answer]')],norm=s=>s.trim().toLowerCase(),f=box.querySelector('.feedback');if(ins.some(i=>!i.value.trim())){f.textContent='Complete every answer box before checking.';f.className='feedback bad';return}const ok=ins.every(i=>norm(i.value)===norm(i.dataset.answer));f.textContent=ok?'Correct.':'At least one value is wrong — review it and try again.';f.className='feedback '+(ok?'ok':'bad');if(ok&&award(id,xp))f.innerHTML+=` <b>+${xp} XP</b>`}
function bossDone(btn,id,xp){const box=btn.closest('.task'),txt=box.querySelector('textarea').value.trim(),f=box.querySelector('.feedback');if(txt.length<40){f.textContent='Add more detail before checking this response.';f.className='feedback bad';return}f.textContent='Detailed response recorded. Compare your reasoning with your notes or teacher model.';f.className='feedback ok';if(award(id,xp))f.innerHTML+=` <b>+${xp} XP</b>`}

function resetProgress(){if(confirm('Reset all Year 9 Spec Hub progress on this device?')){localStorage.removeItem(STORE);render()}}
window.addEventListener('hashchange',render);window.addEventListener('DOMContentLoaded',render);
