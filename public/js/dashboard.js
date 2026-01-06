const accounts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Player_${i + 1}`,
  gold: Math.floor(Math.random() * 50000),
  backpack: Math.floor(Math.random() * 40),
  ping: 80 + Math.floor(Math.random() * 100),
  questProgress: Math.floor(Math.random() * 100),
  fish: [
    "Golden Carp (2.5kg)",
    "Rainbow Trout (1.2kg)",
    "Secret Fish (0.8kg)"
  ],
  items: [
    "Magic Rod x1",
    "Golden Bait x3",
    "Lucky Charm x2"
  ],
  quests: [
    "Catch Secret Fish: 2 / 3",
    "Collect Rare Fish: 1 / 5",
    "Daily Challenge: 0 / 1"
  ]
}));

const grid = document.getElementById("accountGrid");
const detail = document.getElementById("detailPanel");

function renderGrid() {
  grid.innerHTML = "";
  accounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => selectAccount(acc.id);

    card.innerHTML = `
      <h3>${acc.name}</h3>
      <p>💰 Gold: ${acc.gold}</p>
      <p>🎒 Backpack: ${acc.backpack}</p>
      <p>📶 Ping: ${acc.ping} ms</p>
      <div class="progress">
        <span style="width:${acc.questProgress}%"></span>
      </div>
    `;

    grid.appendChild(card);
  });
}

function selectAccount(id) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
  document.querySelectorAll(".card")[id - 1].classList.add("active");

  const acc = accounts.find(a => a.id === id);

  detail.innerHTML = `
    <h2>${acc.name} – Detail</h2>

    <div class="detail-grid">
      <div class="detail-box">
        <h4>🐟 Fish</h4>
        <ul>${acc.fish.map(f => `<li>${f}</li>`).join("")}</ul>
      </div>

      <div class="detail-box">
        <h4>🎒 Items</h4>
        <ul>${acc.items.map(i => `<li>${i}</li>`).join("")}</ul>
      </div>

      <div class="detail-box">
        <h4>📜 Quest</h4>
        <ul>${acc.quests.map(q => `<li>${q}</li>`).join("")}</ul>
      </div>
    </div>
  `;
}

renderGrid();
