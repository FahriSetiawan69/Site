// ===============================
// SAFE INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  initDashboard();
});

// ===============================
// DUMMY DATA (AMAN DIGANTI LUA)
// ===============================
const accounts = Array.from({ length: 8 }).map((_, i) => ({
  username: `player_${i + 1}`,
  gold: 5000 + i * 750,
  backpack: 1 + (i % 3),
  ping: 25 + i * 4,
  rod: ["Basic Rod", "Magic Rod", "Golden Rod"][i % 3],
  status: i % 2 === 0 ? "Fishing" : "Idle",
  progress: Math.floor(Math.random() * 100),
  quests: [
    { name: "Catch 20 Fish", progress: Math.floor(Math.random() * 100) },
    { name: "Earn 5.000 Gold", progress: Math.floor(Math.random() * 100) }
  ]
}));

// ===============================
// INIT DASHBOARD
// ===============================
function initDashboard() {
  const grid = document.getElementById("accountCards");
  const detail = document.getElementById("accountDetail");

  if (!grid) return; // ANTI WHITE SCREEN

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

    card.addEventListener("click", () => showDetail(acc, detail));
    grid.appendChild(card);
  });
}

// ===============================
// DETAIL + QUEST
// ===============================
function showDetail(acc, detail) {
  if (!detail) return;

  detail.classList.remove("hidden");

  const questHTML = acc.quests.map(q => `
    <div class="quest">
      <h4>${q.name}</h4>
      <div class="quest-progress">
        <span style="width:${q.progress}%"></span>
      </div>
      <small>${q.progress}%</small>
    </div>
  `).join("");

  detail.innerHTML = `
    <h2>${acc.username}</h2>
    <p><b>Status:</b> ${acc.status}</p>
    <p><b>Gold:</b> ${acc.gold}</p>
    <p><b>Rod:</b> ${acc.rod}</p>

    <h3>Quest</h3>
    <div class="quest-list">
      ${questHTML}
    </div>
  `;
}

// ===============================
// LOGOUT (SAFE)
// ===============================
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.clear();
    location.href = "/";
  };
    }
