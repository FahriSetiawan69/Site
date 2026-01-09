// ===============================
// DASHBOARD MAIN SCRIPT (SAFE)
// ===============================

const cardContainer = document.getElementById("accountCards");
const detailPanel = document.getElementById("accountDetail");
const logoutBtn = document.getElementById("logoutBtn");

// ===============================
// DUMMY PLAYER DATA (10 CARD)
// ===============================
const players = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  username: `player_${i + 1}`,
  gold: 10000 + i * 300,
  backpack: Math.floor(Math.random() * 10) + 1,
  ping: Math.floor(Math.random() * 50) + 20,
  rod: "Basic Rod",
  status: Math.random() > 0.5 ? "fishing" : "idle",
  quest: {
    name: "Catch Secret Fish",
    progress: Math.floor(Math.random() * 100)
  },
  fish: [
    { name: "Golden Carp", mutation: "Shiny", weight: "2.5kg", price: 1200 },
    { name: "Rainbow Trout", mutation: "-", weight: "1.2kg", price: 600 }
  ],
  items: [
    { name: "Magic Rod", price: 3000 },
    { name: "Golden Bait", price: 500 }
  ],
  quests: [
    { name: "Catch Secret Fish", desc: "Catch 3 Secret Fish" },
    { name: "Earn Gold", desc: "Earn 5.000 Gold" },
    { name: "Daily Fishing", desc: "Fish 20 times" }
  ]
}));

// ===============================
// RENDER ALL PLAYER CARDS
// ===============================
function renderCards() {
  cardContainer.innerHTML = "";

  players.forEach(player => {
    const card = document.createElement("div");
    card.className = "player-card";

    card.innerHTML = `
      <div class="player-name">${player.username}</div>

      <div class="card-info">
        <span>Gold: ${player.gold}</span>
        <span>Backpack: ${player.backpack}</span>
        <span>Ping: ${player.ping} ms</span>
        <span>Rod: ${player.rod}</span>
        <span>Quest: ${player.quest.name}</span>
      </div>

      <div class="status ${player.status}">
        ${player.status.toUpperCase()}
      </div>

      <div class="progress-container">
        <div class="progress-bar" style="width:${player.quest.progress}%"></div>
      </div>
    `;

    card.addEventListener("click", () => showDetail(player));
    cardContainer.appendChild(card);
  });
}

// ===============================
// SHOW DETAIL PANEL (CLICK CARD)
// ===============================
function showDetail(player) {
  detailPanel.classList.remove("hidden");

  detailPanel.innerHTML = `
    <div class="detail-header">
      <h3>${player.username}</h3>
      <p>Gold: ${player.gold}</p>
      <p>Status: ${player.status.toUpperCase()}</p>
    </div>

    <div class="detail-tabs">
      <div class="detail-tab active" data-tab="fish">Fish</div>
      <div class="detail-tab" data-tab="item">Item</div>
      <div class="detail-tab" data-tab="quest">Quest</div>
    </div>

    <div id="detailContent" class="tab-content"></div>
  `;

  renderFish(player);

  document.querySelectorAll(".detail-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".detail-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const type = tab.dataset.tab;
      if (type === "fish") renderFish(player);
      if (type === "item") renderItem(player);
      if (type === "quest") renderQuest(player);
    });
  });
}

// ===============================
// TAB RENDERERS
// ===============================
function renderFish(player) {
  const container = document.getElementById("detailContent");
  container.innerHTML = "";

  player.fish.forEach(f => {
    container.innerHTML += `
      <div class="tab-item">
        <strong>${f.name}</strong>
        <div>Mutation: ${f.mutation}</div>
        <div>Weight: ${f.weight}</div>
        <div>Price: ${f.price}</div>
      </div>
    `;
  });
}

function renderItem(player) {
  const container = document.getElementById("detailContent");
  container.innerHTML = "";

  player.items.forEach(i => {
    container.innerHTML += `
      <div class="tab-item">
        <strong>${i.name}</strong>
        <div>Price: ${i.price}</div>
      </div>
    `;
  });
}

function renderQuest(player) {
  const container = document.getElementById("detailContent");
  container.innerHTML = "";

  player.quests.forEach(q => {
    container.innerHTML += `
      <div class="tab-item">
        <strong>${q.name}</strong>
        <div>${q.desc}</div>
      </div>
    `;
  });
}

// ===============================
// LOGOUT
// ===============================
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("fishit_key");
  window.location.href = "index.html";
});

// ===============================
// INIT
// ===============================
renderCards();
