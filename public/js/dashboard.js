// ===============================
// DUMMY DATA (AMAN)
// ===============================
const accounts = Array.from({ length: 10 }).map((_, i) => ({
  username: `player_${i + 1}`,
  gold: 8000 + i * 1000,
  backpack: 1 + (i % 4),
  ping: 20 + i * 5,
  rod: ["Standard Rod", "Magic Rod", "Golden Rod"][i % 3],
  status: i % 2 === 0 ? "Fishing" : "Idle",
  progress: Math.floor(Math.random() * 100)
}));

const grid = document.getElementById("accountCards");
const detail = document.getElementById("accountDetail");

// ===============================
// RENDER CARD
// ===============================
function renderCards() {
  if (!grid) return;

  grid.innerHTML = "";

  accounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "account-card";

    card.innerHTML = `
      <h3>${acc.username}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack}</p>
      <p>Ping: ${acc.ping} ms</p>
      <p>Rod: ${acc.rod}</p>

      <div class="status ${acc.status === "Fishing" ? "fishing" : "idle"}">
        ${acc.status}
      </div>

      <div class="progress-bar">
        <div class="progress" style="width:${acc.progress}%"></div>
      </div>
    `;

    card.addEventListener("click", () => {
      if (!detail) return;
      detail.classList.remove("hidden");
      detail.innerHTML = `
        <h3>${acc.username}</h3>
        <p>Detail panel aman (akan dikembangkan)</p>
      `;
    });

    grid.appendChild(card);
  });
}

// ===============================
// LOGOUT FIX
// ===============================
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.clear();
    window.location.href = "/";
  };
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", renderCards);
