
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const PROGRAM = [
  {
    id:"A",name:"Corps complet A",focus:"Accent haut du dos",duration45:"45–50 min",duration60:"55–60 min",
    exercises:[
      {id:"leg_press",name:"Presse à jambes",muscles:"Quadriceps • fessiers",sets:3,min:8,max:12,rest:120,start:90,step:10},
      {id:"chest_press",name:"Développé poitrine à la machine",muscles:"Pectoraux • triceps",sets:3,min:8,max:12,rest:90,start:40,step:5},
      {id:"supported_row",name:"Rowing poitrine appuyée",muscles:"Haut/milieu du dos • biceps",sets:3,min:8,max:12,rest:90,start:40,step:5,note:"Garde le cou neutre et évite de hausser les épaules.",priority:true},
      {id:"lat_pulldown",name:"Tirage vertical",muscles:"Dorsaux • haut du dos",sets:2,min:8,max:12,rest:90,start:50,step:5,priority:true},
      {id:"lateral_raise",name:"Élévations latérales",muscles:"Épaules",sets:2,min:12,max:15,rest:60,start:10,step:5,accessory:true},
      {id:"curl",name:"Curl biceps",muscles:"Biceps",sets:2,min:10,max:15,rest:60,start:15,step:5,accessory:true},
      {id:"pushdown",name:"Extension triceps à la poulie",muscles:"Triceps",sets:2,min:10,max:15,rest:60,start:20,step:5,accessory:true},
      {id:"bikeA",name:"Vélo",type:"cardio",minutes:8,minutes60:10}
    ]
  },
  {
    id:"B",name:"Corps complet B",focus:"Posture • épaules • jambes",duration45:"45–50 min",duration60:"55–60 min",
    exercises:[
      {id:"hack_squat",name:"Hack squat",muscles:"Quadriceps • fessiers",sets:3,min:8,max:12,rest:120,start:50,step:10},
      {id:"leg_curl",name:"Leg curl assis",muscles:"Ischio-jambiers",sets:3,min:10,max:15,rest:90,start:40,step:5},
      {id:"incline_press",name:"Développé incliné avec haltères",muscles:"Haut des pectoraux • épaules",sets:3,min:8,max:12,rest:90,start:15,step:5},
      {id:"cable_row",name:"Rowing assis à la poulie",muscles:"Milieu du dos • biceps",sets:3,min:8,max:12,rest:90,start:40,step:5,note:"Ne pousse pas la tête vers l’avant pendant le tirage.",priority:true},
      {id:"reverse_pec",name:"Reverse pec deck",muscles:"Arrière d’épaules • haut du dos",sets:2,min:12,max:15,rest:60,start:25,step:5,priority:true},
      {id:"lateral_raiseB",name:"Élévations latérales",muscles:"Épaules",sets:2,min:12,max:15,rest:60,start:10,step:5,accessory:true},
      {id:"bird_dog",name:"Bird dog",muscles:"Tronc • contrôle",sets:2,min:8,max:8,rest:45,start:0,step:0,bodyweight:true},
      {id:"neck_iso",name:"Isométriques cervicaux légers",muscles:"Cou • contrôle",sets:2,min:4,max:4,rest:30,start:0,step:0,bodyweight:true,neck:true,note:"Pression légère 5 secondes devant, derrière et de chaque côté. Aucun effort maximal."}
    ]
  },
  {
    id:"C",name:"Corps complet C",focus:"Dos • chaîne postérieure",duration45:"45–50 min",duration60:"55–60 min",
    exercises:[
      {id:"leg_pressC",name:"Presse à jambes",muscles:"Quadriceps • fessiers",sets:3,min:10,max:12,rest:120,start:90,step:10},
      {id:"rdl",name:"Soulevé de terre roumain avec haltères",muscles:"Ischio-jambiers • fessiers",sets:2,min:8,max:12,rest:120,start:20,step:5,note:"Commence très léger. Garde le dos neutre et apprends le mouvement avant de charger."},
      {id:"chest_pressC",name:"Développé poitrine à la machine",muscles:"Pectoraux • triceps",sets:3,min:8,max:12,rest:90,start:40,step:5},
      {id:"supported_rowC",name:"Rowing poitrine appuyée",muscles:"Haut/milieu du dos",sets:3,min:8,max:12,rest:90,start:40,step:5,priority:true},
      {id:"lat_pulldownC",name:"Tirage vertical",muscles:"Dorsaux • haut du dos",sets:2,min:8,max:12,rest:90,start:50,step:5,priority:true},
      {id:"reverse_pecC",name:"Reverse pec deck",muscles:"Arrière d’épaules • haut du dos",sets:2,min:12,max:15,rest:60,start:25,step:5,priority:true},
      {id:"hammer_curl",name:"Curl marteau",muscles:"Biceps • avant-bras",sets:2,min:10,max:15,rest:60,start:15,step:5,accessory:true},
      {id:"pushdownC",name:"Triceps à la poulie",muscles:"Triceps",sets:2,min:10,max:15,rest:60,start:20,step:5,accessory:true},
      {id:"bikeC",name:"Vélo",type:"cardio",minutes:8,minutes60:10}
    ]
  }
];

