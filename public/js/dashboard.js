const accountCards = document.getElementById('accountCards');
const logoutBtn = document.getElementById('logoutBtn');

// Logout
logoutBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Dummy accounts
const accounts = dummyAccounts; // Ambil dari dummyData.js

accounts.forEach(acc => {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <h4 class="username">${acc.username}</h4>
    <div class="info">
      <p class="gold">Gold: ${acc.gold}</p>
      <p class="backpack">Backpack: ${acc.backpack.length}</p>
    </div>
    <div class="card-status ${acc.status === 'Fishing' ? 'status-fishing' : 'status-idle'}">
      ${acc.status}
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${acc.questProgress}%"></div>
    </div>
  `;

  accountCards.appendChild(card);

  // Klik card (sementara hanya toggle active)
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});
