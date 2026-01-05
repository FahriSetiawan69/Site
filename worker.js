export default {
  async fetch(req) {
    return new Response(html(), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
};

function html() {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Fish It – Multi Account Monitor</title>
<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0f172a;
  color: #e5e7eb;
}
h2 { margin: 0 0 6px 0; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
  padding: 12px;
}
.slot {
  background: #020617;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}
.slot:hover { border-color: #38bdf8; }
.small { font-size: 12px; color: #94a3b8; }
.quest {
  margin-top: 6px;
  background: #020617;
  padding: 6px;
  border-radius: 6px;
  border: 1px dashed #334155;
}
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.7);
  display: none;
  align-items: center;
  justify-content: center;
}
.modal.active { display: flex; }
.panel {
  width: 90%;
  max-width: 900px;
  background: #020617;
  border-radius: 10px;
  padding: 12px;
  border: 1px solid #334155;
}
.tabs button {
  margin-right: 6px;
}
.inventory {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px,1fr));
  gap: 8px;
  margin-top: 10px;
}
.item {
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 6px;
  text-align: center;
}
.item.zero { opacity: .35; }
.close {
  float: right;
  cursor: pointer;
  color: #f87171;
}
</style>
</head>

<body>

<h2 style="padding:12px">🎣 Fish It – Multi Account Monitor</h2>
<div class="grid" id="grid"></div>

<div class="modal" id="modal">
  <div class="panel">
    <span class="close" onclick="closeModal()">✖</span>
    <h3 id="detailTitle"></h3>

    <div class="tabs">
      <button onclick="showTab('inv')">Inventory</button>
      <button onclick="showTab('quest')">Quest</button>
    </div>

    <div id="invTab"></div>
    <div id="questTab" style="display:none"></div>
  </div>
</div>

<script>
/* ===== DUMMY DATA ===== */

const FISH = [
  "Blue Salmon","Golden Carp","Secret Tuna",
  "Red Snapper","Crystal Eel","Void Koi"
];

const QUESTS = {
  secret_hunter: {
    name: "Secret Hunter",
    objectives: { "Secret Tuna": 2, "Golden Carp": 1 }
  }
};

const slots = Array.from({length:16}).map((_,i)=>({
  id: i,
  username: "Account_"+(i+1),
  gold: Math.floor(Math.random()*5000),
  ping: 40 + Math.floor(Math.random()*120),
  status: "ONLINE",
  inventory: Object.fromEntries(FISH.map(f=>[f, Math.floor(Math.random()*3)])),
  pinnedQuest: "secret_hunter"
}));

/* ===== UI RENDER ===== */

const grid = document.getElementById("grid");

function renderHome(){
  grid.innerHTML="";
  slots.forEach(s=>{
    const q = QUESTS[s.pinnedQuest];
    let questHtml = "";
    if(q){
      questHtml = "<div class='quest'><b>"+q.name+"</b>";
      for(const f in q.objectives){
        questHtml += "<div class='small'>"+f+": "+
          Math.min(s.inventory[f]||0, q.objectives[f])+
          " / "+q.objectives[f]+"</div>";
      }
      questHtml += "</div>";
    }

    const el = document.createElement("div");
    el.className="slot";
    el.innerHTML = \`
      <b>\${s.username}</b>
      <div class="small">Gold: \${s.gold}</div>
      <div class="small">Items: \${Object.values(s.inventory).reduce((a,b)=>a+b,0)}</div>
      <div class="small">Status: \${s.status}</div>
      <div class="small">Ping: \${s.ping}ms</div>
      \${questHtml}
    \`;
    el.onclick=()=>openDetail(s.id);
    grid.appendChild(el);
  });
}

/* ===== DETAIL MODAL ===== */

let currentSlot=null;

function openDetail(id){
  currentSlot = slots[id];
  document.getElementById("detailTitle").innerText =
    currentSlot.username + " – Detail";
  showTab("inv");
  document.getElementById("modal").classList.add("active");
}

function closeModal(){
  document.getElementById("modal").classList.remove("active");
}

function showTab(t){
  document.getElementById("invTab").style.display =
    t==="inv"?"block":"none";
  document.getElementById("questTab").style.display =
    t==="quest"?"block":"none";

  if(t==="inv") renderInventory();
  if(t==="quest") renderQuest();
}

function renderInventory(){
  const c = document.getElementById("invTab");
  c.innerHTML = "<h4>Inventory</h4><div class='inventory'>"+
    Object.entries(currentSlot.inventory).map(([f,v])=>
      \`<div class="item \${v===0?"zero":""}">
        <div>🐟</div>
        <div>\${f}</div>
        <div>x\${v}</div>
      </div>\`
    ).join("")+"</div>";
}

function renderQuest(){
  const q = QUESTS[currentSlot.pinnedQuest];
  let html = "<h4>"+q.name+"</h4>";
  for(const f in q.objectives){
    html += "<div>"+f+": "+
      Math.min(currentSlot.inventory[f]||0, q.objectives[f])+
      " / "+q.objectives[f]+"</div>";
  }
  document.getElementById("questTab").innerHTML = html;
}

/* ===== SIMULASI REAL-TIME ===== */

setInterval(()=>{
  slots.forEach(s=>{
    const fish = FISH[Math.floor(Math.random()*FISH.length)];
    s.inventory[fish] += Math.random()>0.5?1:-1;
    if(s.inventory[fish]<0) s.inventory[fish]=0;
    s.gold += Math.floor(Math.random()*20);
    s.ping = 40 + Math.floor(Math.random()*120);
  });
  renderHome();
}, 2000);

renderHome();
</script>

</body>
</html>
`;
}
