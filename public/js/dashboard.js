const players = Array.from({length:10},(_,i)=>({
  name:`player_${i+1}`,
  gold: 5000 + i*1500,
  backpack: Math.floor(Math.random()*5)+1,
  ping: 20 + i*5,
  rod: "Magic Rod",
  quest: "None"
}));

const cardsEl = document.getElementById("cards");
const overlay = document.getElementById("overlay");
let activePlayer = null;

players.forEach(p=>{
  const card = document.createElement("div");
  card.className="card";
  card.innerHTML=`
    <h3>${p.name}</h3>
    <div>Gold: ${p.gold}</div>
    <div>Backpack: ${p.backpack}</div>
    <div>Ping: ${p.ping}ms</div>
    <div>Rod: ${p.rod}</div>
    <div class="status">Fishing</div>
    <div class="progress"><span></span></div>
  `;
  card.onclick=()=>openDetail(p);
  cardsEl.appendChild(card);
});

function openDetail(player){
  activePlayer = player;
  document.getElementById("detailName").textContent = player.name;
  document.getElementById("currentQuest").textContent = player.quest;
  document.querySelectorAll(".quest").forEach(q=>{
    q.classList.toggle("active", q.dataset.quest===player.quest);
  });
  overlay.classList.remove("hidden");
}

function closeDetail(){
  overlay.classList.add("hidden");
}

document.querySelectorAll(".quest").forEach(q=>{
  q.onclick=()=>{
    activePlayer.quest = q.dataset.quest;
    document.getElementById("currentQuest").textContent = q.dataset.quest;
    document.querySelectorAll(".quest").forEach(x=>x.classList.remove("active"));
    q.classList.add("active");
  };
});

document.querySelectorAll(".tab").forEach(t=>{
  t.onclick=()=>{
    document.querySelectorAll(".tab,.tab-content").forEach(x=>x.classList.remove("active"));
    t.classList.add("active");
    document.getElementById("tab-"+t.dataset.tab).classList.add("active");
  };
});
