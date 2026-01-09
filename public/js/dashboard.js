const accountCards = document.getElementById('accountCards');
const detailPanel = document.getElementById('accountDetail');

const overlay = document.createElement('div');
overlay.id = 'detailOverlay';
document.body.appendChild(overlay);

/* QUEST POPUP */
const questPopup = document.createElement('div');
questPopup.className = 'quest-select';
document.body.appendChild(questPopup);

/* DATA */
const accounts = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  username: `player_${i + 1}`,
  gold: 8000 + i * 2000,
  backpack: 1 + (i % 4),
  ping: 20 + i * 6,
  rod: ['Standard Rod','Magic Rod','Golden Rod'][i % 3],
  status: i % 2 === 0 ? 'Fishing' : 'Idle',
  progress: Math.floor(Math.random() * 100),
  quest: 'None',
  quests: [
    {
      name: 'Catch Secret Fish',
      req: ['Find Secret Spot','Use Magic Rod'],
      reward: '500 Gold'
    },
    {
      name: 'Rare Fish Hunt',
      req: ['Catch 5 Rare Fish'],
      reward: 'Rare Bait'
    },
    {
      name: 'Daily Fishing',
      req: ['Catch Any Fish'],
      reward: 'Lucky Charm'
    }
  ]
}));

/* RENDER CARD */
function renderCards() {
  accountCards.innerHTML = '';

  accounts.forEach(acc => {
    const card = document.createElement('div');
    card.className = 'account-card';

    card.innerHTML = `
      <h3>${acc.username}</h3>
      <div class="card-line">Gold: ${acc.gold}</div>
      <div class="card-line">Backpack: ${acc.backpack}</div>
      <div class="card-line">Ping: ${acc.ping}ms</div>
      <div class="card-line">Rod: ${acc.rod}</div>
      <div class="card-line">Quest: ${acc.quest}</div>

      <div class="status ${acc.status.toLowerCase()}">${acc.status}</div>

      <div class="progress-bar">
        <div class="progress" style="width:${acc.progress}%"></div>
      </div>
    `;

    card.onclick = () => openDetail(acc);
    accountCards.appendChild(card);
  });
}

renderCards();

/* DETAIL */
function openDetail(acc) {
  detailPanel.innerHTML = `
    <h3>${acc.username}</h3>

    <div class="tab-buttons">
      <button class="tab-btn active" data-tab="quest">Quest</button>
      <button class="tab-btn" data-tab="info">Info</button>
    </div>

    <div id="questTab" class="tab-content active">
      <p><strong>Current Quest:</strong> ${acc.quest}</p>
      <button id="changeQuest">Change Quest</button>
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

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab+'Tab').classList.add('active');
    };
  });

  document.getElementById('changeQuest').onclick = () => openQuestPopup(acc);
  document.getElementById('closeDetail').onclick = closeDetail;
  overlay.onclick = closeDetail;
}

/* QUEST POPUP */
function openQuestPopup(acc) {
  questPopup.innerHTML = `
    <div class="quest-box">
      <h3>Select Quest</h3>
      ${acc.quests.map(q => `
        <div class="quest-option" data-name="${q.name}">
          <strong>${q.name}</strong>
          <ul>${q.req.map(r=>`<li>${r}</li>`).join('')}</ul>
          <span class="reward">🎁 ${q.reward}</span>
        </div>
      `).join('')}
      <button class="quest-cancel">Cancel</button>
    </div>
  `;

  questPopup.classList.add('active');

  questPopup.querySelectorAll('.quest-option').forEach(opt=>{
    opt.onclick = ()=>{
      acc.quest = opt.dataset.name;
      questPopup.classList.remove('active');
      closeDetail();
      renderCards();
    };
  });

  questPopup.querySelector('.quest-cancel').onclick = ()=>{
    questPopup.classList.remove('active');
  };
}

/* CLOSE DETAIL */
function closeDetail() {
  detailPanel.classList.remove('active');
  overlay.classList.remove('active');
      }
