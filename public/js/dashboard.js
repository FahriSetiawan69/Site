const cardsContainer = document.getElementById("accountCards");
const detailPanel = document.getElementById("accountDetail");

let selectedAccount = null;
let activeDetailTab = "fish";

/* ===== RENDER CARDS ===== */
function renderCards() {
  cardsContainer.innerHTML = "";

  dummyAccounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "account-card";

    card.innerHTML = `
      <h3>${acc.username}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack}</p>
      <p>Ping: ${acc.ping} ms</p>
      <p>Rod: ${acc.rod}</p>

      <div class="status ${acc.status}">
        ${acc.status.toUpperCase()}
      </div>

      <div class="progress">
        <div style="width:${acc.questProgress}%"></div>
      </div>
    `;

    card.onclick = () => openDetail(acc);
    cardsContainer.appendChild(card);
  });
}

/* ===== OPEN DETAIL ===== */
function openDetail(account) {
  selectedAccount = account;
  activeDetailTab = "fish";
  detailPanel.classList.remove("hidden");
  renderDetail();
}

/* ===== RENDER DETAIL ===== */
function renderDetail() {
  detailPanel.innerHTML = `
    <h3>${selectedAccount.username}</h3>

    <div class="detail-tabs">
      <div class="detail-tab ${activeDetailTab==="fish"?"active":""}" onclick="switchTab('fish')">Fish</div>
      <div class="detail-tab ${activeDetailTab==="item"?"active":""}" onclick="switchTab('item')">Item</div>
      <div class="detail-tab ${activeDetailTab==="quest"?"active":""}" onclick="switchTab('quest')">Quest</div>
    </div>

    <div class="detail-grid">
      ${renderDetailContent()}
    </div>
  `;
}

/* ===== SWITCH TAB ===== */
function switchTab(tab) {
  activeDetailTab = tab;
  renderDetail();
}

/* ===== DETAIL CONTENT ===== */
function renderDetailContent() {
  if (activeDetailTab === "fish") {
    return selectedAccount.fish.map(f => `
      <div class="grid-item">
        <strong>${f.name}</strong><br>
        ${f.mutation}<br>
        ${f.weight} kg<br>
        💰 ${f.price}
      </div>
    `).join("");
  }

  if (activeDetailTab === "item") {
    return selectedAccount.items.map(i => `
      <div class="grid-item">
        <strong>${i.name}</strong><br>
        💰 ${i.price}
      </div>
    `).join("");
  }

  if (activeDetailTab === "quest") {
    return selectedAccount.quests.map(q => `
      <div class="grid-item quest">
        <strong>${q.name}</strong><br>
        ${q.desc}
      </div>
    `).join("");
  }

  return "";
}

/* ===== INIT ===== */
renderCards();
