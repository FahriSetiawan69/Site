// =======================
// DUMMY DATA
// =======================
const dummyAccounts = [
  {
    username: "Player_1",
    gold: 1200,
    backpack: 12,
    ping: 45,
    rod: "Magic Rod",
    quest: "Catch Secret Fish",
    questProgress: 2,
    status: "Fishing",
    fish: [
      { name: "Golden Carp", weight: 2.5, mutation: "Rare", price: 500 },
      { name: "Rainbow Trout", weight: 1.2, mutation: "Normal", price: 120 },
      { name: "Secret Fish", weight: 0.8, mutation: "Secret", price: 1000 }
    ],
    items: [
      { name: "Magic Rod", quantity: 1 },
      { name: "Golden Bait", quantity: 3 },
      { name: "Lucky Charm", quantity: 2 }
    ]
  },
  // Buat 9 akun lagi sebagai contoh
];

for (let i = 2; i <= 10; i++) {
  dummyAccounts.push({
    username: `Player_${i}`,
    gold: 800 + i * 50,
    backpack: 5 + i,
    ping: 50 + i,
    rod: "Standard Rod",
    quest: "Collect Rare Fish",
    questProgress: i % 5,
    status: i % 2 === 0 ? "Fishing" : "Idle",
    fish: [
      { name: "Rainbow Trout", weight: 1.2, mutation: "Normal", price: 120 }
    ],
    items: [
      { name: "Standard Bait", quantity: 2 }
    ]
  });
}

// =======================
// RENDER CARD GRID
// =======================
const accountCards = document.getElementById('accountCards');
const accountDetail = document.getElementById('accountDetail');

function renderCards() {
  accountCards.innerHTML = ""; // reset
  dummyAccounts.forEach((acc, idx) => {
    const card = document.createElement('div');
    card.className = 'account-card';
    card.dataset.index = idx;

    card.innerHTML = `
      <h3>${acc.username}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack}</p>
      <p>Status: <span class="${acc.status === "Fishing" ? "green" : "red"}">${acc.status}</span></p>
      <p>Rod: ${acc.rod}</p>
      <p>Quest: ${acc.quest} (${acc.questProgress})</p>
      <div class="quest-bar">
        <div class="progress" style="width:${(acc.questProgress/5)*100}%"></div>
      </div>
    `;

    card.addEventListener('click', () => {
      showAccountDetail(idx);
    });

    accountCards.appendChild(card);
  });
}

// =======================
// SHOW DETAIL PANEL
// =======================
function showAccountDetail(index) {
  const acc = dummyAccounts[index];
  accountDetail.innerHTML = `
    <h3>${acc.username}</h3>
    <p>Gold: ${acc.gold}</p>
    <div class="grid-container">
      <button class="tab-btn active" data-tab="fish">Fish (${acc.fish.length})</button>
      <button class="tab-btn" data-tab="items">Items (${acc.items.length})</button>
      <button class="tab-btn" data-tab="quest">Quest</button>
    </div>
    <div id="tabContent" class="tab-content">
      ${renderTabContent(acc, 'fish')}
    </div>
  `;
  accountDetail.classList.remove('hidden');

  const tabBtns = accountDetail.querySelectorAll('.tab-btn');
  const tabContent = accountDetail.querySelector('#tabContent');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabContent.innerHTML = renderTabContent(acc, btn.dataset.tab);
    });
  });
}

function renderTabContent(acc, tab) {
  if (tab === 'fish') {
    return acc.fish.map(f => `
      <div class="item-card">
        <p><strong>${f.name}</strong></p>
        <p>Mutation: ${f.mutation}</p>
        <p>Weight: ${f.weight}kg</p>
        <p>Price: $${f.price}</p>
      </div>
    `).join('');
  } else if (tab === 'items') {
    return acc.items.map(i => `
      <div class="item-card">
        <p><strong>${i.name}</strong></p>
        <p>Qty: ${i.quantity}</p>
      </div>
    `).join('');
  } else if (tab === 'quest') {
    return `<p>${acc.quest} (${acc.questProgress}/5)</p>`;
  }
}

// =======================
// LOGOUT BUTTON
// =======================
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    window.location.href = "index.html";
  });
}

// =======================
// INIT
// =======================
renderCards();
