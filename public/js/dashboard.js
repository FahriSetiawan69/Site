/* ================= VIEW SYSTEM ================= */
const menuItems = document.querySelectorAll(".menu-item");
const views = document.querySelectorAll(".view");

menuItems.forEach(btn => {
  btn.onclick = () => {
    menuItems.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    views.forEach(v => v.classList.remove("active"));
    document.getElementById(`view-${btn.dataset.view}`).classList.add("active");
  };
});

document.getElementById("logoutBtn").onclick = () => {
  localStorage.clear();
  location.href = "/";
};

/* ================= MONITOR ================= */
const grid = document.querySelector("#view-monitor .card-grid");
const detail = document.querySelector("#view-monitor .detail-panel");

let activeIndex = null;

/* DATA */
const players = Array.from({ length: 10 }, (_, i) => ({
  name: `player_${i + 1}`,
  gold: 10000 + i * 1000,
  backpack: Math.floor(Math.random() * 5) + 1,
  ping: 30 + Math.floor(Math.random() * 40),
  rod: i % 2 === 0 ? "Magic Rod" : "Basic Rod",
  status: Math.random() > 0.4 ? "Fishing" : "Idle",

  questActive: null,
  questProgress: Math.floor(Math.random() * 40),

  activeTab: "fish",   // 🔥 PENTING

  fish: [
    { name: "Golden Carp", mutation: "Shiny", weight: "2.5kg", price: 500 },
    { name: "Blue Tuna", mutation: "Normal", weight: "1.6kg", price: 320 }
  ],
  items: [
    { name: "Magic Bait", price: 200 },
    { name: "Lucky Charm", price: 450 }
  ],
  quests: [
    { name: "Catch Rare Fish", req: ["Catch 3 rare fish"] },
    { name: "Daily Fishing", req: ["Fish 10 times"] },
    { name: "Big Catch", req: ["Catch fish > 3kg"] }
  ]
}));

/* ================= CARD ================= */
function renderCards() {
  grid.innerHTML = "";

  players.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "player-card" + (i === activeIndex ? " active" : "");

    card.innerHTML = `
      <div class="card-header">${p.name}</div>
      <div class="card-info">Gold: ${p.gold}</div>
      <div class="card-info">Backpack: ${p.backpack}</div>
      <div class="card-info">Ping: ${p.ping} ms</div>
      <div class="card-info">Rod: ${p.rod}</div>

      <div class="card-status ${p.status.toLowerCase()}">${p.status}</div>
      <div class="card-quest">Quest: ${p.questActive || "None"}</div>

      <div class="progress-wrapper">
        <div class="progress-bar" style="width:${p.questProgress}%"></div>
      </div>
    `;

    card.onclick = () => {
      activeIndex = i;
      renderCards();
      renderDetail(p, i);
    };

    grid.appendChild(card);
  });
}

/* ================= DETAIL ================= */
function renderDetail(p, index) {
  detail.innerHTML = `
    <h3>${p.name}</h3>

    <div class="detail-tabs">
      <div class="detail-tab ${p.activeTab === "fish" ? "active" : ""}" data-tab="fish">Fish</div>
      <div class="detail-tab ${p.activeTab === "item" ? "active" : ""}" data-tab="item">Item</div>
      <div class="detail-tab ${p.activeTab === "quest" ? "active" : ""}" data-tab="quest">Quest</div>
    </div>

    <div class="detail-grid" id="detailGrid"></div>
  `;

  bindTabs(p, index);
  renderActiveTab(p, index);
}

/* ================= TAB HANDLER ================= */
function bindTabs(p, index) {
  detail.querySelectorAll(".detail-tab").forEach(tab => {
    tab.onclick = () => {
      p.activeTab = tab.dataset.tab;   // 🔥 SIMPAN TAB
      renderDetail(p, index);
    };
  });
}

function renderActiveTab(p, index) {
  if (p.activeTab === "fish") renderFish(p);
  if (p.activeTab === "item") renderItem(p);
  if (p.activeTab === "quest") renderQuest(p, index);
}

/* ================= GRID ================= */
function renderFish(p) {
  document.getElementById("detailGrid").innerHTML =
    p.fish.map(f => `
      <div class="grid-item">
        <b>${f.name}</b><br>
        ${f.mutation}<br>
        ${f.weight}<br>
        💰 ${f.price}
      </div>
    `).join("");
}

function renderItem(p) {
  document.getElementById("detailGrid").innerHTML =
    p.items.map(i => `
      <div class="grid-item">
        <b>${i.name}</b><br>
        💰 ${i.price}
      </div>
    `).join("");
}

function renderQuest(p, index) {
  document.getElementById("detailGrid").innerHTML =
    p.quests.map(q => `
      <div class="grid-item quest ${p.questActive === q.name ? "active" : ""}"
        onclick="selectQuest(${index}, '${q.name}')">
        <b>${q.name}</b><br>
        ${q.req.join("<br>")}
      </div>
    `).join("");
}

/* ================= QUEST ================= */
function selectQuest(i, questName) {
  const p = players[i];
  p.questActive = questName;
  p.questProgress = 10;
  p.activeTab = "quest"; // stay
  renderCards();
  renderDetail(p, i);
}

/* ================= REALTIME ================= */
setInterval(() => {
  players.forEach(p => {
    p.ping += Math.floor(Math.random() * 5 - 2);
    p.ping = Math.max(20, Math.min(p.ping, 120));

    if (Math.random() > 0.85) {
      p.status = p.status === "Fishing" ? "Idle" : "Fishing";
    }

    if (p.status === "Fishing") {
      p.gold += Math.floor(Math.random() * 10);
      if (p.questActive && p.questProgress < 100) {
        p.questProgress += Math.floor(Math.random() * 3);
      }
    }
  });

  renderCards();
  if (activeIndex !== null) renderDetail(players[activeIndex], activeIndex);
}, 2000);

/* INIT */
renderCards();
