const players = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `player_${i + 1}`,
    gold: 10000 + i * 1000,
    backpack: Math.floor(Math.random() * 5) + 1,
    ping: Math.floor(Math.random() * 40) + 30,
    rod: ["Basic Rod", "Magic Rod", "Golden Rod"][i % 3],
    status: i % 2 === 0 ? "Fishing" : "Idle",
    quest: i === 9 ? { name: "Earn 5000 Gold", progress: 70 } : null
}));

let activePlayer = null;
let activeTab = "fish";

function renderAccountsMonitor() {
    const grid = document.getElementById("cardsGrid");
    const detail = document.getElementById("detailPanel");

    if (!grid || !detail) return;

    grid.innerHTML = "";

    players.forEach(p => {
        const card = document.createElement("div");
        card.className = "player-card";

        card.innerHTML = `
            <h4>${p.name}</h4>
            <p>Gold: ${p.gold}</p>
            <p>Backpack: ${p.backpack}</p>
            <p>Ping: ${p.ping} ms</p>
            <p>Rod: ${p.rod}</p>

            ${p.quest ? `
            <div class="quest-bar">
                <div class="quest-fill" style="width:${p.quest.progress}%"></div>
            </div>` : ""}

            <div class="status ${p.status === "Fishing" ? "fishing" : "idle"}">
                ${p.status}
            </div>
        `;

        card.onclick = () => {
            activePlayer = p;
            activeTab = "fish";
            renderDetail();
        };

        grid.appendChild(card);
    });
}

function renderDetail() {
    const detail = document.getElementById("detailPanel");
    if (!activePlayer || !detail) return;

    detail.innerHTML = `
        <h3>${activePlayer.name} Detail</h3>

        <div class="tabs">
            <button onclick="switchTab('fish')" class="${activeTab==='fish'?'active':''}">Fish</button>
            <button onclick="switchTab('item')" class="${activeTab==='item'?'active':''}">Item</button>
            <button onclick="switchTab('quest')" class="${activeTab==='quest'?'active':''}">Quest</button>
        </div>

        <div id="tabContent"></div>
    `;

    renderTab();
}

function switchTab(tab) {
    activeTab = tab;
    renderDetail();
}

function renderTab() {
    const c = document.getElementById("tabContent");
    if (!c) return;

    if (activeTab === "quest") {
        if (!activePlayer.quest) {
            c.innerHTML = "<p>No active quest</p>";
        } else {
            c.innerHTML = `
                <p>${activePlayer.quest.name}</p>
                <div class="quest-bar large">
                    <div class="quest-fill" style="width:${activePlayer.quest.progress}%"></div>
                </div>
            `;
        }
        return;
    }

    c.innerHTML = `<p>No ${activeTab} data</p>`;
}

// ❗ JANGAN auto-render di load
// Render hanya saat Accounts Monitor dibuka
document.querySelector('[data-target="accounts"]')?.addEventListener("click", () => {
    setTimeout(renderAccountsMonitor, 50);
});
