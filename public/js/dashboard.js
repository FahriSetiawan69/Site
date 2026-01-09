const accountCards = document.getElementById('accountCards');
const logoutBtn = document.getElementById('logoutBtn');
const accountDetail = document.getElementById('accountDetail');

logoutBtn.addEventListener('click', ()=>window.location.href='index.html');

dummyAccounts.forEach(acc=>{
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML=`
    <h4 class="username">${acc.username}</h4>
    <div class="info">
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack.length}</p>
      <p>Ping: ${acc.ping}ms</p>
      <p>Rod: ${acc.rod}</p>
    </div>
    <div class="card-status ${acc.status==="Fishing"?"status-fishing":"status-idle"}">
      ${acc.status}
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${acc.questProgress}%"></div>
    </div>
  `;

  accountCards.appendChild(card);

  card.addEventListener('click',()=>{
    accountDetail.classList.add('active');

    accountDetail.innerHTML=`
      <h3>${acc.username}</h3>
      <div class="tab-buttons">
        <button class="tab-btn active" data-tab="fish">Fish</button>
        <button class="tab-btn" data-tab="items">Items</button>
        <button class="tab-btn" data-tab="quest">Quest</button>
      </div>
      <div class="tab-content active" id="fishTab">
        ${acc.fish.map(f=>`<div class="grid-item">${f.name} (${f.weight}kg, ${f.mutasi}) x${f.qty}</div>`).join('')}
      </div>
      <div class="tab-content" id="itemsTab">
        ${acc.items.map(i=>`<div class="grid-item">${i.name} x${i.qty}</div>`).join('')}
      </div>
      <div class="tab-content" id="questTab">
        ${acc.quests.map((q,idx)=>`<div class="quest-item" data-index="${idx}">${q.name} - Reward: ${q.reward}</div>`).join('')}
      </div>
      <button id="closeDetail">Close</button>
    `;

    const tabs = accountDetail.querySelectorAll('.tab-btn');
    const contents = accountDetail.querySelectorAll('.tab-content');
    tabs.forEach(tab=>{
      tab.addEventListener('click',()=>{
        tabs.forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        contents.forEach(c=>c.classList.remove('active'));
        document.getElementById(tab.dataset.tab+"Tab").classList.add('active');
      });
    });

    const questItems = accountDetail.querySelectorAll('.quest-item');
    questItems.forEach(qi=>{
      qi.addEventListener('click',()=>{
        const idx = qi.dataset.index;
        acc.questProgress += 10; // contoh update progress
        if(acc.questProgress>100) acc.questProgress=100;
        card.querySelector('.progress-fill').style.width=acc.questProgress+"%";
        // aktifkan highlight
        questItems.forEach(q=>q.classList.remove('active'));
        qi.classList.add('active');
      });
    });

    document.getElementById('closeDetail').addEventListener('click',()=>{
      accountDetail.classList.remove('active');
    });
  });
});
