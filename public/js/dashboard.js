document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".sidebar button[data-page]");
  const pages = document.querySelectorAll(".page-section");

  // PAGE SWITCHING (INI YANG SEBELUMNYA SALAH)
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      pages.forEach(p => p.classList.remove("active"));
      document.getElementById(btn.dataset.page).classList.add("active");
    });
  });

  // DEFAULT PAGE = PROFILE
  document.querySelector('[data-page="profile"]').click();

  // DUMMY ACCOUNT DATA
  const accounts = Array.from({ length: 10 }, (_, i) => ({
    name: `player_${i+1}`,
    gold: 10000 + i * 1000,
    backpack: Math.floor(Math.random() * 5) + 1,
    ping: 30 + Math.floor(Math.random() * 40),
    rod: ["Basic Rod", "Magic Rod", "Golden Rod"][i % 3],
    status: i % 2 === 0 ? "Fishing" : "Idle"
  }));

  const grid = document.getElementById("accountsGrid");

  accounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "account-card";

    card.innerHTML = `
      <h3>${acc.name}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack}</p>
      <p>Ping: ${acc.ping} ms</p>
      <p>Rod: ${acc.rod}</p>
      <div class="status ${acc.status.toLowerCase()}">${acc.status}</div>
    `;

    grid.appendChild(card);
  });

});
