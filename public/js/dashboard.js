const grid = document.querySelector(".card-grid");
const detail = document.querySelector(".detail-panel");

let activeIndex = null;

const players = Array.from({ length: 10 }, (_, i) => ({
  name: `player_${i + 1}`,
  gold: 10000 + i * 1000,
  backpack: 5,
  ping: 45,
  rod: i % 2 === 0 ? "Magic Rod" : "Basic Rod",
  status: i % 3 === 0 ? "Idle" : "Fishing",
  progress: Math.floor(Math.random() * 100)
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
    <h3>${p.name}</h3>
    <p>Status: ${p.status}</p>
    <p>Gold: ${p.gold}</p>
    <p>Backpack: ${p.backpack}</p>
    <p>Rod: ${p.rod}</p>
    <p>Ping: ${p.ping} ms</p>
  `;
}

renderCards();
