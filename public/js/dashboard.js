const accountsGrid = document.getElementById("accountsGrid");
const accountDetail = document.getElementById("accountDetail");

const accounts = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `player_${i + 1}`,
  gold: 10000 + i * 1000,
  backpack: Math.floor(Math.random() * 5) + 1,
  ping: Math.floor(Math.random() * 40) + 30,
  rod: ["Basic Rod","Magic Rod","Golden Rod"][i % 3],
  status: i % 2 === 0 ? "Fishing" : "Idle",
  quest: i === 9 ? { name: "Earn 5000 Gold", progress: 70 } : null
}));

function renderCards() {
  accountsGrid.innerHTML = "";
  accounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "account-card";
    card.innerHTML = `
      <h3>${acc.name}</h3>
      <div>Gold: ${acc.gold}</div>
      <div>Backpack: ${acc.backpack}</div>
      <div>Ping: ${acc.ping} ms</div>
      <div>Rod: ${acc.rod}</div>

      <div class="status ${acc.status.toLowerCase()}">${acc.status}</div>

      ${acc.quest ? `
        <div class="progress">
          <div class="progress-bar" style="width:${acc.quest.progress}%"></div>
        </div>
      ` : ""}
    `;
    card.onclick = () => showDetail(acc);
    accountsGrid.appendChild(card);
  });
}

function showDetail(acc) {
  accountDetail.innerHTML = `
    <h3>${acc.name} Detail</h3>

    <div class="detail-tabs">
      <button>Fish</button>
      <button>Item</button>
      <button class="active">Quest</button>
    </div>

    ${acc.quest ? `
      <div>
        <strong>${acc.quest.name}</strong>
        <div class="progress">
          <div class="progress-bar" style="width:${acc.quest.progress}%"></div>
        </div>
      </div>
    ` : `<p>No active quest</p>`}
  `;
}

renderCards();
