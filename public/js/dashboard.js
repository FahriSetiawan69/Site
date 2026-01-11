// ===============================
// DASHBOARD STATE
// ===============================
let accountsData = [];
let activeAccountId = null;

// ===============================
// DOM ELEMENTS
// ===============================
const cardGrid = document.getElementById("cardGrid");
const detailPanel = document.getElementById("detailPanel");

// ===============================
// INITIAL STATE
// ===============================
renderEmptyState();

// ===============================
// RENDER EMPTY STATE
// ===============================
function renderEmptyState() {
  cardGrid.innerHTML = `
    <div class="empty-state">
      <h3>No account connected</h3>
      <p>Waiting for Lua (Delta) connection...</p>
    </div>
  `;
  detailPanel.innerHTML = "";
}

// ===============================
// RENDER ACCOUNT CARDS
// ===============================
function renderAccounts(accounts) {
  cardGrid.innerHTML = "";
  detailPanel.innerHTML = "";

  if (!accounts || accounts.length === 0) {
    renderEmptyState();
    return;
  }

  accounts.forEach(account => {
    const card = document.createElement("div");
    card.className = "account-card";
    card.dataset.id = account.id;

    card.innerHTML = `
      <h4>${account.username}</h4>
      <p>Gold: ${account.gold}</p>
      <p>Backpack: ${account.backpack}</p>
      <p>Ping: ${account.ping} ms</p>
      <p>Rod: ${account.rod}</p>
      <button class="status-btn ${account.status === "Fishing" ? "fishing" : "idle"}">
        ${account.status}
      </button>
    `;

    card.addEventListener("click", () => {
      setActiveAccount(account.id);
    });

    cardGrid.appendChild(card);
  });
}

// ===============================
// SET ACTIVE ACCOUNT
// ===============================
function setActiveAccount(accountId) {
  activeAccountId = accountId;
  const account = accountsData.find(acc => acc.id === accountId);
  if (!account) return;

  renderDetail(account);

  document.querySelectorAll(".account-card").forEach(card => {
    card.classList.toggle(
      "active",
      card.dataset.id === accountId
    );
  });
}

// ===============================
// RENDER DETAIL PANEL
// ===============================
function renderDetail(account) {
  detailPanel.innerHTML = `
    <h3>${account.username} Detail</h3>

    <div class="detail-tabs">
      <button class="tab-btn active" data-tab="fish">Fish</button>
      <button class="tab-btn" data-tab="item">Item</button>
      <button class="tab-btn" data-tab="quest">Quest</button>
    </div>

    <div class="detail-content" id="detailContent">
      ${renderQuestContent(account)}
    </div>
  `;

  bindDetailTabs(account);
}

// ===============================
// DETAIL TAB HANDLER
// ===============================
function bindDetailTabs(account) {
  const buttons = detailPanel.querySelectorAll(".tab-btn");
  const content = detailPanel.querySelector("#detailContent");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.dataset.tab;

      if (tab === "quest") {
        content.innerHTML = renderQuestContent(account);
      } else {
        content.innerHTML = `<p>No data.</p>`;
      }
    });
  });
}

// ===============================
// QUEST RENDER
// ===============================
function renderQuestContent(account) {
  if (!account.quest) {
    return `<p>No active quest</p>`;
  }

  return `
    <div class="quest-card">
      <p>${account.quest.name}</p>
      <div class="progress-bar">
        <div class="progress" style="width:${account.quest.progress}%"></div>
      </div>
      <span>${account.quest.progress}%</span>
    </div>
  `;
}

// ===============================
// PUBLIC API (FOR LUA / BACKEND)
// ===============================

/**
 * Dipanggil oleh Lua / backend
 * Contoh:
 * updateAccountsFromLua([...])
 */
window.updateAccountsFromLua = function (data) {
  if (!Array.isArray(data)) return;

  accountsData = data;
  renderAccounts(accountsData);

  if (accountsData.length > 0) {
    setActiveAccount(accountsData[0].id);
  }
};
