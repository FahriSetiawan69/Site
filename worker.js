export default {
  async fetch() {
    return new Response(html(), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};

function html() {
return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Fish It Monitor</title>

<style>
:root {
  --bg: #0b0617;
  --panel: #140b2d;
  --card: #1e104a;
  --accent: #a855f7;
  --soft: #c084fc;
  --gold: #facc15;
  --green: #22c55e;
}

body {
  margin:0;
  font-family: Inter, Arial;
  background: radial-gradient(circle at top, #2b145f, #05010d);
  color:#e9d5ff;
}

h2 { margin:12px }

.grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
  gap:14px;
  padding:14px;
}

.slot {
  background:linear-gradient(180deg,#1e104a,#140b2d);
  border-radius:14px;
  padding:12px;
  border:1px solid #3b1d75;
  cursor:pointer;
  transition:.2s;
}
.slot:hover { transform:scale(1.02); border-color:var(--accent); }

.small { font-size:12px; opacity:.8 }

.quest-box {
  margin-top:8px;
  border:1px dashed #5b21b6;
  border-radius:8px;
  padding:6px;
}

.modal {
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.75);
  display:none;
  align-items:center;
  justify-content:center;
}
.modal.show { display:flex }

.panel {
  width:94%;
  max-width:1000px;
  background:linear-gradient(180deg,#1a0f3d,#0c051b);
  border-radius:16px;
  padding:14px;
  border:1px solid #5b21b6;
}

.header {
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.close { cursor:pointer; color:#f472b6 }

.tabs {
  margin-top:12px;
  display:flex;
  gap:8px;
}
.tabs button {
  background:#2b145f;
  color:#e9d5ff;
  border:none;
  padding:6px 12px;
  border-radius:8px;
  cursor:pointer;
}
.tabs button.active { background:var(--accent) }

.inventory {
  margin-top:14px;
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(150px,1fr));
  gap:12px;
}

.item {
  background:linear-gradient(180deg,#2b145f,#1a0f3d);
  border-radius:12px;
  padding:8px;
  text-align:center;
  border:1px solid #4c1d95;
}

.item img {
  width:64px;
  height:64px;
  filter:drop-shadow(0 0 8px #9333ea);
}

.price { color:var(--gold); font-weight:bold }
.weight { color:var(--green); font-size:12px }

.other {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(120px,1fr));
  gap:10px;
  margin-top:12px;
}

.other-item {
  background:#2b145f;
  border-radius:10px;
  padding:10px;
  text-align:center;
}

.quest {
  margin-top:12px;
  background:#1e104a;
  padding:10px;
  border-radius:10px;
  border:1px solid #5b21b6;
  cursor:pointer;
}
.quest.active { border-color:var(--accent) }
</style>
</head>

<body>

<h2>🎣 Fish It – Multi Account Monitor</h2>
<div class="grid" id="grid"></div>

<div class="modal" id="modal">
  <div class="panel">
    <div class="header">
      <div id="detailTitle"></div>
      <div class="close" onclick="closeModal()">✖</div>
    </div>

    <div class="tabs">
      <button id="tFish" onclick="showTab('fish')">Fish</button>
      <button id="tOther" onclick="showTab('other')">Other</button>
      <button id="tQuest" onclick="showTab('quest')">Quest</button>
    </div>

    <div id="content"></div>
  </div>
</div>

<script>
/* ===== DUMMY DATA ===== */

const FISHES = [
  "Megalodon","Zombie Megalodon","Robot Kraken",
  "Secret Tuna","Golden Carp","Lochness Monster"
];

const OTHER_ITEMS = ["Enchant Stone","Totem XP","Magic Scroll"];

const QUESTS = [
  {id:1,name:"Secret Hunter", goals:["Catch Secret Fish","Catch Legendary"]},
  {id:2,name:"Master Fisher", goals:["Catch 500 Fish","Sell 10 Fish"]},
  {id:3,name:"Gold Grinder", goals:["Earn 5M Gold"]}
];

const slots = Array.from({length:20}).map((_,i)=>({
  id:i,
  user:"Account_"+(i+1),
  gold:Math.floor(Math.random()*2_000_000),
  ping:50+Math.floor(Math.random()*120),
  fish:FISHES.map(f=>({
    name:f,
    weight:(250+Math.random()*250).toFixed(2),
    price:(200+Math.random()*700).toFixed(2)
  })),
  other:Object.fromEntries(OTHER_ITEMS.map(o=>[o,Math.floor(Math.random()*8)])),
  quest:QUESTS[Math.floor(Math.random()*3)]
}));

/* ===== HOME ===== */

const grid=document.getElementById("grid");

function renderHome(){
  grid.innerHTML="";
  slots.forEach(s=>{
    const d=document.createElement("div");
    d.className="slot";
    d.innerHTML=\`
      <b>\${s.user}</b>
      <div class="small">Gold: $\${(s.gold/1000).toFixed(1)}K</div>
      <div class="small">Fish: \${s.fish.length}</div>
      <div class="small">Ping: \${s.ping}ms</div>
      <div class="quest-box">
        🎯 \${s.quest.name}
      </div>
    \`;
    d.onclick=()=>openDetail(s.id);
    grid.appendChild(d);
  });
}

/* ===== DETAIL ===== */

let current=null;

function openDetail(id){
  current=slots[id];
  document.getElementById("detailTitle").innerText=current.user+" – Inventory";
  document.getElementById("modal").classList.add("show");
  showTab("fish");
}

function closeModal(){
  document.getElementById("modal").classList.remove("show");
}

function showTab(t){
  document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
  document.getElementById("t"+t.charAt(0).toUpperCase()+t.slice(1)).classList.add("active");

  if(t==="fish") renderFish();
  if(t==="other") renderOther();
  if(t==="quest") renderQuest();
}

function renderFish(){
  document.getElementById("content").innerHTML=
  '<div class="inventory">'+
  current.fish.map(f=>\`
    <div class="item">
      <img src="https://dummyimage.com/64x64/9333ea/ffffff&text=🐟">
      <div>\${f.name}</div>
      <div class="price">$\${f.price}K</div>
      <div class="weight">\${f.weight} KG</div>
    </div>\`).join("")+'</div>';
}

function renderOther(){
  document.getElementById("content").innerHTML=
  '<div class="other">'+
  Object.entries(current.other).map(([n,c])=>\`
    <div class="other-item">
      <div>📦</div>
      <div>\${n}</div>
      <b>x\${c}</b>
    </div>\`).join("")+'</div>';
}

function renderQuest(){
  document.getElementById("content").innerHTML=
  QUESTS.map(q=>\`
    <div class="quest \${q.id===current.quest.id?"active":""}"
      onclick="current.quest=q;renderHome();renderQuest()">
      <b>\${q.name}</b>
      \${q.goals.map(g=>'<div class="small">- '+g+'</div>').join("")}
    </div>\`).join("");
}

/* ===== SIMULASI REALTIME ===== */

setInterval(()=>{
  slots.forEach(s=>{
    s.gold+=Math.random()*5000;
    s.ping=50+Math.random()*120;
  });
  renderHome();
},2500);

renderHome();
</script>

</body>
</html>
`;
}
