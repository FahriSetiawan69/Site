// DETAIL PANEL GRID LOGIC
const tabs = ["Fish", "Items", "Quest"];

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

  card.addEventListener('click', () => {
    accountDetail.classList.add('active');

    // DETAIL PANEL CONTENT
    accountDetail.innerHTML = `
      <h3>${acc.username}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack items: ${acc.backpack.length}</p>
      <p>Status: ${acc.status}</p>
      <p>Rod: ${acc.rod}</p>
      <div class="detail-tabs">
        <div class="detail-tab active" data-tab="Fish">Fish</div>
        <div class="detail-tab" data-tab="Items">Items</div>
        <div class="detail-tab" data-tab="Quest">Quest</div>
      </div>
      <div class="grid-area"></div>
      <button id="closeDetail">Close</button>
    `;

    const gridArea = accountDetail.querySelector('.grid-area');
    const detailTabs = accountDetail.querySelectorAll('.detail-tab');

    // Dummy quests
    const questData = [
      {name:"Catch Secret Fish", requirement:["3 Secret Fish"], reward:"500 Gold"},
      {name:"Collect Rare Fish", requirement:["5 Rare Fish"], reward:"300 Gold"},
      {name:"Complete Daily Challenge", requirement:["1 Daily Challenge"], reward:"200 Gold"}
    ];

    function renderGrid(tab) {
      gridArea.innerHTML = ''; // reset grid

      if(tab === 'Fish' || tab === 'Items') {
        for(let i=0;i<18;i++){ // kosong dulu
          const item = document.createElement('div');
          item.classList.add('grid-item');
          item.textContent = '';
          gridArea.appendChild(item);
        }
      } else if(tab === 'Quest') {
        questData.forEach(q => {
          const item = document.createElement('div');
          item.classList.add('grid-item');
          item.innerHTML = `<strong>${q.name}</strong><br>Req: ${q.requirement.join(', ')}<br>Reward: ${q.reward}`;
          gridArea.appendChild(item);
        });
      }
    }

    renderGrid('Fish'); // default tab

    detailTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        detailTabs.forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        renderGrid(tab.dataset.tab);
      });
    });

    // Close button
    document.getElementById('closeDetail').addEventListener('click', () => {
      accountDetail.classList.remove('active');
    });
  });
});
