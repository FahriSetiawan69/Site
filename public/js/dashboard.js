console.log("dashboard.js loaded");

const accountCards = document.getElementById("accountCards");
const detailPanel = document.getElementById("accountDetail");

/* DUMMY DATA 10 AKUN */
const accounts = Array.from({ length: 10 }, (_, i) => ({
  username: `player_${i + 1}`,
  gold: 10000 + i * 1000,
  backpack: Math.floor(Math.random() * 10),
  ping: Math.floor(Math.random() * 100) + " ms",
  rod: "Basic Rod",
  status: Math.random() > 0.5 ? "Fishing" : "Idle",
  progress: Math.floor(Math.random() * 100)
}));

/* RENDER CARD */
function renderCards() {
  accountCards.innerHTML = "";

  accounts.forEach((acc, index) => {
    const card = document.createElement("div");
    card.className = "account-card";

    card.innerHTML = `
      <div class="card-title">${acc.username}</div>
      <div class="card-row">Gold: ${acc.gold}</div>
      <div class="card-row">Backpack: ${acc.backpack}</div>
      <div class="card-row">Ping: ${acc.ping}</div>
      <div class="card-row">Rod: ${acc.rod}</div>
      <div class="card-row status ${acc.status.toLowerCase()}">
        ${acc.status}
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${acc.progress}%"></div>
      </div>
    `;

    card.onclick = () => showDetail(acc);
    accountCards.appendChild(card);
  });
}

/* DETAIL CARD */
function showDetail(acc) {
  detailPanel.classList.remove("hidden");
  detailPanel.innerHTML = `
    <h3>${acc.username}</h3>
    <p>Gold: ${acc.gold}</p>
    <p>Status: ${acc.status}</p>
    <p>Quest: (belum diaktifkan)</p>
  `;
}

/* LOGOUT */
document.getElementById("logoutBtn").onclick = () => {
  window.location.href = "/";
};

/* INIT */
renderCards();