const SUBS = {
  supported_row:["Rowing assis à la poulie","Rowing machine convergente","Rowing haltères poitrine appuyée"],
  supported_rowC:["Rowing assis à la poulie","Rowing machine convergente","Rowing haltères poitrine appuyée"],
  cable_row:["Rowing poitrine appuyée","Rowing machine convergente"],
  lat_pulldown:["Tractions assistées","Tirage vertical prise neutre"],
  lat_pulldownC:["Tractions assistées","Tirage vertical prise neutre"],
  reverse_pec:["Face pull à la poulie","Écarté inversé avec haltères légers"],
  reverse_pecC:["Face pull à la poulie","Écarté inversé avec haltères légers"],
  leg_press:["Hack squat","Goblet squat"],
  leg_pressC:["Hack squat","Goblet squat"],
  chest_press:["Développé haltères","Développé guidé"],
  chest_pressC:["Développé haltères","Développé guidé"]
};

const DEFAULT = {
  onboarded:false,route:"home",unit:"lb",theme:"dark",sessionLength:60,
  daysPerWeek:3,goal:"Prendre du muscle",history:[],active:null,timer:null,
  profile:{level:"Débutant",weight:140,height:"5'6\"",neckFocus:true,cardio:true},
  bodyMetrics:[],settings:{vibration:true,sound:false,showPain:true}
};

let state = load();
let timerInterval=null;
const main=$("#main"), pageTitle=$("#pageTitle"), modalRoot=$("#modalRoot");

