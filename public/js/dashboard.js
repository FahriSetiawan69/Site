const grid = document.querySelector(".card-grid");
const detail = document.querySelector(".detail-panel");

let activeIndex = null;

/* ====== DUMMY DATA REALTIME ====== */
const players = Array.from({ length: 10 }, (_, i) => ({
  name: `player_${i + 1}`,
  gold: 10000 + i * 1000,
  backpack: Math.floor(Math.random() * 8) + 1,
  ping: 30 + Math.floor(Math.random() * 50),
  rod: i % 2 === 0 ? "Magic Rod" : "Basic Rod",
  status: Math.random() > 0.4 ? "Fishing" : "Idle",

  questActive: null,
  questProgress: 0,

  fish: [
    { name: "Golden Carp", mutation: "Shiny", weight: "2.5kg", price: 500 }
  ],
  items: [
    { name: "Magic Bait", price: 200 }
  ],
  quests: [
    { name: "Catch Rare Fish", req: ["Catch 3 rare fish"] },
    { name: "Daily Fishing", req: ["Fish 10 times"] },
    { name: "Big Catch", req: ["Catch fish > 3kg"] }
  ]
}));

/* ====== RENDER CARD ====== */
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

/* ====== DETAIL PANEL ====== */
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

/* ====== QUEST SELECT ====== */
function selectQuest(i, questName) {
  players[i].questActive = questName;
  players[i].questProgress = Math.floor(Math.random() * 20) + 5;
  renderCards();
  renderDetail(players[i], i);
}

/* ====== REAL-TIME SIMULATION ====== */
setInterval(() => {
  players.forEach(p => {
    /* Ping bergerak */
    p.ping += Math.floor(Math.random() * 7 - 3);
    p.ping = Math.max(20, Math.min(p.ping, 120));

    /* Status random */
    if (Math.random() > 0.85) {
      p.status = p.status === "Fishing" ? "Idle" : "Fishing";
    }

    /* Gold & quest jalan */
    if (p.status === "Fishing") {
      p.gold += Math.floor(Math.random() * 15) + 5;

      if (p.questActive) {
        p.questProgress += Math.floor(Math.random() * 5);
        if (p.questProgress > 100) p.questProgress = 100;
      }
    }
  });

  renderCards();

  if (activeIndex !== null) {
    renderDetail(players[activeIndex], activeIndex);
  }

}, 2000); // update setiap 2 detik

/* INIT */
renderCards();
