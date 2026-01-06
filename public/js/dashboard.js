const cardsContainer = document.getElementById("accountCards");
const detailContainer = document.getElementById("accountDetail");
const logoutBtn = document.getElementById("logoutBtn");

/* ======================
   RENDER CARD GRID
====================== */
function renderCards() {
  cardsContainer.innerHTML = "";

  dummyAccounts.forEach(account => {
    const card = document.createElement("div");
    card.className = "account-card";
    card.innerHTML = `
      <h3>${account.username}</h3>
      <p>Gold: ${account.gold}</p>
      <p>Backpack: ${account.backpackCount}</p>
      <p>Status: 
        <span class="${account.status === 'Fishing' ? 'green' : 'red'}">
          ${account.status}
        </span>
      </p>
    `;

    // 🔥 INI BAGIAN PENTING
    card.addEventListener("click", () => {
      setActiveAccount(account.id);
      renderAccountDetail();
    });

    cardsContainer.appendChild(card);
  });
}

/* ======================
   RENDER DETAIL PANEL
====================== */
function renderAccountDetail() {
  const acc = getActiveAccount();
  if (!acc) return;

  detailContainer.classList.remove("hidden");

  detailContainer.innerHTML = `
    <h2>${acc.username}</h2>
    <h3>Gold: ${acc.gold}</h3>

    <div class="detail-tabs">
      <button onclick="renderFish()">Fish</button>
      <button onclick="renderItems()">Items</button>
      <button onclick="renderQuest()">Quest</button>
    </div>

    <div id="detailContent"></div>
  `;

  renderFish();
}

/* ======================
   DETAIL CONTENT
====================== */
function renderFish() {
  const acc = getActiveAccount();
  const container = document.getElementById("detailContent");

  container.innerHTML = acc.fish.map(f => `
    <div class="detail-item">
      <strong>${f.name}</strong><br>
      Mutasi: ${f.mutation}<br>
      Berat: ${f.weight}kg<br>
      Harga: ${f.price}<br>
      Jumlah: ${f.count}
    </div>
  `).join("");
}

function renderItems() {
  const acc = getActiveAccount();
  const container = document.getElementById("detailContent");

  container.innerHTML = acc.items.map(i => `
    <div class="detail-item">
      ${i.name} x${i.count}
    </div>
  `).join("");
}

function renderQuest() {
  const acc = getActiveAccount();
  const container = document.getElementById("detailContent");

  container.innerHTML = `
    <h4>${acc.quest.name}</h4>
    <progress value="${acc.quest.progress}" max="${acc.quest.total}"></progress>
  `;
}

/* ======================
   LOGOUT
====================== */
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("fishit_key_valid");
  location.reload();
});

/* INIT */
renderCards();
