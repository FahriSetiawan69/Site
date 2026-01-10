// ================= VIEW SWITCH =================
const navButtons = document.querySelectorAll(".nav-btn");
const views = document.querySelectorAll(".view");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const viewId = btn.dataset.view;
    views.forEach(v => v.classList.remove("active"));
    document.getElementById(viewId).classList.add("active");
  });
});

// ================= DATA =================
const accounts = Array.from({ length: 10 }).map((_, i) => ({
  name: `player_${i + 1}`,
  gold: 10000 + i * 1000,
  backpack: Math.floor(Math.random() * 5) + 1,
  ping: 30 + Math.floor(Math.random() * 40),
  rod: ["Basic Rod", "Magic Rod", "Golden Rod"][i % 3],
  status: Math.random() > 0.5 ? "Fishing" : "Idle",

  fish: [
    { name: "Golden Carp", mut: "Shiny", weight: "2.5kg", price: 500 },
    { name: "Blue Tuna", mut: "Normal", weight: "1.6kg", price: 320 }
  ],

  items: [
    { name: "Magic Bait", price: 150 },
    { name: "Lucky Charm", price: 300 }
  ],

  quests: [
    { name: "Catch 20 Fish", progress: 0.4 },
    { name: "Earn 5000 Gold", progress: 0.7 },
    { name: "Big Catch > 3kg", progress: 0.2 }
  ]
}));

// ================= GRID =================
const grid = document.getElementById("accountsGrid");
let selectedAccount = null;

function renderAccounts() {
  grid.innerHTML = "";

  accounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "account-card";

    card.innerHTML = `
      <h3>${acc.name}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack}</p>
      <p>Ping: ${acc.ping} ms</p>
      <p>Rod: ${acc.rod}</p>
      <div class="status ${acc.status.toLowerCase()}">${acc.status}</div>
    `;

    card.onclick = () => showDetail(acc);
    grid.appendChild(card);
  });
}

// ================= DETAIL =================
function showDetail(acc) {
  selectedAccount = acc;

  let panel = document.querySelector(".detail-panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.className = "detail-panel";
    grid.parentNode.appendChild(panel);
  }

  panel.innerHTML = `
    <h3>${acc.name} Detail</h3>

    <div class="detail-tabs">
      <button class="tab active" data-tab="fish">Fish</button>
      <button class="tab" data-tab="item">Item</button>
      <button class="tab" data-tab="quest">Quest</button>
    </div>

    <div class="detail-content"></div>
  `;

  const tabs = panel.querySelectorAll(".tab");
  const content = panel.querySelector(".detail-content");

  tabs.forEach(t => {
    t.onclick = () => {
      tabs.forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      renderTab(t.dataset.tab, content);
    };
  });

  renderTab("fish", content);
}

function renderTab(type, container) {
  container.innerHTML = "";

  if (type === "fish") {
    selectedAccount.fish.forEach(f => {
      container.innerHTML += `
        <div class="item-card">
          <strong>${f.name}</strong><br>
          ${f.mut}<br>
          ${f.weight}<br>
          💰 ${f.price}
        </div>`;
    });
  }

  if (type === "item") {
    selectedAccount.items.forEach(i => {
      container.innerHTML += `
        <div class="item-card">
          <strong>${i.name}</strong><br>
          💰 ${i.price}
        </div>`;
    });
  }

  if (type === "quest") {
    selectedAccount.quests.forEach(q => {
      container.innerHTML += `
        <div class="quest-item">
          <strong>${q.name}</strong>
          <div class="quest-bar">
            <span style="width:${q.progress * 100}%"></span>
          </div>
        </div>`;
    });
  }
}

// ================= REALTIME =================
setInterval(() => {
  accounts.forEach(a => {
    a.gold += Math.random() > 0.7 ? 10 : 0;
    a.ping = 30 + Math.floor(Math.random() * 40);
    a.status = Math.random() > 0.5 ? "Fishing" : "Idle";

    a.quests.forEach(q => {
      q.progress = Math.min(1, q.progress + Math.random() * 0.02);
    });
  });

  renderAccounts();
}, 2000);

// INIT
renderAccounts();
