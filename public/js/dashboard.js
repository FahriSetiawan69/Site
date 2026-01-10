/* ===== VIEW SWITCH ===== */
const menuItems = document.querySelectorAll(".menu-item");
const views = document.querySelectorAll(".view");

menuItems.forEach(btn => {
  btn.onclick = () => {
    menuItems.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    views.forEach(v => v.classList.remove("active"));
    document.getElementById(`view-${btn.dataset.view}`).classList.add("active");
  };
});

/* ===== LOGOUT ===== */
document.getElementById("logoutBtn").onclick = () => {
  localStorage.clear();
  location.href = "/";
};

/* ===== MONITOR FEATURE (UNCHANGED CORE LOGIC) ===== */
const grid = document.querySelector(".card-grid");
const detail = document.querySelector(".detail-panel");
let activeIndex = null;

const players = Array.from({ length: 10 }, (_, i) => ({
  name: `player_${i + 1}`,
  gold: 10000 + i * 1000,
  backpack: 5,
  ping: 40,
  rod: i % 2 === 0 ? "Magic Rod" : "Basic Rod",
  status: Math.random() > 0.4 ? "Fishing" : "Idle",
  questActive: null,
  questProgress: 0
}));

function renderCards() {
  grid.innerHTML = "";
  players.forEach((p, i) => {
    const c = document.createElement("div");
    c.className = "player-card";
    c.innerHTML = `
      <b>${p.name}</b><br>
      Gold: ${p.gold}<br>
      Backpack: ${p.backpack}<br>
      Status: ${p.status}<br>
      Quest: ${p.questActive || "None"}
    `;
    c.onclick = () => {
      activeIndex = i;
      renderDetail(p);
    };
    grid.appendChild(c);
  });
}

function renderDetail(p) {
  detail.innerHTML = `
    <h3>${p.name}</h3>
    <p>Gold: ${p.gold}</p>
    <p>Status: ${p.status}</p>
    <p>Rod: ${p.rod}</p>
  `;
}

renderCards();
