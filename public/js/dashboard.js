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

// Dummy accounts
const accounts = dummyAccounts;

// Default quests
const defaultQuests = [
  { name: "Catch Secret Fish", target: 3 },
  { name: "Collect Rare Fish", target: 5 },
  { name: "Complete Daily Challenge", target: 1 }
];

// Generate cards
accounts.forEach(acc => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <h4>${acc.username}</h4>
    <p>Gold: ${acc.gold}</p>
    <p>Backpack: ${acc.backpack.length}</p>
    <div class="card-status ${acc.status === 'Fishing' ? 'status-fishing' : 'status-idle'}">
      ${acc.status}
    </div>
    <div class="progress-bar"><div class="progress-fill" style="width:${acc.questProgress}%"></div></div>
  `;
  accountCards.appendChild(card);

  card.addEventListener('click', () => showDetail(acc, card));
});

// Show detail panel
function showDetail(account, cardEl) {
  accountDetail.classList.remove('hidden');
  detailUsername.textContent = account.username;
  detailGold.textContent = `Gold: ${account.gold}`;

  document.querySelector('.fish-tab').innerHTML = account.fish.map(f => `<p>${f.name} (${f.weight}kg) Mut: ${f.mutation}</p>`).join('');
  document.querySelector('.items-tab').innerHTML = account.items.map(i => `<p>${i.name} x${i.count}</p>`).join('');

  // QUEST TAB
  const questContainer = document.querySelector('.quest-tab');
  questContainer.innerHTML = '';
  defaultQuests.forEach(q => {
    const progress = account.questProgress; 
    const p = document.createElement('p');
    p.textContent = `${q.name}: ${progress} / ${q.target}`;
    p.addEventListener('click', () => {
      account.questProgress = Math.min(progress + 1, q.target); 
      cardEl.querySelector('.progress-fill').style.width = (account.questProgress/q.target*100) + '%';
      p.textContent = `${q.name}: ${account.questProgress} / ${q.target}`;
    });
    questContainer.appendChild(p);
  });

  // Reset tabs
  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabButtons[0].classList.add('active');
  tabContents.forEach(tab => tab.classList.add('hidden'));
  document.querySelector('.fish-tab').classList.remove('hidden');
}

// TAB SWITCH
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tabContents.forEach(tab => tab.classList.add('hidden'));
    document.querySelector(`.${btn.dataset.tab}-tab`).classList.remove('hidden');
  });
});
