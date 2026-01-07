const accountCards = document.getElementById('accountCards');
const accountDetail = document.getElementById('accountDetail');
const logoutBtn = document.getElementById('logoutBtn');

const detailUsername = document.getElementById('detailUsername');
const detailGold = document.getElementById('detailGold');

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab');

logoutBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Dummy accounts data
const accounts = dummyAccounts; // dari dummyData.js

// Generate cards
accounts.forEach((acc, idx) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <h4>${acc.username}</h4>
    <p>Gold: ${acc.gold}</p>
    <p>Backpack: ${acc.backpack.length}</p>
  `;
  accountCards.appendChild(card);

  card.addEventListener('click', () => {
    showDetail(acc);
  });
});

// Show detail panel
function showDetail(account) {
  accountDetail.classList.remove('hidden');
  detailUsername.textContent = account.username;
  detailGold.textContent = `Gold: ${account.gold}`;

  document.querySelector('.fish-tab').innerHTML = account.fish.map(f => `<p>${f.name} (${f.weight}kg)</p>`).join('');
  document.querySelector('.items-tab').innerHTML = account.items.map(i => `<p>${i.name} x${i.count}</p>`).join('');
  document.querySelector('.quest-tab').innerHTML = account.quest.map(q => `<p>${q.name}: ${q.progress} / ${q.target}</p>`).join('');

  // Reset active tab
  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabButtons[0].classList.add('active');

  tabContents.forEach(tab => tab.classList.add('hidden'));
  document.querySelector('.fish-tab').classList.remove('hidden');
}

// Tab click
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    tabContents.forEach(tab => tab.classList.add('hidden'));
    const target = btn.dataset.tab;
    document.querySelector(`.${target}-tab`).classList.remove('hidden');
  });
});
