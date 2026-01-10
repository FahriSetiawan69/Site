/* ======================================================
   SIDEBAR VIEW SYSTEM
====================================================== */
const menuItems = document.querySelectorAll(".menu-item");
const views = document.querySelectorAll(".view");

menuItems.forEach(btn => {
  btn.onclick = () => {
    menuItems.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    views.forEach(v => v.classList.remove("active"));
    document
      .getElementById(`view-${btn.dataset.view}`)
      .classList.add("active");
  };
});

document.getElementById("logoutBtn").onclick = () => {
  localStorage.clear();
  location.href = "/";
};

/* ======================================================
   ACCOUNTS MONITOR
====================================================== */
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
  questProgress: Math.floor(Math.random() * 60),

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

/* ======================================================
   CARD RENDER (WITH PROGRESS BAR)
====================================================== */
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

/* ======================================================
   DETAIL PANEL WITH GRID TABS
====================================================== */
function renderDetail(p, index) {
  detail.innerHTML = `
    <h3>${p.name}</h3>
    <p>Gold: ${p.gold}</p>

    <div class="detail-tabs">
      <div class="detail-tab active" data-tab="fish">Fish</div>
      <div class="detail-tab" data-tab="item">Item</div>
      <div class="detail-tab" data-tab="quest">Quest</div>
    </div>

    <div class="detail-grid" id="detailGrid"></div>
  `;

  bindTabs(p, index);
  renderFish(p);
}

/* TAB LOGIC */
function bindTabs(p, index) {
  detail.querySelectorAll(".detail-tab").forEach(tab => {
    tab.onclick = () => {
      detail.querySelectorAll(".detail-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      if (tab.dataset.tab === "fish") renderFish(p);
      if (tab.dataset.tab === "item") renderItem(p);
      if (tab.dataset.tab === "quest") renderQuest(p, index);
    };
  });
}

/* GRID CONTENT */
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

/* QUEST SELECT */
function selectQuest(i, questName) {
  players[i].questActive = questName;
  players[i].questProgress = 10;
  renderCards();
  renderDetail(players[i], i);
}

/* ======================================================
   REALTIME UPDATE
====================================================== */
setInterval(() => {
  players.forEach(p => {
    p.ping += Math.floor(Math.random() * 5 - 2);
    p.ping = Math.max(20, Math.min(p.ping, 120));

    if (Math.random() > 0.85) {
      p.status = p.status === "Fishing" ? "Idle" : "Fishing";
    }

    if (p.status === "Fishing") {
      p.gold += Math.floor(Math.random() * 12);

      if (p.questActive) {
        p.questProgress += Math.floor(Math.random() * 4);
        if (p.questProgress > 100) p.questProgress = 100;
      }
    }
  });

  renderCards();

  if (activeIndex !== null) {
    renderDetail(players[activeIndex], activeIndex);
  }
}, 2000);

/* INIT */
renderCards();
