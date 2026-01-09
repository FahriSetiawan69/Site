const cardsEl = document.getElementById("accountCards");
const detailEl = document.getElementById("accountDetail");

/* DUMMY DATA */
const accounts = Array.from({ length: 10 }).map((_, i) => ({
  username: `player_${i + 1}`,
  gold: 5000 + i * 750,
  backpack: (i % 3) + 1,
  ping: 25 + i * 4,
  rod: ["Basic Rod", "Magic Rod", "Golden Rod"][i % 3],
  status: i % 2 === 0 ? "Fishing" : "Idle",
  progress: Math.floor(Math.random() * 100),
  quest: {
    name: "Catch 20 Fish",
    progress: Math.floor(Math.random() * 100)
  }
}));

/* RENDER CARDS */
function renderCards() {
  cardsEl.innerHTML = "";

  accounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${acc.username}</h3>
      <div>Gold: ${acc.gold}</div>
      <div>Backpack: ${acc.backpack}</div>
      <div>Ping: ${acc.ping} ms</div>
      <div>Rod: ${acc.rod}</div>

      <span class="status ${acc.status.toLowerCase()}">${acc.status}</span>

      <div class="progress">
        <div style="width:${acc.progress}%"></div>
      </div>

      <div>Quest: ${acc.quest.name}</div>
    `;

    card.onclick = () => showDetail(acc);
    cardsEl.appendChild(card);
  });
}

/* DETAIL */
function showDetail(acc) {
  detailEl.classList.remove("hidden");

  detailEl.innerHTML = `
    <h2>${acc.username}</h2>

    <p>Status: <b>${acc.status}</b></p>
    <p>Gold: ${acc.gold}</p>
    <p>Rod: ${acc.rod}</p>

    <h3>Quest</h3>
    <p>${acc.quest.name}</p>

    <div class="progress">
      <div style="width:${acc.quest.progress}%"></div>
    </div>
  `;
}

/* LOGOUT */
document.getElementById("logoutBtn").onclick = () => {
  localStorage.clear();
  location.href = "/";
};

renderCards();
