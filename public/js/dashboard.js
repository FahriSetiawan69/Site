const players = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `player_${i + 1}`,
    gold: 10000 + i * 1000,
    backpack: Math.floor(Math.random() * 5) + 1,
    ping: Math.floor(Math.random() * 40) + 30,
    rod: ["Basic Rod", "Magic Rod", "Golden Rod"][i % 3],
    status: i % 2 === 0 ? "Fishing" : "Idle",
    quest: i === 9 ? {
        name: "Earn 5000 Gold",
        progress: 70
    } : null
}));

let activePlayer = null;
let activeDetailTab = "fish";

const grid = document.getElementById("cardsGrid");
const detail = document.getElementById("detailPanel");

function renderCards() {
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
            activeDetailTab = "fish";
            renderDetail();
        };

        grid.appendChild(card);
    });
}

function renderDetail() {
    if (!activePlayer) return;

    detail.innerHTML = `
        <h3>${activePlayer.name} Detail</h3>

        <div class="tabs">
            <button class="tab ${activeDetailTab === "fish" ? "active" : ""}" onclick="switchTab('fish')">Fish</button>
            <button class="tab ${activeDetailTab === "item" ? "active" : ""}" onclick="switchTab('item')">Item</button>
            <button class="tab ${activeDetailTab === "quest" ? "active" : ""}" onclick="switchTab('quest')">Quest</button>
        </div>

        <div id="tabContent"></div>
    `;

    renderTabContent();
}

function switchTab(tab) {
    activeDetailTab = tab;
    renderDetail();
}

function renderTabContent() {
    const content = document.getElementById("tabContent");

    if (activeDetailTab === "fish") {
        content.innerHTML = "<p>No fish data yet</p>";
    }

    if (activeDetailTab === "item") {
        content.innerHTML = "<p>No item data yet</p>";
    }

    if (activeDetailTab === "quest") {
        if (!activePlayer.quest) {
            content.innerHTML = "<p>No active quest</p>";
        } else {
            content.innerHTML = `
                <div class="quest-card">
                    <div>${activePlayer.quest.name}</div>
                    <div class="quest-bar large">
                        <div class="quest-fill" style="width:${activePlayer.quest.progress}%"></div>
                    </div>
                    <small>${activePlayer.quest.progress}%</small>
                </div>
            `;
        }
    }
}

renderCards();
