// ========= DATA =========
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

// ========= RENDER GRID =========
function renderAccountsMonitor() {
    const grid = document.getElementById("cardsGrid");
    const detail = document.getElementById("detailPanel");

    if (!grid || !detail) return;

    grid.innerHTML = "";
    detail.innerHTML = "";

    players.forEach(p => {
        const card = document.createElement("div");
        card.className = "player-card";

        card.innerHTML = `
            <h4>${p.name}</h4>
            <p>Gold: ${p.gold}</p>
            <p>Backpack: ${p.backpack}</p>
            <p>Ping: ${p.ping} ms</p>
            <p>Rod: ${p.rod}</p>

            <div class="quest-bar">
                <div class="quest-fill" style="width:${p.quest.progress}%"></div>
            </div>

            <div class="status ${p.status === "Fishing" ? "fishing" : "idle"}">
                ${p.status}
            </div>
        `;

        card.onclick = () => {
            activePlayer = p;
            renderDetail();
        };

        grid.appendChild(card);
    });
}

// ========= DETAIL =========
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
