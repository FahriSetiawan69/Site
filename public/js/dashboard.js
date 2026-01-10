const cardContainer = document.getElementById("accountCards");
const detailPanel = document.getElementById("accountDetail");

let selectedAccountId = null;

/* =========================
   RENDER CARDS
========================= */
function renderCards() {
  cardContainer.innerHTML = "";

  dummyAccounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "account-card";
    card.dataset.id = acc.id;

    card.innerHTML = `
      <h3>${acc.username}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack}</p>
      <p>Ping: ${acc.ping} ms</p>
      <p>Rod: ${acc.rod}</p>

      <div class="status ${acc.status.toLowerCase()}">
        ${acc.status}
      </div>

      <div class="progress">
        <div class="progress-bar" style="width:${acc.questProgress || 0}%"></div>
      </div>
    `;

    card.addEventListener("click", () => {
      selectAccount(acc.id);
    });

    cardContainer.appendChild(card);
  });
}

/* =========================
   SELECT ACCOUNT
========================= */
function selectAccount(id) {
  selectedAccountId = id;
  const acc = dummyAccounts.find(a => a.id === id);
  if (!acc) return;

  renderDetail(acc);
}

/* =========================
   DETAIL PANEL
========================= */
function renderDetail(acc) {
  detailPanel.classList.remove("hidden");

  detailPanel.innerHTML = `
    <h2>${acc.username}</h2>
    <p><b>Status:</b> ${acc.status}</p>
    <p><b>Gold:</b> ${acc.gold}</p>
    <p><b>Rod:</b> ${acc.rod}</p>

    <h3 style="margin-top:16px;">Quest</h3>
    <p>${acc.quest || "No active quest"}</p>

    <div class="progress">
      <div class="progress-bar" style="width:${acc.questProgress || 0}%"></div>
    </div>
  `;
}

/* =========================
   INIT
========================= */
renderCards();
