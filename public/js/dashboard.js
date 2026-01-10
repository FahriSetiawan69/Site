console.log("dashboard.js loaded");

const accountCards = document.getElementById("accountCards");
const detailPanel = document.getElementById("accountDetail");

/* DUMMY DATA */
const accounts = Array.from({ length: 10 }, (_, i) => ({
  username: `player_${i + 1}`,
  gold: 10000 + i * 1000,
  backpack: 5,
  ping: "45 ms",
  rod: "Basic Rod",
  status: Math.random() > 0.5 ? "Fishing" : "Idle",
  progress: Math.floor(Math.random() * 100),

  fish: [
    { name: "Golden Carp", mutation: "Shiny", weight: "2.5kg", price: 500 }
  ],
  items: [
    { name: "Magic Rod", price: 1000 }
  ],
  quests: [
    {
      name: "Catch Rare Fish",
      req: ["Catch 5 rare fish", "Use Special Rod"]
    },
    {
      name: "Big Catch",
      req: ["Catch fish > 3kg"]
    },
    {
      name: "Daily Fishing",
      req: ["Fish 10 times"]
    }
  ]
}));

/* RENDER CARD */
function renderCards() {
  accountCards.innerHTML = "";

  accounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "account-card";

    card.innerHTML = `
      <div class="card-title">${acc.username}</div>
      <div class="card-row">Gold: ${acc.gold}</div>
      <div class="card-row">Backpack: ${acc.backpack}</div>
      <div class="card-row">Ping: ${acc.ping}</div>
      <div class="card-row status ${acc.status.toLowerCase()}">${acc.status}</div>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${acc.progress}%"></div>
      </div>
    `;

    card.onclick = () => showDetail(acc);
    accountCards.appendChild(card);
  });
}

/* DETAIL PANEL */
function showDetail(acc) {
  detailPanel.classList.remove("hidden");

  detailPanel.innerHTML = `
    <div class="detail-header">
      <h3>${acc.username}</h3>
      <p>Gold: ${acc.gold}</p>
    </div>

    <div class="detail-tabs">
      <div class="detail-tab active" data-tab="fish">Fish</div>
      <div class="detail-tab" data-tab="item">Item</div>
      <div class="detail-tab" data-tab="quest">Quest</div>
    </div>

    <div id="detailContent" class="detail-grid"></div>
  `;

  bindTabs(acc);
  renderFish(acc);
}

/* TAB HANDLER */
function bindTabs(acc) {
  document.querySelectorAll(".detail-tab").forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll(".detail-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      if (tab.dataset.tab === "fish") renderFish(acc);
      if (tab.dataset.tab === "item") renderItem(acc);
      if (tab.dataset.tab === "quest") renderQuest(acc);
    };
  });
}

/* RENDER FISH */
function renderFish(acc) {
  const box = document.getElementById("detailContent");
  box.innerHTML = "";

  acc.fish.forEach(f => {
    box.innerHTML += `
      <div class="grid-item">
        <img src="/img/fish.png">
        <b>${f.name}</b><br>
        ${f.mutation}<br>
        ${f.weight}<br>
        💰 ${f.price}
      </div>
    `;
  });
}

/* RENDER ITEM */
function renderItem(acc) {
  const box = document.getElementById("detailContent");
  box.innerHTML = "";

  acc.items.forEach(i => {
    box.innerHTML += `
      <div class="grid-item">
        <img src="/img/item.png">
        <b>${i.name}</b><br>
        💰 ${i.price}
      </div>
    `;
  });
}

/* RENDER QUEST */
function renderQuest(acc) {
  const box = document.getElementById("detailContent");
  box.innerHTML = "";

  acc.quests.forEach(q => {
    box.innerHTML += `
      <div class="grid-item">
        <b>${q.name}</b>
        <ul>
          ${q.req.map(r => `<li>${r}</li>`).join("")}
        </ul>
      </div>
    `;
  });
}

/* LOGOUT */
document.getElementById("logoutBtn").onclick = () => {
  window.location.href = "/";
};

/* INIT */
renderCards();
