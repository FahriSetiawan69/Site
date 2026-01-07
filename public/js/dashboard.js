
const accountCards = document.getElementById('accountCards');
const logoutBtn = document.getElementById('logoutBtn');
const accountDetail = document.getElementById('accountDetail');

// Logout
logoutBtn.addEventListener('click', () => window.location.href='index.html');

// Generate Cards
dummyAccounts.forEach(acc => {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <h4 class="username">${acc.username}</h4>
    <div class="info">
      <p class="gold">Gold: ${acc.gold}</p>
      <p class="backpack">Backpack: ${acc.backpack.length}</p>
      <p class="ping">Ping: ${acc.ping}ms</p>
      <p class="rod">Rod: ${acc.rod}</p>
    </div>
    <div class="card-status ${acc.status === 'Fishing' ? 'status-fishing' : 'status-idle'}">
      ${acc.status}
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${acc.questProgress}%"></div>
    </div>
  `;

  accountCards.appendChild(card);

  // Klik card → tampil detail panel dummy
  card.addEventListener('click', () => {
    accountDetail.classList.add('active');
    accountDetail.innerHTML = `
      <h3>${acc.username}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack items: ${acc.backpack.length}</p>
      <p>Status: ${acc.status}</p>
      <p>Rod: ${acc.rod}</p>
      <button id="closeDetail">Close</button>
    `;
    document.getElementById('closeDetail').addEventListener('click', () => {
      accountDetail.classList.remove('active');
    });
  });
});