function clone(o){ return JSON.parse(JSON.stringify(o)); }
function load(){ try{return {...clone(DEFAULT),...JSON.parse(localStorage.getItem("stronger_v2")||"{}")}}catch{return clone(DEFAULT)} }
function save(){ localStorage.setItem("stronger_v2",JSON.stringify(state)); applyTheme(); }
function applyTheme(){ document.body.classList.toggle("light",state.theme==="light"); }
function toast(msg){ const t=$("#toast"); t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200); }
function fmtDate(ts){ return new Date(ts).toLocaleDateString("fr-CA",{year:"numeric",month:"short",day:"numeric"}); }
function workout(id){ return PROGRAM.find(w=>w.id===id); }
function currentWeekHistory(){
  const n=new Date(), d=n.getDay(), m=new Date(n); m.setDate(n.getDate()+(d===0?-6:1-d));m.setHours(0,0,0,0);
  return state.history.filter(h=>h.completedAt>=m.getTime());
}
function nextWorkout(){
  if(!state.history.length)return PROGRAM[0];
  const idx=PROGRAM.findIndex(w=>w.id===state.history[state.history.length-1].workoutId);
  return PROGRAM[(idx+1)%PROGRAM.length];
}
function allExerciseDefs(){ return PROGRAM.flatMap(w=>w.exercises); }
function defById(id){ return allExerciseDefs().find(e=>e.id===id); }
function previousRecord(id){
  for(let i=state.history.length-1;i>=0;i--){const r=state.history[i].exercises.find(e=>e.exerciseId===id);if(r)return r;}
  return null;
}
function lastWorkingWeight(id){
  const p=previousRecord(id); if(!p)return null;
  const weights=p.sets?.map(s=>Number(s.weight)).filter(Boolean)||[];
  return weights.length?weights[0]:null;
}
function recommendedWeight(ex){
  if(ex.bodyweight)return 0;
  const p=previousRecord(ex.id);
  if(!p)return ex.start;
  const sets=(p.sets||[]).filter(s=>s.completed&&Number(s.reps)>0);
  if(!sets.length)return ex.start;
  const avgReps=sets.reduce((a,s)=>a+Number(s.reps),0)/sets.length;
  const avgFeel=sets.reduce((a,s)=>a+(s.feel||2),0)/sets.length; // 1 easy,2 good,3 hard,4 pain/bad
  let w=Number(sets[0].weight)||ex.start;
  if(sets.some(s=>s.feel===4)) return Math.max(0,w-(ex.step||0));
  const allTop=sets.length>=ex.sets && sets.every(s=>Number(s.reps)>=ex.max);
  if(allTop && avgFeel<=2.4) w += ex.step||0;
  else if(avgReps<ex.min && avgFeel>=3) w = Math.max(0,w-(ex.step||0));
  return w;
}
function targetText(ex){
  if(ex.type==="cardio") return `${state.sessionLength===45?ex.minutes:ex.minutes60||ex.minutes} min à intensité modérée`;
  if(ex.bodyweight)return ex.neck?"2 séries légères • 5 secondes dans chaque direction":`${ex.sets} séries de ${ex.min} répétitions`;
  const w=recommendedWeight(ex);
  return `Commence à ${w} ${state.unit} • vise ${Math.round((ex.min+ex.max)/2)} reps`;
}
function route(r){state.route=r;save(); $$(".navBtn").forEach(b=>b.classList.toggle("active",b.dataset.route===r));render();}
$$(".navBtn").forEach(b=>b.onclick=()=>route(b.dataset.route));
$("#settingsBtn").onclick=()=>openSettings();

function render(){
  if(!state.onboarded){ renderOnboarding(); return; }
  if(state.active){ renderActive(); return; }
  ({home:renderHome,program:renderProgram,progress:renderProgress,history:renderHistory}[state.route]||renderHome)();
}
function renderOnboarding(){
  pageTitle.textContent="Bienvenue";
  const step=state._onStep||1;
  const selections=state._onSel||{level:"Débutant",goal:"Prendre du muscle",days:3,length:60};
  main.innerHTML=`<section class="onboarding">
    <div class="step">ÉTAPE ${step} SUR 4</div>
    ${step===1?`<h2>Ton niveau</h2><p class="muted">L’app adaptera ses explications et ses recommandations.</p>
      <div class="optionList">${["Débutant","Intermédiaire"].map(x=>`<button class="option ${selections.level===x?"selected":""}" onclick="onSel('level','${x}')">${x}</button>`).join("")}</div>`:""}
    ${step===2?`<h2>Ton objectif principal</h2><div class="optionList">${["Prendre du muscle","Être plus fort","Recomposition"].map(x=>`<button class="option ${selections.goal===x?"selected":""}" onclick="onSel('goal','${x}')">${x}</button>`).join("")}</div>`:""}
    ${step===3?`<h2>Ton rythme</h2><p class="muted">Nous avons préparé 3 séances corps complet par semaine.</p>
      <div class="choiceGrid"><button class="choiceBtn selected">3 jours/semaine</button><button class="choiceBtn">45–60 min</button></div>`:""}
    ${step===4?`<h2>Prêt à commencer 💪</h2><div class="card"><strong>Plan personnalisé</strong><p class="muted">Muscle partout • accent haut du dos/cou/posture • cardio vélo léger • recommandations automatiques.</p></div>
      <p class="small warning">Pour le cou, l’app reste volontairement prudente. Une douleur marquée, un mal de tête déclenché, des engourdissements ou des étourdissements = arrêt de l’exercice concerné.</p>`:""}
    <button class="primary" onclick="${step<4?"nextOnboarding()":"finishOnboarding()"}">${step<4?"CONTINUER":"COMMENCER"}</button>
  </section>`;
}
window.onSel=(k,v)=>{state._onSel={...(state._onSel||{}),[k]:v};save();renderOnboarding()}
window.nextOnboarding=()=>{state._onStep=(state._onStep||1)+1;save();renderOnboarding()}
window.finishOnboarding=()=>{const s=state._onSel||{};state.profile.level=s.level||"Débutant";state.goal=s.goal||"Prendre du muscle";state.onboarded=true;delete state._onStep;delete state._onSel;save();render();}

