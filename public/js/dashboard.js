// -------- VIEW SWITCHING --------
const navButtons = document.querySelectorAll(".nav-btn");
const views = document.querySelectorAll(".view");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const viewId = btn.dataset.view;
    views.forEach(v => v.classList.remove("active"));
    document.getElementById(viewId).classList.add("active");
  });
});

// -------- DUMMY ACCOUNTS DATA --------
const accounts = Array.from({ length: 10 }).map((_, i) => ({
  name: `player_${i + 1}`,
  gold: 10000 + i * 1000,
  backpack: Math.floor(Math.random() * 5) + 1,
  ping: 30 + Math.floor(Math.random() * 40),
  rod: ["Basic Rod", "Magic Rod", "Golden Rod"][i % 3],
  status: i % 2 === 0 ? "Fishing" : "Idle"
}));

// -------- RENDER ACCOUNTS --------
const grid = document.getElementById("accountsGrid");

function renderAccounts() {
  grid.innerHTML = "";

  accounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "account-card";

    card.innerHTML = `
      <h3>${acc.name}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack}</p>
      <p>Ping: ${acc.ping} ms</p>
      <p>Rod: ${acc.rod}</p>
      <div class="status ${acc.status.toLowerCase()}">
        ${acc.status}
      </div>
    `;

    grid.appendChild(card);
  });
}

renderAccounts();
