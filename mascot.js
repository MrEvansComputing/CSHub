
/* Non-destructive visual enhancement for the existing CS Spec Hub. */
(function(){'use strict';
 const base='../mascots/';
 const poses={welcome:'welcome',explain:'explain',think:'think',success:'happy',bad:'sad',warn:'warn',challenge:'challenge',complete:'trophy'};
 const img=(name)=>base+poses[name]+'.webp';
 function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function pop(kind,title,msg){
  const panel=document.querySelector('#hv-pop');if(!panel)return;
  panel.dataset.kind=kind;panel.querySelector('img').src=img(kind);panel.querySelector('img').alt=title;
  panel.querySelector('h3').textContent=title;panel.querySelector('p').textContent=msg;
  panel.classList.add('open');panel.querySelector('.hv-close').focus({preventScroll:true});
 }
 function decorate(){
  const app=document.querySelector('#app');if(!app)return;
  const hero=app.querySelector('.hero');
  if(hero&&!app.querySelector('.hv-guide-card')){
   let el=document.createElement('div');el.className='hv-guide-card';
   el.innerHTML='<img src="'+img('welcome')+'" alt="HV teacher mascot welcoming students"><div><h2>Your HV Computing Guide</h2><p>Choose a topic, practise your skills and build your XP. I will help explain tricky ideas, spot mistakes and celebrate your progress.</p></div>';
   hero.insertAdjacentElement('afterend',el);
  }
  const learn=app.querySelector('.learn');
  if(learn&&!learn.querySelector('.hv-mascot-tip')){
   let tip=document.createElement('div');tip.className='hv-mascot-tip';
   tip.innerHTML='<img src="'+img('explain')+'" alt="Mascot explaining"><span><b>Learning tip:</b> Read the worked example, then try changing one value and predicting what happens.</span><button type="button" class="hv-tip-action">Give me a tip</button>';
   learn.appendChild(tip);
  }
  app.querySelectorAll('.task.boss').forEach(t=>t.classList.add('hv-mastery'));
 }
 function setup(){
  const dock=document.createElement('button');dock.type='button';dock.className='hv-mascot-dock';dock.innerHTML='<img alt="HV Computing Guide" src="'+img('think')+'"><span>Need a hint?</span>';
  const panel=document.createElement('section');panel.id='hv-pop';panel.className='hv-mascot-pop';panel.setAttribute('role','status');panel.setAttribute('aria-live','polite');
  panel.innerHTML='<button type="button" class="hv-close" aria-label="Close mascot message">×</button><div class="hv-pop-row"><img alt="" src="'+img('think')+'"><div><h3></h3><p></p></div></div>';
  document.body.append(dock,panel);
  dock.addEventListener('click',()=>pop('think','Try this first','Read the example and identify the key term or rule. Then try a small test before choosing your answer.'));
  panel.querySelector('.hv-close').addEventListener('click',()=>panel.classList.remove('open'));
  document.addEventListener('click',function(e){
   if(e.target.closest('.hv-tip-action')){pop('explain','Spot the important step','Look at what the code or example changes, and explain why that change matters. Then apply the same idea to the next task.');return;}
   const btn=e.target.closest('button.check-btn');if(!btn)return;
   const task=btn.closest('.task');if(!task)return;
   // Check after existing inline JS has updated the feedback; do not alter scoring or task validation.
   setTimeout(()=>{
    const f=task.querySelector('.feedback');if(!f)return;
    const message=f.textContent.trim();if(!message)return;
    if(f.classList.contains('ok')){
     if(task.classList.contains('boss'))pop('complete','Mastery response recorded!', 'Your answer has been recorded. Remember: longer responses are not automatically marked for accuracy; compare them with your notes or a teacher model.');
     else pop('success','Excellent work!',message);
    }else if(f.classList.contains('bad')){
     const incomplete=/before checking|every row|every answer box|type an answer|enter an answer|add more detail|place every/i.test(message);
     pop(incomplete?'think':'bad',incomplete?'Have another go':'Not quite — try again',message);
    }
   },10);
  });
  window.addEventListener('hashchange',()=>{panel.classList.remove('open');setTimeout(decorate,20)});
  // render() replaces the #app contents. Observe only this element.
  const app=document.querySelector('#app');if(app){const obs=new MutationObserver(()=>{if(!app.querySelector('.hv-guide-card')&&app.querySelector('.hero') || app.querySelector('.learn:not(:has(.hv-mascot-tip))'))decorate()});obs.observe(app,{childList:true});}
  decorate();
 }
 window.HVMascot={decorate,pop};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
