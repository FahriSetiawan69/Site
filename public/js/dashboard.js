const players = Array.from({ length: 10 }, (_, i) => ({
    name: `player_${i + 1}`,
    gold: 10000 + i * 1000,
    backpack: Math.floor(Math.random() * 5) + 1,
    ping: Math.floor(Math.random() * 40) + 30,
    rod: ["Basic Rod", "Magic Rod", "Golden Rod"][i % 3],
    status: i % 2 === 0 ? "Fishing" : "Idle",
    quest: {
        name: "Earn 5000 Gold",
        progress: Math.floor(Math.random() * 100)
    }
}));

let activePlayer = null;
let activeTab = "quest";

/* =========================
   ACCOUNTS MONITOR RENDER
========================= */
function renderAccountsMonitor() {
    const grid = document.getElementById("cardsGrid");
    const detail = document.getElementById("detailPanel");

    if (!grid || !detail) return;

    grid.innerHTML = "";
    detail.innerHTML = "";

    players.forEach(player => {
        const card = document.createElement("div");
        card.className = "player-card";

        card.innerHTML = `
            <h4>${player.name}</h4>
            <p>Gold: ${player.gold}</p>
            <p>Backpack: ${player.backpack}</p>
            <p>Ping: ${player.ping} ms</p>
            <p>Rod: ${player.rod}</p>

            <div class="quest-bar">
                <div class="quest-fill" style="width:${player.quest.progress}%"></div>
            </div>

            <div class="status ${player.status === "Fishing" ? "fishing" : "idle"}">
                ${player.status}
            </div>
        `;

        card.addEventListener("click", () => {
            activePlayer = player;
            renderDetail();
        });

        grid.appendChild(card);
    });
}

/* =========================
   DETAIL PANEL
========================= */
function renderDetail() {
    const detail = document.getElementById("detailPanel");
    if (!activePlayer || !detail) return;

    detail.innerHTML = `
        <h3>${activePlayer.name} Detail</h3>

        <div class="tabs">
            <button class="tab active">Quest</button>
        </div>

        <div class="quest-card">
            <strong>${activePlayer.quest.name}</strong>
            <div class="quest-bar large">
                <div class="quest-fill" style="width:${activePlayer.quest.progress}%"></div>
            </div>
            <small>${activePlayer.quest.progress}%</small>
        </div>
    `;
}