function renderHome(){
  pageTitle.textContent="Aujourd’hui";
  const next=nextWorkout(), wk=currentWeekHistory().length;
  main.innerHTML=`
  <section class="card hero">
    <div class="kicker">PROCHAINE SÉANCE</div>
    <div class="heroTitle">${next.name}</div>
    <p class="muted">${next.focus}<br>⏱ ${state.sessionLength===45?next.duration45:next.duration60}</p>
    <div class="coachBox"><strong>🎯 Recommandation</strong>Commence par la séance proposée. L’app te dira quelle charge essayer pour chaque exercice.</div>
    <button class="primary" onclick="preWorkout('${next.id}')">COMMENCER MA SÉANCE</button>
  </section>
  <h2 class="sectionTitle">Cette semaine</h2>
  <section class="card"><strong>${Math.min(wk,3)} / 3 séances</strong><div class="weekDots">${[0,1,2].map(i=>`<i class="${i<wk?"done":""}"></i>`).join("")}</div></section>
  <div class="grid2">
    <div class="metric"><strong>${state.history.length}</strong><small>Séances</small></div>
    <div class="metric"><strong>${totalSets()}</strong><small>Séries complétées</small></div>
  </div>
  <h2 class="sectionTitle">Conseil débutant</h2>
  <section class="card"><strong>Tu n’as pas besoin de deviner tes poids.</strong><p class="muted">À ta première séance, commence avec la charge suggérée. Après chaque série, indique si c’était trop facile, bien, très difficile ou douloureux. STRONGER ajustera les recommandations.</p></section>`;
}
function preWorkout(id){
  if(state.settings.showPain){
    openModal(`<div class="handle"></div><h2>Avant la séance</h2><p class="muted">Comment va ton cou / haut du dos maintenant?</p>
      ${painScale("prePain")}<button class="primary" onclick="startWorkout('${id}')">CONTINUER</button>`);
  } else startWorkout(id);
}
function painScale(key){
  const v=state._pain?.[key];
  return `<div class="painScale">${[0,2,4,6,8,10].map(n=>`<button class="${v===n?"sel":""}" onclick="setPain('${key}',${n})">${n}</button>`).join("")}</div>`;
}
window.setPain=(k,v)=>{state._pain={...(state._pain||{}),[k]:v};save();renderModalPain()}
function renderModalPain(){ const ov=$(".modal"); if(!ov)return; const btn=ov.querySelector(".primary"); const id=btn?.getAttribute("onclick")?.match(/'([^']+)'/)?.[1]; if(id) preWorkout(id); }

