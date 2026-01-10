// ===== DUMMY DATA (AMAN, BISA DIGANTI REALTIME NANTI) =====
const accountsData = Array.from({ length: 10 }).map((_, i) => ({
  username: `player_${i + 1}`,
  gold: 10000 + i * 1000,
  backpack: Math.floor(Math.random() * 5) + 1,
  ping: Math.floor(Math.random() * 40) + 30,
  rod: ["Basic Rod", "Magic Rod", "Golden Rod"][i % 3],
  status: i % 2 === 0 ? "Fishing" : "Idle",
  questProgress: Math.floor(Math.random() * 100)
}));

// ===== RENDER ACCOUNT CARDS =====
function renderAccounts() {
  const container = document.getElementById("accountCards");
  if (!container) {
    console.warn("accountCards container not found");
    return;
  }

  container.innerHTML = "";

  accountsData.forEach(acc => {
    const card = document.createElement("div");
    card.className = "account-card";

    card.innerHTML = `
      <h3>${acc.username}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack}</p>
      <p>Ping: ${acc.ping} ms</p>
      <p>Rod: ${acc.rod}</p>

      <span class="status ${acc.status.toLowerCase()}">
        ${acc.status}
      </span>

      <div class="progress-bar">
        <div class="progress" style="width:${acc.questProgress}%"></div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ===== TAB HANDLING =====
function showView(viewId) {
  document.querySelectorAll(".view").forEach(v => {
    v.classList.remove("active");
  });

  const view = document.getElementById(viewId);
  if (view) view.classList.add("active");

  // 🔥 PENTING: render SAAT accountsView aktif
  if (viewId === "accountsView") {
    setTimeout(renderAccounts, 0);
  }
}

// ===== SIDEBAR BUTTON =====
document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".menu-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    showView(btn.dataset.view + "View");
  });
});

// ===== DEFAULT LOAD =====
document.addEventListener("DOMContentLoaded", () => {
  showView("profileView"); // default pertama
});p
