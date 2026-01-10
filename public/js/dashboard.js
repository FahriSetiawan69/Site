const grid = document.querySelector(".card-grid");
const detail = document.querySelector(".detail-panel");

let activeIndex = null;

/* DUMMY DATA */
const players = Array.from({ length: 10 }, (_, i) => ({
  name: `player_${i + 1}`,
  gold: 10000 + i * 1000,
  backpack: 5,
  ping: 45,
  rod: i % 2 === 0 ? "Magic Rod" : "Basic Rod",
  status: i % 3 === 0 ? "Idle" : "Fishing",
  progress: Math.floor(Math.random() * 100),

  fish: [
    { name: "Golden Carp", mutation: "Shiny", weight: "2.5kg", price: 500 },
    { name: "Blue Tuna", mutation: "Normal", weight: "1.8kg", price: 300 }
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

function renderCards() {
  grid.innerHTML = "";

  players.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "player-card";
    if (index === activeIndex) card.classList.add("active");

    card.innerHTML = `
      <div class="card-header">${p.name}</div>
      <div class="card-info">Gold: ${p.gold}</div>
      <div class="card-info">Backpack: ${p.backpack}</div>
      <div class="card-info">Ping: ${p.ping} ms</div>
      <div class="card-info">Rod: ${p.rod}</div>
      <div class="card-status ${p.status.toLowerCase()}">${p.status}</div>
      <div class="progress-wrapper">
        <div class="progress-bar" style="width:${p.progress}%"></div>
      </div>
    `;

    card.onclick = () => {
      activeIndex = index;
      renderCards();
      renderDetail(p);
    };

    grid.appendChild(card);
  });
}

function renderDetail(p) {
  detail.innerHTML = `
    <div class="detail-header">
      <h3>${p.name}</h3>
      <p>Gold: ${p.gold}</p>
    </div>

    <div class="detail-tabs">
      <div class="detail-tab active" data-tab="fish">Fish</div>
      <div class="detail-tab" data-tab="item">Item</div>
      <div class="detail-tab" data-tab="quest">Quest</div>
    </div>

    <div class="detail-grid" id="detailGrid"></div>
  `;

  bindTabs(p);
  renderFish(p);
}

function bindTabs(p) {
  const tabs = detail.querySelectorAll(".detail-tab");
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      if (tab.dataset.tab === "fish") renderFish(p);
      if (tab.dataset.tab === "item") renderItem(p);
      if (tab.dataset.tab === "quest") renderQuest(p);
    };
  });
}

function renderFish(p) {
  const box = document.getElementById("detailGrid");
  box.innerHTML = "";
  p.fish.forEach(f => {
    box.innerHTML += `
      <div class="grid-item">
        <b>${f.name}</b>
        ${f.mutation}<br>
        ${f.weight}<br>
        💰 ${f.price}
      </div>
    `;
  });
}

function renderItem(p) {
  const box = document.getElementById("detailGrid");
  box.innerHTML = "";
  p.items.forEach(i => {
    box.innerHTML += `
      <div class="grid-item">
        <b>${i.name}</b>
        💰 ${i.price}
      </div>
    `;
  });
}

function renderQuest(p) {
  const box = document.getElementById("detailGrid");
  box.innerHTML = "";
  p.quests.forEach(q => {
    box.innerHTML += `
      <div class="grid-item">
        <b>${q.name}</b>
        ${q.req.join("<br>")}
      </div>
    `;
  });
}

renderCards();
