/* =========================
   DATA DUMMY (AMAN)
========================= */
const players = [];

for (let i = 1; i <= 10; i++) {
  players.push({
    id: i,
    name: `player_${i}`,
    gold: 10000 + i * 300,
    backpack: Math.floor(Math.random() * 10),
    ping: Math.floor(Math.random() * 100),
    activeQuest: 0,
    quests: [
      { name: "Catch 10 Fish", desc: "Catch any fish", progress: 30 },
      { name: "Rare Fish", desc: "Catch rare fish", progress: 0 },
      { name: "Sell Fish", desc: "Sell fish", progress: 70 }
    ],
    fish: [
      { name: "Salmon", mutation: "Normal", weight: "2kg", price: 200 }
    ],
    items: [
      { name: "Rod", price: 500 }
    ]
  });
}

let selectedPlayerId = null;
let activeTab = "fish";

/* =========================
   RENDER PLAYER LIST
========================= */
function renderPlayers() {
  const container = document.getElementById("playerList");
  container.innerHTML = "";

  players.forEach(p => {
    const q = p.quests[p.activeQuest];

    const div = document.createElement("div");
    div.className = "player-card";
    div.onclick = () => openDetail(p.id);

    div.innerHTML = `
      <div class="player-header">${p.name}</div>
      <div class="player-info">
        <div>Gold: ${p.gold}</div>
        <div>Backpack: ${p.backpack}</div>
        <div>Ping: ${p.ping} ms</div>
      </div>

      <div class="quest-name">${q.name}</div>
      <div class="quest-progress">
        <div class="quest-progress-bar" style="width:${q.progress}%"></div>
      </div>
    `;

    container.appendChild(div);
  });
}

/* =========================
   OPEN DETAIL
========================= */
function openDetail(id) {
  selectedPlayerId = id;
  activeTab = "fish";
  renderDetail();
}

/* =========================
   RENDER DETAIL
========================= */
function renderDetail() {
  const player = players.find(p => p.id === selectedPlayerId);
  if (!player) return;

  const panel = document.getElementById("detailPanel");

  panel.innerHTML = `
    <div class="tab-header">
      <div class="tab-btn ${activeTab === "fish" ? "active" : ""}" onclick="setTab('fish')">Fish</div>
      <div class="tab-btn ${activeTab === "item" ? "active" : ""}" onclick="setTab('item')">Item</div>
      <div class="tab-btn ${activeTab === "quest" ? "active" : ""}" onclick="setTab('quest')">Quest</div>
    </div>
    <div id="detailContent" class="tab-content"></div>
  `;

  if (activeTab === "fish") renderFish(player);
  if (activeTab === "item") renderItem(player);
  if (activeTab === "quest") renderQuest(player);
}

function setTab(tab) {
  activeTab = tab;
  renderDetail();
}

/* =========================
   TAB CONTENT
========================= */
function renderFish(player) {
  const c = document.getElementById("detailContent");
  c.innerHTML = "";

  player.fish.forEach(f => {
    c.innerHTML += `
      <div class="tab-item">
        🐟<br>
        ${f.name}<br>
        ${f.mutation}<br>
        ${f.weight}<br>
        $${f.price}
      </div>
    `;
  });
}

function renderItem(player) {
  const c = document.getElementById("detailContent");
  c.innerHTML = "";

  player.items.forEach(i => {
    c.innerHTML += `
      <div class="tab-item">
        🎒<br>
        ${i.name}<br>
        $${i.price}
      </div>
    `;
  });
}

function renderQuest(player) {
  const c = document.getElementById("detailContent");
  c.innerHTML = "";

  player.quests.forEach((q, index) => {
    c.innerHTML += `
      <div class="quest-item ${player.activeQuest === index ? "active" : ""}"
           onclick="selectQuest(${player.id}, ${index})">
        <strong>${q.name}</strong><br>
        ${q.desc}
        <div class="quest-progress">
          <div class="quest-progress-bar" style="width:${q.progress}%"></div>
        </div>
      </div>
    `;
  });
}

/* =========================
   SELECT QUEST
========================= */
function selectQuest(playerId, index) {
  const player = players.find(p => p.id === playerId);
  if (!player) return;

  player.activeQuest = index;
  renderPlayers();
  renderDetail();
}

/* =========================
   INIT
========================= */
renderPlayers();
