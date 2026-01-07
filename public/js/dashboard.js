const accountCards = document.getElementById('accountCards');
const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Dummy accounts
const accounts = dummyAccounts;

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

  // Klik card (sementara hanya highlight, detail card nanti)
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});
