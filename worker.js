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
:root{
--bg:#0b0617;
--panel:#140b2d;
--card:#1e104a;
--accent:#a855f7;
--gold:#facc15;
--green:#22c55e;
}

body{
margin:0;
font-family:Inter,Arial;
background:radial-gradient(circle at top,#2b145f,#05010d);
color:#e9d5ff;
}

h2{margin:12px}
.small{font-size:12px;opacity:.8}

.grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
gap:14px;
padding:14px;
}

.slot{
background:linear-gradient(180deg,#1e104a,#140b2d);
border-radius:14px;
padding:12px;
border:1px solid #3b1d75;
cursor:pointer;
}

.quest-box{
margin-top:6px;
border:1px dashed #5b21b6;
border-radius:8px;
padding:6px;
}

.modal{
position:fixed;inset:0;
background:rgba(0,0,0,.75);
display:none;
align-items:center;
justify-content:center;
}
.modal.show{display:flex}

.panel{
width:95%;max-width:1100px;
background:linear-gradient(180deg,#1a0f3d,#0c051b);
border-radius:16px;
padding:14px;
border:1px solid #5b21b6;
}

.tabs{display:flex;gap:8px;margin-top:10px}
.tabs button{
background:#2b145f;
border:none;
padding:6px 12px;
border-radius:8px;
color:#fff;
cursor:pointer;
}
.tabs button.active{background:var(--accent)}

.inventory{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(150px,1fr));
gap:12px;margin-top:12px;
}

.item{
background:linear-gradient(180deg,#2b145f,#1a0f3d);
border-radius:12px;
padding:8px;
text-align:center;
border:1px solid #4c1d95;
}

.price{color:var(--gold);font-weight:bold}
.weight{color:var(--green);font-size:12px}

.bar{
height:10px;
background:#1e104a;
border-radius:6px;
overflow:hidden;
margin-top:4px;
}
.bar>div{
height:100%;
background:linear-gradient(90deg,#22c55e,#4ade80);
}

.quest{
margin-top:10px;
background:#1e104a;
padding:10px;
border-radius:10px;
border:1px solid #5b21b6;
cursor:pointer;
}
.quest.active{border-color:var(--accent)}
</style>
</head>

<body>

<h2>🎣 Fish It – Multi Account Monitor</h2>
<div class="grid" id="grid"></div>

<div class="modal" id="modal">
<div class="panel">
<div style="display:flex;justify-content:space-between">
<b id="detailTitle"></b>
<span onclick="closeModal()" style="cursor:pointer">✖</span>
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
/* ===== DATA ===== */

const RARITY = {
"Megalodon":"Legendary",
"Zombie Megalodon":"Legendary",
"Robot Kraken":"Legendary",
"Secret Tuna":"Secret",
"Golden Carp":"Normal",
"Lochness Monster":"Legendary"
};

const QUESTS = [
{
id:1,name:"Secret Hunter",
objectives:{"Secret Tuna":2}
},
{
id:2,name:"Master Fisher",
objectives:{"Golden Carp":5,"Megalodon":1}
},
{
id:3,name:"Gold Grinder",
objectives:{gold:5000000}
}
];

const slots = Array.from({length:20}).map((_,i)=>({
id:i,
user:"Account_"+(i+1),
gold:Math.floor(Math.random()*2_000_000),
ping:50+Math.random()*120,
fish:Array.from({length:10}).map(()=>({
name:Object.keys(RARITY)[Math.floor(Math.random()*6)],
weight:(250+Math.random()*200).toFixed(2),
price:(200+Math.random()*700).toFixed(2)
})),
other:{Totem:3,Enchant:5},
quest:QUESTS[0]
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
<div class="small">Ping: \${s.ping.toFixed(0)}ms</div>
<div class="quest-box">🎯 \${s.quest.name}</div>
\`;
d.onclick=()=>openDetail(s.id);
grid.appendChild(d);
});
}

/* ===== DETAIL ===== */

let current=null;
let filter="All";

function openDetail(id){
current=slots[id];
document.getElementById("detailTitle").innerText=current.user;
document.getElementById("modal").classList.add("show");
showTab("fish");
}

function closeModal(){
document.getElementById("modal").classList.remove("show");
}

function showTab(t){
["Fish","Other","Quest"].forEach(x=>{
document.getElementById("t"+x).classList.remove("active");
});
document.getElementById("t"+t.charAt(0).toUpperCase()+t.slice(1)).classList.add("active");

if(t==="fish")renderFish();
if(t==="other")renderOther();
if(t==="quest")renderQuest();
}

/* ===== FISH TAB ===== */

function renderFish(){
const grouped={};
current.fish.forEach(f=>{
const k=f.name+"_"+f.weight;
grouped[k]=grouped[k]||{...f,count:0};
grouped[k].count++;
});

let items=Object.values(grouped);
if(filter!=="All"){
items=items.filter(i=>RARITY[i.name]===filter);
}

const total=items.reduce((a,b)=>a+(b.price*b.count),0);

document.getElementById("content").innerHTML=\`
<div class="small">
Sort:
<button onclick="setFilter('All')">All</button>
<button onclick="setFilter('Secret')">Secret</button>
<button onclick="setFilter('Legendary')">Legendary</button>
</div>
<div class="small">Total Sell Value: <b>$\${total.toFixed(2)}K</b></div>

<div class="inventory">
\${items.map(f=>\`
<div class="item">
<div>🐟</div>
<div>\${f.name}</div>
<div class="price">$\${f.price}K x\${f.count}</div>
<div class="weight">\${f.weight} KG</div>
</div>\`).join("")}
</div>
\`;
}

function setFilter(f){filter=f;renderFish();}

/* ===== OTHER ===== */

function renderOther(){
document.getElementById("content").innerHTML=
Object.entries(current.other).map(([n,c])=>
\`<div class="item">\${n}<br>x\${c}</div>\`).join("");
}

/* ===== QUEST ===== */

function renderQuest(){
document.getElementById("content").innerHTML=
QUESTS.map(q=>{
const prog=calcQuest(q);
return \`
<div class="quest \${q.id===current.quest.id?"active":""}"
onclick="current.quest=q;renderHome();renderQuest()">
<b>\${q.name}</b>
\${prog.lines}
<div class="bar"><div style="width:\${prog.percent}%"></div></div>
<div class="small">\${prog.percent}%</div>
</div>\`;
}).join("");
}

function calcQuest(q){
let cur=0,max=0,lines="";
for(const k in q.objectives){
let c=0;
if(k==="gold")c=current.gold;
else c=current.fish.filter(f=>f.name===k).length;
cur+=Math.min(c,q.objectives[k]);
max+=q.objectives[k];
lines+=\`<div class="small">\${k}: \${c} / \${q.objectives[k]}</div>\`;
}
return{percent:Math.floor(cur/max*100),lines};
}

/* ===== SIM ===== */

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
