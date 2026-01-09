document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("accountCards");
  const detailPanel = document.getElementById("detailPanel");

  if (!cardContainer) {
    console.error("❌ accountCards element tidak ditemukan");
    return;
  }

  // ===== DATA DUMMY (AMAN) =====
  const accounts = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Player ${i + 1}`,
    ping: Math.floor(Math.random() * 100) + " ms",
    backpack: Math.floor(Math.random() * 50),
    questProgress: Math.floor(Math.random() * 100)
  }));

  // ===== RENDER CARD =====
  function renderCards() {
    cardContainer.innerHTML = "";

    accounts.forEach(acc => {
      const card = document.createElement("div");
      card.className = "account-card";
      card.innerHTML = `
        <h3>${acc.name}</h3>

        <div class="card-info">
          <span>📶 ${acc.ping}</span>
          <span>🎒 ${acc.backpack}</span>
        </div>

        <div class="progress-wrapper">
          <div class="progress-bar">
            <div class="progress-fill" style="width:${acc.questProgress}%"></div>
          </div>
          <small>${acc.questProgress}% Quest</small>
        </div>
      `;

      card.addEventListener("click", () => openDetail(acc));
      cardContainer.appendChild(card);
    });
  }

  // ===== DETAIL PANEL =====
  function openDetail(acc) {
    if (!detailPanel) return;

    detailPanel.innerHTML = `
      <div class="detail-header">${acc.name}</div>

      <div class="tab-bar">
        <button class="tab-btn active" data-tab="fish">Fish</button>
        <button class="tab-btn" data-tab="item">Item</button>
        <button class="tab-btn" data-tab="quest">Quest</button>
      </div>

      <div class="tab-content" id="tabContent"></div>
    `;

    setupTabs(acc);
    renderFish();
  }

  // ===== TAB SYSTEM =====
  function setupTabs(acc) {
    const buttons = detailPanel.querySelectorAll(".tab-btn");
    const content = detailPanel.querySelector("#tabContent");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const tab = btn.dataset.tab;
        if (tab === "fish") renderFish();
        if (tab === "item") renderItem();
        if (tab === "quest") renderQuest();
      });
    });

    function renderFish() {
      content.innerHTML = `
        <div class="grid">
          <div class="grid-card">🐟 Tuna<br>Mutasi A<br>2.3kg<br>$120</div>
          <div class="grid-card">🐠 Salmon<br>Mutasi B<br>1.8kg<br>$90</div>
        </div>
      `;
    }

    function renderItem() {
      content.innerHTML = `
        <div class="grid">
          <div class="grid-card">🎣 Rod<br>$50</div>
          <div class="grid-card">🧰 Box<br>$30</div>
        </div>
      `;
    }

    function renderQuest() {
      content.innerHTML = `
        <div class="grid">
          <div class="grid-card quest">Catch 5 Fish<br><small>Klik untuk start</small></div>
          <div class="grid-card quest">Sell 3 Fish<br><small>Klik untuk start</small></div>
        </div>
      `;
    }
  }

  renderCards();
});
