const accountCards = document.getElementById('accountCards');
const logoutBtn = document.getElementById('logoutBtn');
const accountDetail = document.getElementById('accountDetail');

// Logout
logoutBtn.addEventListener('click', () => window.location.href='index.html');

// Dummy Accounts
const dummyAccounts = [
  { username:"player_1", gold:12000, backpack:["Fish","Secret Fish"], status:"Fishing", questProgress:40, ping:35, rod:"Magic Rod" },
  { username:"player_2", gold:8000, backpack:["Fish","Lucky Charm"], status:"Idle", questProgress:0, ping:50, rod:"Standard Rod" },
  { username:"player_3", gold:15000, backpack:["Fish","Golden Bait"], status:"Fishing", questProgress:75, ping:28, rod:"Golden Rod" },
  { username:"player_4", gold:9000, backpack:["Fish","Magic Rod"], status:"Idle", questProgress:0, ping:40, rod:"Standard Rod" },
  { username:"player_5", gold:20000, backpack:["Fish","Secret Fish"], status:"Fishing", questProgress:60, ping:20, rod:"Golden Rod" },
  { username:"player_6", gold:13000, backpack:["Fish","Magic Rod"], status:"Fishing", questProgress:30, ping:45, rod:"Magic Rod" },
  { username:"player_7", gold:11000, backpack:["Fish","Golden Bait"], status:"Idle", questProgress:0, ping:33, rod:"Standard Rod" },
  { username:"player_8", gold:14000, backpack:["Fish","Lucky Charm"], status:"Fishing", questProgress:50, ping:25, rod:"Golden Rod" },
  { username:"player_9", gold:10000, backpack:["Fish","Magic Rod"], status:"Idle", questProgress:0, ping:55, rod:"Standard Rod" },
  { username:"player_10", gold:17000, backpack:["Fish","Secret Fish"], status:"Fishing", questProgress:80, ping:18, rod:"Golden Rod" }
];

// Dummy Quest
const questData = [
  {name:"Catch Secret Fish", requirement:["3 Secret Fish"], reward:"500 Gold"},
  {name:"Collect Rare Fish", requirement:["5 Rare Fish"], reward:"300 Gold"},
  {name:"Complete Daily Challenge", requirement:["1 Daily Challenge"], reward:"200 Gold"}
];

// Create Cards
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
    <div class="card-status ${acc.status==='Fishing'?'status-fishing':'status-idle'}">${acc.status}</div>
    <div class="progress-bar"><div class="progress-fill" style="width:${acc.questProgress}%"></div></div>
  `;

  accountCards.appendChild(card);

  card.addEventListener('click', () => {
    accountDetail.classList.add('active');
    accountDetail.innerHTML = `
      <h3>${acc.username}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack.length}</p>
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

    function renderGrid(tab){
      gridArea.innerHTML = '';
      if(tab === 'Fish' || tab==='Items'){
        for(let i=0;i<18;i++){
          const item = document.createElement('div');
          item.classList.add('grid-item');
          gridArea.appendChild(item);
        }
      } else if(tab==='Quest'){
        questData.forEach(q=>{
          const item = document.createElement('div');
          item.classList.add('grid-item');
          item.innerHTML=`<strong>${q.name}</strong><br>Req: ${q.requirement.join(', ')}<br>Reward: ${q.reward}`;
          gridArea.appendChild(item);
        });
      }
    }

    renderGrid('Fish');

    detailTabs.forEach(tab=>{
      tab.addEventListener('click',()=>{
        detailTabs.forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        renderGrid(tab.dataset.tab);
      });
    });

    document.getElementById('closeDetail').addEventListener('click',()=>{
      accountDetail.classList.remove('active');
    });
  });
});
