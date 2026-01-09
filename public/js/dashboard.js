// ===============================
// DASHBOARD SAFE VERSION
// ===============================

let selectedAccount = null;

// ===============================
// RENDER CARD LIST
// ===============================
function renderCards() {
  const container = document.getElementById("accountCards");
  if (!container) return;

  container.innerHTML = "";

  dummyAccounts.forEach((acc) => {
    const card = document.createElement("div");
    card.className = "account-card";
    card.dataset.player = acc.name;

    card.innerHTML = `
      <div class="card-header">
        <strong>${acc.name}</strong>
      </div>

      <div class="card-info">
        <div>Gold: ${acc.gold}</div>
        <div>Backpack: ${acc.backpack}</div>
        <div>Ping: ${acc.ping}ms</div>
        <div>Rod: ${acc.rod}</div>
      </div>

      <div class="card-quest">
        Quest: ${acc.quest ? acc.quest.name : "None"}
      </div>

      <div class="card-status ${acc.status === "Fishing" ? "fishing" : "idle"}">
        ${acc.status}
      </div>
    `;

    card.addEventListener("click", () => {
      selectedAccount = acc;
      highlightCard(acc.name);
      // DETAIL PANEL BELUM AKTIF (BIAR TIDAK PUTIH)
    });

    container.appendChild(card);
  });
}

// ===============================
// CARD HIGHLIGHT
// ===============================
function highlightCard(name) {
  document.querySelectorAll(".account-card").forEach((c) => {
    c.classList.toggle("active", c.dataset.player === name);
  });
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
});
