const players = [
  {
    id: 1,
    username: "player_7",
    gold: 13000,
    status: "Fishing",
    activeQuest: 1,

    fishes: [
      {
        name: "Tuna",
        mutation: "Golden",
        weight: "3.2 kg",
        price: 1250,
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
      { id: 3, name: "Backpack Lv 2", requirement: "Upgrade backpack" }
    ]
  }
];

let selectedPlayer = null;
let activeTab = "fish";

/* INIT */
renderPlayers();

/* PLAYER CARD */
function renderPlayers() {
  const el = document.getElementById("playerList");
  el.innerHTML = "";

  players.forEach(p => {
    const q = p.quests.find(q => q.id === p.activeQuest);
    el.innerHTML += `
      <div class="player-card" onclick="openDetail(${p.id})">
        <b>${p.username}</b><br>
        Gold: ${p.gold}<br>
        Status: ${p.status}<br>
        Quest: ${q ? q.name : "-"}
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
  renderPlayers();
  renderDetail();
}

function logout() {
  location.href = "/";
            }
