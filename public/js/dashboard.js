const cardGrid = document.getElementById("cardGrid");
const detailPanel = document.getElementById("detailPanel");

const accountMap = new Map();
let selectedAccountId = null;

/* ================================
   ENTRY POINT FROM LUA
================================ */
window.updateAccountsFromLua = function (accounts) {
  const incomingIds = new Set();

  accounts.forEach(acc => {
    incomingIds.add(acc.id);

    if (accountMap.has(acc.id)) {
      updateCard(acc);
    } else {
      createCard(acc);
    }
  });

  // Remove disconnected accounts
  [...accountMap.keys()].forEach(id => {
    if (!incomingIds.has(id)) {
      accountMap.get(id).remove();
      accountMap.delete(id);
      if (id === selectedAccountId) {
        detailPanel.innerHTML = "";
        selectedAccountId = null;
      }
    }
  });
};

/* ================================
   CREATE CARD
================================ */
function createCard(acc) {
  const card = document.createElement("div");
  card.className = "account-card";
  card.dataset.id = acc.id;

  card.innerHTML = buildCardHTML(acc);

  card.onclick = () => selectAccount(acc.id);

  cardGrid.appendChild(card);
  accountMap.set(acc.id, card);

  if (!selectedAccountId) {
    selectAccount(acc.id);
  }
}

/* ================================
   UPDATE CARD (NO RESET)
================================ */
function updateCard(acc) {
  const card = accountMap.get(acc.id);
  card.innerHTML = buildCardHTML(acc);

  if (acc.id === selectedAccountId) {
    renderDetail(acc);
  }
}

/* ================================
   SELECT ACCOUNT
================================ */
function selectAccount(id) {
  selectedAccountId = id;

  document.querySelectorAll(".account-card").forEach(c =>
    c.classList.toggle("active", c.dataset.id === id)
  );

  const acc = [...accountMap.entries()]
    .find(([key]) => key === id)?.[1];

  if (!acc) return;

  const data = [...arguments.callee.caller.arguments][0];
}

/* ================================
   CARD HTML
================================ */
function buildCardHTML(acc) {
  return `
    <h3>${acc.username}</h3>
    <p>Gold: ${acc.gold}</p>
    <p>Backpack: ${acc.backpack}</p>
    <p>Ping: ${acc.ping} ms</p>
    <p>Rod: ${acc.rod}</p>
    <span class="status ${acc.status.toLowerCase()}">
      ${acc.status}
    </span>
  `;
}

/* ================================
   DETAIL PANEL
================================ */
function renderDetail(acc) {
  detailPanel.innerHTML = `
    <h3>${acc.username} Detail</h3>
    <div class="tab-bar">
      <button class="tab active">Fish</button>
      <button class="tab">Item</button>
      <button class="tab">Quest</button>
    </div>
    <div class="detail-content">
      <p>${acc.quest?.name || "No quest"}</p>
      <div class="progress">
        <div class="progress-bar" style="width:${acc.quest?.progress || 0}%"></div>
      </div>
      <span>${acc.quest?.progress || 0}%</span>
    </div>
  `;
                }
