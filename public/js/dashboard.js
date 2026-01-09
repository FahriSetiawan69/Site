const players = [];

// GENERATE 10 PLAYER
for (let i = 1; i <= 10; i++) {
  players.push({
    id: i,
    username: `player_${i}`,
    gold: 8000 + i * 500,
    backpack: Math.floor(Math.random() * 10) + 1,
    ping: Math.floor(Math.random() * 40) + 40,
    rod: "Basic Rod",
    status: i % 2 === 0 ? "Fishing" : "Idle",
    questProgress: Math.floor(Math.random() * 100),
    activeQuest: 1,

    fishes: [
      {
        name: "Tuna",
        mutation: "Normal",
        weight: "2.1 kg",
        price: 1200,
        img: "img/fish.png"
      }
    ],

    items: [
      {
        name: "Fishing Rod",
        price: 5000,
        img: "img/rod.png"
      }
    ],

    quests: [
      { id: 1, name: "Catch 10 Fish", requirement: "Tangkap 10 ikan" },
      { id: 2, name: "Earn 5000 Gold", requirement: "Kumpulkan 5000 gold" },
      { id: 3, name: "Upgrade Backpack", requirement: "Upgrade backpack" }
    ]
  });
}

let selectedPlayer = null;
let activeTab = "fish";

/* INIT */
renderPlayers();

/* RENDER PLAYER CARD */
function renderPlayers() {
  const el = document.getElementById("playerList");
  el.innerHTML = "";

  players.forEach(p => {
    const quest = p.quests.find(q => q.id === p.activeQuest);

    el.innerHTML += `
      <div class="player-card" onclick="openDetail(${p.id})">
        <div class="card-username">${p.username}</div>

        <div class="card-info">Gold: ${p.gold}</div>
        <div class="card-info">Backpack: ${p.backpack}</div>
        <div class="card-info">Ping: ${p.ping} ms</div>
        <div class="card-info">Rod: ${p.rod}</div>

        <div class="card-quest">${quest ? quest.name : "-"}</div>

        <div class="progress-bar">
          <div class="progress-fill" style="width:${p.questProgress}%"></div>
        </div>

        <div class="card-status ${p.status === "Fishing" ? "fishing" : "idle"}">
          ${p.status}
        </div>
      </div>
    `;
  });
}

/* DETAIL */
function openDetail(id) {
  selectedPlayer = players.find(p => p.id === id);
  activeTab = "fish";
  renderDetail();
}

function renderDetail() {
  if (!selectedPlayer) return;

  document.getElementById("detailPanel").innerHTML = `
    <div class="detail-tabs">
      <div class="detail-tab ${activeTab==="fish"?"active":""}" onclick="switchTab('fish')">Fish</div>
      <div class="detail-tab ${activeTab==="item"?"active":""}" onclick="switchTab('item')">Item</div>
      <div class="detail-tab ${activeTab==="quest"?"active":""}" onclick="switchTab('quest')">Quest</div>
    </div>
    ${renderTab()}
  `;
}

function switchTab(tab) {
  activeTab = tab;
  renderDetail();
}

function renderTab() {
  if (activeTab === "fish") {
    return `<div class="grid-content">
      ${selectedPlayer.fishes.map(f => `
        <div class="grid-card">
          <img src="${f.img}">
          ${f.name}<br>${f.mutation}<br>${f.weight}<br>${f.price} Gold
        </div>
      `).join("")}
    </div>`;
  }

  if (activeTab === "item") {
    return `<div class="grid-content">
      ${selectedPlayer.items.map(i => `
        <div class="grid-card">
          <img src="${i.img}">
          ${i.name}<br>${i.price} Gold
        </div>
      `).join("")}
    </div>`;
  }

  if (activeTab === "quest") {
    return selectedPlayer.quests.map(q => `
      <div class="quest-card ${q.id===selectedPlayer.activeQuest?"active":""}"
           onclick="selectQuest(${q.id})">
        <b>${q.name}</b><br>${q.requirement}
      </div>
    `).join("");
  }
}

function selectQuest(id) {
  selectedPlayer.activeQuest = id;
  selectedPlayer.questProgress = 0;
  renderPlayers();
  renderDetail();
}

function logout() {
  location.href = "/";
}
