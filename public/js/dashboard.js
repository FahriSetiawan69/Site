document.addEventListener("DOMContentLoaded", () => {

  /* ======================
     PAGE SWITCH (SIDEBAR)
  ====================== */
  const navButtons = document.querySelectorAll(".sidebar button[data-page]");
  const pages = document.querySelectorAll(".page-section");

  function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    navButtons.forEach(b => b.classList.remove("active"));

    const page = document.getElementById(id);
    const btn = document.querySelector(`.sidebar button[data-page="${id}"]`);

    if (page) page.classList.add("active");
    if (btn) btn.classList.add("active");
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => showPage(btn.dataset.page));
  });

  showPage("profile"); // default


  /* ======================
     DATA (SINGLE SOURCE)
  ====================== */
  const players = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: `player_${i + 1}`,
    gold: 10000 + i * 1500,
    backpack: 3 + (i % 4),
    ping: 30 + i * 4,
    rod: ["Basic Rod", "Magic Rod", "Golden Rod"][i % 3],
    status: i % 2 === 0 ? "Fishing" : "Idle",
    quest: {
      title: "Catch Secret Fish",
      progress: (i + 1) * 10,
      max: 100
    },
    fish: [
      { name: "Golden Carp", weight: "2.5kg", price: 5000 },
      { name: "Rainbow Trout", weight: "1.2kg", price: 2000 }
    ],
    items: [
      { name: "Magic Bait", price: 300 },
      { name: "Lucky Charm", price: 800 }
    ]
  }));


  /* ======================
     RENDER ACCOUNT CARDS
  ====================== */
  const grid = document.getElementById("cardGrid");
  const detail = document.getElementById("detailPanel");

  function renderCards() {
    if (!grid) return;
    grid.innerHTML = "";

    players.forEach(player => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h4>${player.name}</h4>
        <p>Gold: ${player.gold}</p>
        <p>Backpack: ${player.backpack}</p>
        <p>Ping: ${player.ping} ms</p>
        <p>Rod: ${player.rod}</p>

        <div class="quest-mini">
          <div class="quest-bar">
            <span style="width:${player.quest.progress}%"></span>
          </div>
          <small>${player.quest.title}</small>
        </div>

        <div class="status ${player.status.toLowerCase()}">
          ${player.status}
        </div>
      `;

      card.onclick = () => renderDetail(player);
      grid.appendChild(card);
    });
  }


  /* ======================
     DETAIL PANEL
  ====================== */
  function renderDetail(player) {
    detail.innerHTML = `
      <h3>${player.name}</h3>
      <p>Gold: ${player.gold}</p>

      <div class="detail-tabs">
        <button data-tab="fish" class="active">Fish</button>
        <button data-tab="item">Item</button>
        <button data-tab="quest">Quest</button>
      </div>

      <div class="detail-content"></div>
    `;

    const content = detail.querySelector(".detail-content");
    const tabs = detail.querySelectorAll(".detail-tabs button");

    function activateTab(tab) {
      tabs.forEach(t => t.classList.remove("active"));
      detail.querySelector(`[data-tab="${tab}"]`).classList.add("active");

      if (tab === "fish") {
        content.innerHTML = player.fish.map(f => `
          <div class="grid-item">
            <b>${f.name}</b>
            <div>${f.weight}</div>
            <div>Price: ${f.price}</div>
          </div>
        `).join("");
      }

      if (tab === "item") {
        content.innerHTML = player.items.map(i => `
          <div class="grid-item">
            <b>${i.name}</b>
            <div>Price: ${i.price}</div>
          </div>
        `).join("");
      }

      if (tab === "quest") {
        content.innerHTML = `
          <h4>${player.quest.title}</h4>
          <div class="quest-bar big">
            <span style="width:${player.quest.progress}%"></span>
          </div>
          <p>${player.quest.progress} / ${player.quest.max}</p>
        `;
      }
    }

    tabs.forEach(tab => {
      tab.onclick = () => activateTab(tab.dataset.tab);
    });

    activateTab("fish");
  }

  renderCards();
});
