document.addEventListener("DOMContentLoaded", () => {

  const cardsContainer = document.getElementById("accountCards");
  const detailPanel = document.getElementById("accountDetail");

  if (!cardsContainer) {
    console.error("accountCards NOT FOUND");
    return;
  }

  // ====== DUMMY DATA FALLBACK ======
  const accounts = window.accountsData || [
    {
      id: 1,
      username: "player_1",
      gold: 12000,
      backpack: 3,
      ping: 35,
      rod: "Magic Rod",
      quest: "Secret Hunter",
      progress: 60,
      status: "Fishing"
    },
    {
      id: 2,
      username: "player_2",
      gold: 8000,
      backpack: 2,
      ping: 50,
      rod: "Standard Rod",
      quest: "None",
      progress: 20,
      status: "Idle"
    }
  ];

  // ====== RENDER CARD ======
  function createCard(acc) {
    const card = document.createElement("div");
    card.className = "account-card";

    card.innerHTML = `
      <h3>${acc.username}</h3>

      <div class="card-info">
        <div>Gold: ${acc.gold}</div>
        <div>Backpack: ${acc.backpack}</div>
        <div>Ping: ${acc.ping}ms</div>
        <div>Rod: ${acc.rod}</div>
        <div>Quest: ${acc.quest}</div>
      </div>

      <div class="status ${acc.status === "Fishing" ? "fishing" : "idle"}">
        ${acc.status}
      </div>

      <div class="progress-bar">
        <div class="progress" style="width:${acc.progress}%"></div>
      </div>
    `;

    card.addEventListener("click", () => showDetail(acc));

    return card;
  }

  // ====== RENDER ALL ======
  function renderCards() {
    cardsContainer.innerHTML = "";
    accounts.forEach(acc => {
      cardsContainer.appendChild(createCard(acc));
    });
  }

  // ====== DETAIL PANEL ======
  function showDetail(acc) {
    if (!detailPanel) return;

    detailPanel.classList.remove("hidden");
    detailPanel.innerHTML = `
      <h2>${acc.username}</h2>

      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack}</p>
      <p>Ping: ${acc.ping}ms</p>
      <p>Rod: ${acc.rod}</p>
      <p>Quest: ${acc.quest}</p>

      <button onclick="document.getElementById('accountDetail').classList.add('hidden')">
        Close
      </button>
    `;
  }

  // ====== INIT ======
  renderCards();

});
