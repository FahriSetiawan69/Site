// =========================
// GLOBAL REF
// =========================
const accountCards = document.getElementById("accountCards");
const detailPanel = document.getElementById("accountDetail");
const overlay = document.createElement("div");
overlay.id = "detailOverlay";
document.body.appendChild(overlay);

// =========================
// DATA DUMMY
// =========================
const accounts = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  username: `player_${i + 1}`,
  gold: 8000 + i * 1500,
  backpack: Math.floor(Math.random() * 10),
  ping: Math.floor(Math.random() * 50) + 20,
  rod: ["Standard Rod", "Magic Rod", "Golden Rod"][i % 3],
  status: i % 2 === 0 ? "Fishing" : "Idle",
  progress: Math.floor(Math.random() * 100),
  quests: [
    { id: 1, name: "Catch Secret Fish", req: ["Find Secret Spot", "Use Magic Rod"], reward: "500 Gold" },
    { id: 2, name: "Rare Fish Hunt", req: ["Catch 5 Rare Fish"], reward: "Rare Bait" },
    { id: 3, name: "Daily Fishing", req: ["Catch Any Fish"], reward: "Lucky Charm" }
  ],
  activeQuest: 0
}));

// =========================
// RENDER CARD GRID
// =========================
function renderCards() {
  accountCards.innerHTML = "";

  accounts.forEach(acc => {
    const q = acc.quests[acc.activeQuest] || { name: "None" };

    const card = document.createElement("div");
    card.className = "account-card";

    card.innerHTML = `
      <h3>${acc.username}</h3>

      <div class="card-line">Gold: ${acc.gold}</div>
      <div class="card-line">Backpack: ${acc.backpack}</div>
      <div class="card-line">Ping: ${acc.ping}ms</div>
      <div class="card-line">Rod: ${acc.rod}</div>

      <div class="card-line"><b>Quest:</b> ${q.name}</div>

      <div class="status ${acc.status.toLowerCase()}">${acc.status}</div>

      <div class="progress-bar">
        <div class="progress" style="width:${acc.progress}%;"></div>
      </div>
    `;

    card.onclick = () => openDetail(acc);
    accountCards.appendChild(card);
  });
}

// =========================
// OPEN DETAIL PANEL
// =========================
function openDetail(acc) {
  detailPanel.classList.add("active");
  overlay.classList.add("active");

  detailPanel.innerHTML = `
    <h3>${acc.username}</h3>

    <div class="tab-buttons">
      <button class="tab-btn active" data-tab="fishTab">Fish</button>
      <button class="tab-btn" data-tab="itemTab">Item</button>
      <button class="tab-btn" data-tab="questTab">Quest</button>
    </div>

    <div id="fishTab" class="tab-content active"></div>
    <div id="itemTab" class="tab-content"></div>
    <div id="questTab" class="tab-content"></div>

    <button id="closeDetail">Close</button>
  `;

  renderFishTab(acc);
  renderItemTab(acc);
  renderQuestTab(acc);

  // TAB BUTTON LOGIC
  detailPanel.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      // deactivate all
      detailPanel.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      detailPanel.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

      // activate this
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // CLOSE PANEL
  document.getElementById("closeDetail").onclick = closeDetail;
  overlay.onclick = closeDetail;
}

// =========================
// RENDER TAB CONTENT
// =========================
function renderFishTab(acc) {
  const el = document.getElementById("fishTab");
  el.innerHTML = "";
  // example fish items (dummy)
  acc.fishes?.forEach(f => {
    el.innerHTML += `
      <div class="tab-item">
        <div><strong>${f.name}</strong></div>
        <div>${f.mutation}</div>
        <div>${f.weight}</div>
        <div>${f.price} Gold</div>
      </div>
    `;
  });
}

function renderItemTab(acc) {
  const el = document.getElementById("itemTab");
  el.innerHTML = "";
  // example items (dummy)
  acc.items?.forEach(i => {
    el.innerHTML += `
      <div class="tab-item">
        <div><strong>${i.name}</strong></div>
        <div>${i.price} Gold</div>
      </div>
    `;
  });
}

function renderQuestTab(acc) {
  const el = document.getElementById("questTab");
  el.innerHTML = "";

  acc.quests.forEach((q, index) => {
    el.innerHTML += `
      <div class="quest-option" data-index="${index}">
        <strong>${q.name}</strong><br>
        ${q.req.map(r => `<div>* ${r}</div>`).join("")}
        <div class="reward">${q.reward}</div>
      </div>
    `;
  });

  // make quests clickable
  el.querySelectorAll(".quest-option").forEach(opt => {
    opt.onclick = () => {
      const idx = parseInt(opt.dataset.index);
      acc.activeQuest = idx;
      closeDetail();
      renderCards(); // update card display
    };
  });
}

// =========================
// CLOSE DETAIL
// =========================
function closeDetail() {
  detailPanel.classList.remove("active");
  overlay.classList.remove("active");
}

// =========================
// INIT
// =========================
renderCards();
