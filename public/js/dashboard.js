const accountCards = document.getElementById('accountCards');
const detailPanel = document.getElementById('accountDetail');
const overlay = document.getElementById('detailOverlay');

/* DUMMY DATA */
const accounts = Array.from({ length: 10 }, (_, i) => ({
  username: `player_${i + 1}`,
  gold: 5000 + i * 3000,
  backpack: 1 + (i % 3),
  ping: 20 + i * 5,
  rod: ['Standard Rod', 'Magic Rod', 'Golden Rod'][i % 3],
  status: i % 2 === 0 ? 'Fishing' : 'Idle',
  progress: Math.floor(Math.random() * 100),
  quests: [
    {
      name: 'Catch Secret Fish',
      req: ['Find Secret Spot', 'Use Magic Rod'],
      reward: '500 Gold'
    },
    {
      name: 'Collect Rare Fish',
      req: ['Catch 5 Rare Fish'],
      reward: 'Rare Bait'
    },
    {
      name: 'Daily Challenge',
      req: ['Catch Any Fish'],
      reward: 'Lucky Charm'
    }
  ]
}));

/* RENDER CARDS */
accounts.forEach(acc => {
  const card = document.createElement('div');
  card.className = 'account-card';

  card.innerHTML = `
    <h3>${acc.username}</h3>
    <div class="card-line">Gold: ${acc.gold}</div>
    <div class="card-line">Backpack: ${acc.backpack}</div>
    <div class="card-line">Ping: ${acc.ping}ms</div>
    <div class="card-line">Rod: ${acc.rod}</div>

    <div class="status ${acc.status.toLowerCase()}">${acc.status}</div>

    <div class="progress-bar">
      <div class="progress" style="width:${acc.progress}%"></div>
    </div>
  `;

  card.onclick = () => openDetail(acc);
  accountCards.appendChild(card);
});

/* OPEN DETAIL */
function openDetail(acc) {
  detailPanel.innerHTML = `
    <h3>${acc.username}</h3>

    <div class="tab-buttons">
      <button class="tab-btn active" data-tab="quest">Quest</button>
      <button class="tab-btn" data-tab="info">Info</button>
    </div>

    <div id="questTab" class="tab-content active">
      ${acc.quests.map(q => `
        <div class="quest-item">
          <strong>${q.name}</strong>
          <ul>${q.req.map(r => `<li>${r}</li>`).join('')}</ul>
          <span class="reward">🎁 ${q.reward}</span>
        </div>
      `).join('')}
    </div>

    <div id="infoTab" class="tab-content">
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack}</p>
      <p>Ping: ${acc.ping}ms</p>
      <p>Rod: ${acc.rod}</p>
    </div>

    <button id="closeDetail">Close</button>
  `;

  detailPanel.classList.add('active');
  overlay.classList.add('active');

  const tabs = detailPanel.querySelectorAll('.tab-btn');
  const contents = detailPanel.querySelectorAll('.tab-content');

  tabs.forEach(btn => {
    btn.onclick = () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      contents.forEach(c => c.classList.remove('active'));
      document.getElementById(btn.dataset.tab + 'Tab').classList.add('active');
    };
  });

  document.getElementById('closeDetail').onclick = closeDetail;
  overlay.onclick = closeDetail;
}

/* CLOSE DETAIL */
function closeDetail() {
  detailPanel.classList.remove('active');
  overlay.classList.remove('active');
}