function filteredExercises(w){
  if(state.sessionLength===60)return w.exercises;
  return w.exercises.filter(e=>!e.accessory || e.priority);
}
function startWorkout(id){
  const w=workout(id), exs=filteredExercises(w);
  state.active={workoutId:id,startedAt:Date.now(),prePain:state._pain?.prePain??null,currentIndex:0,
    exercises:exs.map(e=>({exerciseId:e.id,sets:e.type==="cardio"?[]:Array.from({length:e.sets},()=>({weight:e.bodyweight?"":recommendedWeight(e),reps:"",completed:false,feel:null})),cardioCompleted:false,skipped:false,substitute:null}))};
  delete state._pain; modalRoot.innerHTML="";save();renderActive();
}
function currentExercise(){
  const w=workout(state.active.workoutId), rec=state.active.exercises[state.active.currentIndex];
  const def=w.exercises.find(e=>e.id===rec.exerciseId);return {def,rec};
}
function renderActive(){
  const w=workout(state.active.workoutId), {def,rec}=currentExercise();
  pageTitle.textContent=w.name;
  const idx=state.active.currentIndex, total=state.active.exercises.length;
  main.innerHTML=`
    <div class="row"><span class="badge">EXERCICE ${idx+1}/${total}</span><span class="muted small">${Math.round((Date.now()-state.active.startedAt)/60000)} min</span></div>
    <section class="card hero" style="margin-top:10px">
      <div class="kicker">${def.muscles||"CARDIO"}</div>
      <div class="heroTitle">${rec.substitute||def.name}</div>
      <p class="muted">${def.type==="cardio"?targetText(def):`${def.sets} séries • ${def.min}–${def.max} répétitions • repos ${def.rest}s`}</p>
      ${def.note?`<div class="tip">💡 ${def.note}</div>`:""}
      <div class="coachBox"><strong>🤖 Fais ceci aujourd’hui</strong>${targetText(def)}</div>
      ${renderCurrentExercise(def,rec)}
    </section>
    ${state.timer?renderTimer():""}
    <button class="secondary" onclick="showHowTo('${def.id}')">❓ COMMENT FAIRE CET EXERCICE</button>
    ${SUBS[def.id]?`<button class="secondary" onclick="showSubstitutes('${def.id}')">🔄 MACHINE OCCUPÉE / REMPLACER</button>`:""}
    <button class="secondary" onclick="skipExercise()">PASSER CET EXERCICE</button>
    <button class="danger" onclick="cancelWorkout()">ANNULER LA SÉANCE</button>`;
  if(state.timer) updateTimer();
}
function renderCurrentExercise(def,rec){
  if(def.type==="cardio"){
    const mins=state.sessionLength===45?def.minutes:(def.minutes60||def.minutes);
    return `<div style="margin-top:16px"><div class="bigNumber">${mins}:00</div><p class="muted">Intensité modérée : tu respires plus fort, mais tu peux encore parler.</p>
      <button class="primary" onclick="completeCardio()">${rec.cardioCompleted?"✓ TERMINÉ":"MARQUER LE CARDIO TERMINÉ"}</button></div>`;
  }
  const prev=previousRecord(def.id);
  return `${prev?`<div class="tip">Dernière séance : ${formatPrevious(prev)}</div>`:`<div class="tip">Première séance : utilise la charge proposée comme point de départ. Si elle est clairement trop lourde, baisse-la.</div>`}
    ${rec.sets.map((s,i)=>`<div class="setRow">
      <div class="muted small">S${i+1}</div>
      <input class="setInput" type="number" inputmode="decimal" value="${s.weight}" placeholder="${state.unit}" onchange="updateSet(${i},'weight',this.value)">
      <input class="setInput" type="number" inputmode="numeric" value="${s.reps}" placeholder="reps" onchange="updateSet(${i},'reps',this.value)">
      <button class="checkBtn ${s.completed?"done":""}" onclick="finishSet(${i})">✓</button>
    </div>`).join("")}
    ${rec.sets.some(s=>s.completed&&!s.feel)?`<div class="coachBox"><strong>Comment était ta dernière série?</strong>
      <div class="choiceGrid">
        <button class="choiceBtn" onclick="setFeel(1)">🙂 Trop facile</button>
        <button class="choiceBtn" onclick="setFeel(2)">✅ Bien</button>
        <button class="choiceBtn" onclick="setFeel(3)">😰 Très difficile</button>
        <button class="choiceBtn" onclick="setFeel(4)">⚠️ Douleur / mauvaise technique</button>
      </div></div>`:""}
    ${allSetsDone(rec)?`<button class="primary" onclick="nextExercise()">EXERCICE SUIVANT →</button>`:""}`;
}
function formatPrevious(r){return (r.sets||[]).filter(s=>s.weight||s.reps).map(s=>`${s.weight||"—"} ${state.unit} × ${s.reps||"—"}`).join(" • ")}
window.updateSet=(i,k,v)=>{state.active.exercises[state.active.currentIndex].sets[i][k]=v;save();}
function finishSet(i){
  const {def,rec}=currentExercise(), s=rec.sets[i]; if(!s.reps){toast("Entre d’abord le nombre de répétitions.");return}
  s.completed=!s.completed;if(s.completed){s.feel=null;startTimer(def.rest)}save();renderActive();
}
function setFeel(v){
  const {def,rec}=currentExercise(); const last=[...rec.sets].reverse().find(s=>s.completed&&!s.feel); if(!last)return;
  last.feel=v;
  if(v===1 && def.step && !def.bodyweight){toast(`Série facile : tu peux essayer +${def.step} ${state.unit} à la prochaine série.`)}
  if(v===3){toast("Garde la même charge ou baisse légèrement si la technique se dégrade.")}
  if(v===4){toast("Ne force pas. Réduis ou arrête cet exercice si la douleur persiste.")}
  save();renderActive();
}
window.setFeel=setFeel;
function allSetsDone(rec){return rec.sets.length&&rec.sets.every(s=>s.completed)}
function completeCardio(){const {rec}=currentExercise();rec.cardioCompleted=true;save();nextExercise();}
function nextExercise(){ if(state.active.currentIndex<state.active.exercises.length-1){state.active.currentIndex++;save();renderActive()}else postWorkout(); }
function skipExercise(){const r=state.active.exercises[state.active.currentIndex];r.skipped=true;save();nextExercise();}
function postWorkout(){
  if(state.settings.showPain){
    openModal(`<div class="handle"></div><h2>Fin de séance 🎉</h2><p class="muted">Comment va ton cou / haut du dos maintenant?</p>${painScale("postPain")}<button class="primary" onclick="finishWorkout()">TERMINER</button>`);
  } else finishWorkout();
}
function finishWorkout(){
  const w=workout(state.active.workoutId);
  state.history.push({...state.active,name:w.name,completedAt:Date.now(),postPain:state._pain?.postPain??null});
  state.active=null;state.timer=null;delete state._pain;save();modalRoot.innerHTML="";route("home");toast("Séance terminée. Beau travail 💪");
}
function cancelWorkout(){if(confirm("Annuler cette séance?")){state.active=null;state.timer=null;save();render();}}
function startTimer(sec){state.timer={end:Date.now()+sec*1000};save();clearInterval(timerInterval);timerInterval=setInterval(updateTimer,500)}
function renderTimer(){return `<div class="timer"><div><small class="muted">⏱ REPOS</small><strong id="timerValue">00:00</strong></div><button class="secondary" style="width:auto;margin:0" onclick="stopTimer()">PASSER</button></div>`}
function updateTimer(){if(!state.timer)return;const r=Math.max(0,state.timer.end-Date.now());if(r<=0){stopTimer();if(state.settings.vibration&&"vibrate"in navigator)navigator.vibrate([150,80,150]);toast("Repos terminé.");return}
  const s=Math.ceil(r/1000),m=Math.floor(s/60);const el=$("#timerValue");if(el)el.textContent=`${String(m).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;}
function stopTimer(){clearInterval(timerInterval);timerInterval=null;state.timer=null;save();renderActive();}
window.stopTimer=stopTimer;

function renderProgram(){
  pageTitle.textContent="Programme";
  main.innerHTML=PROGRAM.map(w=>`<section class="workoutCard">
    <div class="row"><div><div class="exerciseName">${w.name}</div><div class="exerciseMeta">${w.focus}</div></div><span class="badge">${w.id}</span></div>
    <p class="muted">${filteredExercises(w).length} exercices • ${state.sessionLength===45?w.duration45:w.duration60}</p>
    <button class="secondary" onclick="viewWorkout('${w.id}')">VOIR LA SÉANCE</button><button class="primary" onclick="preWorkout('${w.id}')">COMMENCER</button></section>`).join("");
}
function viewWorkout(id){
  const w=workout(id); openModal(`<div class="handle"></div><h2>${w.name}</h2><p class="muted">${w.focus}</p>${filteredExercises(w).map(e=>`<div class="exerciseCard"><div class="exerciseName">${e.name}</div><div class="exerciseMeta">${e.type==="cardio"?targetText(e):`${e.sets} × ${e.min}–${e.max} • repos ${e.rest}s`}</div><div class="coachBox"><strong>Recommandation</strong>${targetText(e)}</div></div>`).join("")}<button class="primary" onclick="preWorkout('${id}')">COMMENCER</button>`);
}
function renderHistory(){
  pageTitle.textContent="Historique";
  if(!state.history.length){main.innerHTML=`<div class="empty">🗓️<h3>Aucune séance</h3><p>Ton historique apparaîtra ici.</p></div>`;return}
  main.innerHTML=`<section class="card">${[...state.history].reverse().map(h=>`<div class="historyItem"><div class="row"><div><strong>${h.name}</strong><div class="muted small">${fmtDate(h.completedAt)} • ${Math.round((h.completedAt-h.startedAt)/60000)} min</div></div><span class="badge">${countCompletedSets(h)} séries</span></div>${h.prePain!=null?`<div class="muted small" style="margin-top:6px">Cou/dos : ${h.prePain}/10 → ${h.postPain??"—"}/10</div>`:""}</div>`).join("")}</section>`;
}
function totalSets(){return state.history.reduce((a,h)=>a+countCompletedSets(h),0)}
function countCompletedSets(h){return h.exercises.reduce((a,e)=>a+(e.sets||[]).filter(s=>s.completed).length,0)}
function exerciseStats(){
  const map={};for(const h of state.history){for(const r of h.exercises){const d=defById(r.exerciseId);if(!d||d.type==="cardio"||d.bodyweight)continue;
    for(const s of r.sets||[]){const w=Number(s.weight), reps=Number(s.reps);if(!w||!reps)continue;map[d.id]??={name:d.name,points:[],best:0};map[d.id].best=Math.max(map[d.id].best,w);map[d.id].points.push({t:h.completedAt,w})}}}return map;
}
function renderProgress(){
  pageTitle.textContent="Progrès"; const stats=exerciseStats(), arr=Object.values(stats);
  main.innerHTML=`<div class="grid2"><div class="metric"><strong>${state.history.length}</strong><small>Séances totales</small></div><div class="metric"><strong>${totalSets()}</strong><small>Séries totales</small></div></div>
  <h2 class="sectionTitle">Force</h2>${arr.length?arr.map((s,i)=>`<section class="card"><div class="row"><strong>${s.name}</strong><span class="badge">${s.best} ${state.unit}</span></div><div class="canvasWrap"><canvas id="chart${i}"></canvas></div></section>`).join(""):`<div class="empty">Termine quelques séances pour voir les graphiques.</div>`}
  <h2 class="sectionTitle">Mesures corporelles</h2><section class="card"><button class="primary" onclick="addMetric()">AJOUTER MON POIDS</button>${state.bodyMetrics.slice(-5).reverse().map(m=>`<div class="historyItem"><strong>${m.weight} ${state.unit}</strong><div class="muted small">${fmtDate(m.date)}</div></div>`).join("")}</section>`;
  arr.forEach((s,i)=>drawChart($("#chart"+i),s.points));
}
function drawChart(c,points){if(!c||!points.length)return;const rect=c.getBoundingClientRect(),dpr=devicePixelRatio||1;c.width=rect.width*dpr;c.height=rect.height*dpr;const x=c.getContext("2d");x.scale(dpr,dpr);const w=rect.width,h=rect.height,p=18,min=Math.min(...points.map(a=>a.w)),max=Math.max(...points.map(a=>a.w)),range=Math.max(1,max-min);x.strokeStyle=getComputedStyle(document.body).getPropertyValue("--accent").trim();x.lineWidth=3;x.beginPath();points.forEach((pt,i)=>{const xx=p+(w-p*2)*(i/Math.max(1,points.length-1)),yy=h-p-(h-p*2)*((pt.w-min)/range);i?x.lineTo(xx,yy):x.moveTo(xx,yy)});x.stroke();}
function addMetric(){const v=prompt(`Ton poids actuel en ${state.unit}:`);if(!v||isNaN(Number(v)))return;state.bodyMetrics.push({date:Date.now(),weight:Number(v)});save();renderProgress();}
window.addMetric=addMetric;

function openSettings(){
  openModal(`<div class="handle"></div><h2>Paramètres</h2>
    <label>Durée habituelle</label><select onchange="setSetting('sessionLength',Number(this.value))"><option value="45" ${state.sessionLength===45?"selected":""}>45 minutes</option><option value="60" ${state.sessionLength===60?"selected":""}>60 minutes</option></select>
    <label>Unité</label><select onchange="setSetting('unit',this.value)"><option ${state.unit==="lb"?"selected":""}>lb</option><option ${state.unit==="kg"?"selected":""}>kg</option></select>
    <label>Thème</label><select onchange="setSetting('theme',this.value)"><option value="dark" ${state.theme==="dark"?"selected":""}>Sombre</option><option value="light" ${state.theme==="light"?"selected":""}>Clair</option></select>
    <label>Suivi douleur cou/haut du dos</label><select onchange="setNested('showPain',this.value==='true')"><option value="true" ${state.settings.showPain?"selected":""}>Activé</option><option value="false" ${!state.settings.showPain?"selected":""}>Désactivé</option></select>
    <label>Vibration minuteur</label><select onchange="setNested('vibration',this.value==='true')"><option value="true" ${state.settings.vibration?"selected":""}>Activée</option><option value="false" ${!state.settings.vibration?"selected":""}>Désactivée</option></select>
    <button class="secondary" onclick="exportBackup()">📤 EXPORTER UNE SAUVEGARDE</button>
    <button class="secondary" onclick="document.getElementById('restore').click()">📥 IMPORTER UNE SAUVEGARDE</button>
    <input id="restore" type="file" accept=".json" hidden onchange="importBackup(this.files[0])">
    <button class="danger" onclick="resetApp()">EFFACER TOUTES LES DONNÉES</button>`);
}
window.setSetting=(k,v)=>{state[k]=v;save();render();toast("Paramètre enregistré.");}
window.setNested=(k,v)=>{state.settings[k]=v;save();toast("Paramètre enregistré.");}
function exportBackup(){const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`stronger-backup-${Date.now()}.json`;a.click();URL.revokeObjectURL(a.href);}
function importBackup(f){if(!f)return;const r=new FileReader();r.onload=()=>{try{state={...clone(DEFAULT),...JSON.parse(r.result)};save();modalRoot.innerHTML="";render();toast("Sauvegarde restaurée.")}catch{alert("Fichier invalide.")}};r.readAsText(f)}
function resetApp(){if(confirm("Effacer toutes les données STRONGER?")){localStorage.removeItem("stronger_v2");state=clone(DEFAULT);modalRoot.innerHTML="";save();render();}}
window.exportBackup=exportBackup;window.importBackup=importBackup;window.resetApp=resetApp;

function showHowTo(id){
  const e=defById(id); const instructions=e.neck?
    ["Assieds-toi ou tiens-toi droit.","Place la main contre le front, puis les côtés et l’arrière.","Pousse très légèrement sans laisser la tête bouger.","Tiens environ 5 secondes.","Arrête si cela déclenche clairement tes symptômes."]:
    ["Commence avec une charge contrôlable.","Garde une posture stable et le cou confortable.","Fais le mouvement lentement, sans élan.","Arrête la série avant que la technique se dégrade.","Si tu hésites sur la machine, demande à un employé du gym de te montrer son réglage."];
  openModal(`<div class="handle"></div><h2>${e.name}</h2><p class="muted">${e.muscles||""}</p><div class="tip"><strong>Comment faire</strong><ol>${instructions.map(x=>`<li>${x}</li>`).join("")}</ol></div>${e.note?`<div class="coachBox"><strong>À retenir</strong>${e.note}</div>`:""}`);
}
function showSubstitutes(id){
  const arr=SUBS[id]||[];openModal(`<div class="handle"></div><h2>Remplacer l’exercice</h2><p class="muted">Choisis une alternative si la machine est occupée ou inconfortable.</p>${arr.map(x=>`<button class="secondary" onclick="chooseSub('${x.replace(/'/g,"\\'")}')">${x}</button>`).join("")}`);
}
function chooseSub(name){state.active.exercises[state.active.currentIndex].substitute=name;save();modalRoot.innerHTML="";renderActive();toast("Exercice remplacé pour cette séance.");}
window.showHowTo=showHowTo;window.showSubstitutes=showSubstitutes;window.chooseSub=chooseSub;

function openModal(html){modalRoot.innerHTML=`<div class="modalOverlay" onclick="closeModal(event)"><div class="modal">${html}</div></div>`}
function closeModal(e){if(e.target.classList.contains("modalOverlay"))modalRoot.innerHTML=""}
window.closeModal=closeModal;

if("serviceWorker" in navigator){addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}))}
applyTheme();render();
