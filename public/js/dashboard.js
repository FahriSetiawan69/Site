// ===================== DUMMY DATA =====================
const dummyAccounts = [];
for (let i = 1; i <= 20; i++) {
  dummyAccounts.push({
    username: `Player_${i}`,
    gold: 1000 + i * 50,
    backpack: 5 + i,
    ping: 50 + i,
    rod: i % 2 === 0 ? "Magic Rod" : "Standard Rod",
    quest: i % 2 === 0 ? "Catch Secret Fish" : "Collect Rare Fish", // aktif quest
    questProgress: i % 5,
    status: i % 2 === 0 ? "Fishing" : "Idle",
    fish: [
      {name:"Golden Carp", weight:2.5, mutation:"Rare", price:500},
      {name:"Golden Carp", weight:2.5, mutation:"Rare", price:500},
      {name:"Rainbow Trout", weight:1.2, mutation:"Normal", price:300}
    ],
    items: [
      {name:"Golden Bait", quantity:3},
      {name:"Lucky Charm", quantity:2}
    ]
  });
}

// ===================== SELECT ELEMENTS =====================
const accountCards = document.getElementById('accountCards');
const accountDetail = document.getElementById('accountDetail');
const logoutBtn = document.getElementById('logoutBtn');

// Quest definitions with requirements & rewards
const availableQuests = [
  {
    name:"Catch Secret Fish",
    requirements:["Catch 3 Secret Fish","Need Magic Rod","Min Level 5"],
    reward:"500 Gold"
  },
  {
    name:"Collect Rare Fish",
    requirements:["Collect 5 Rare Fish","Need Lucky Charm"],
    reward:"700 Gold + Item"
  },
  {
    name:"Complete Daily Challenge",
    requirements:["Complete 1 Daily Task"],
    reward:"100 Gold"
  }
];

// ===================== RENDER CARDS =====================
function renderCards() {
  accountCards.innerHTML = "";
  dummyAccounts.forEach((acc, idx) => {
    const card = document.createElement('div');
    card.className = "account-card";
    card.dataset.index = idx;
    card.innerHTML = `
      <h3>${acc.username}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack}</p>
      <p>Status: <span class="${acc.status==="Fishing"?"green":"red"}">${acc.status}</span></p>
      <p>Rod: ${acc.rod}</p>
      <p>Quest: ${acc.quest} (${acc.questProgress}/5)</p>
      <div class="quest-bar">
        <div class="progress" style="width:${(acc.questProgress/5)*100}%"></div>
      </div>
    `;
    card.addEventListener('click', () => { showAccountDetail(idx); });
    accountCards.appendChild(card);
  });
}

// ===================== SHOW DETAIL PANEL =====================
function showAccountDetail(index) {
  const acc = dummyAccounts[index];

  accountDetail.innerHTML = `
    <h3>${acc.username}</h3>
    <p>Gold: ${acc.gold}</p>
    <div class="grid-container">
      <button class="tab-btn active" data-tab="fish">Fish (${acc.fish.length})</button>
      <button class="tab-btn" data-tab="items">Items (${acc.items.length})</button>
      <button class="tab-btn" data-tab="quest">Quest</button>
    </div>
    <div id="tabContent" class="tab-content">
      ${renderTabContent(acc,'fish')}
    </div>
  `;
  accountDetail.classList.remove('hidden');

  const tabBtns = accountDetail.querySelectorAll('.tab-btn');
  const tabContent = accountDetail.querySelector('#tabContent');

  tabBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      tabBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      tabContent.innerHTML = renderTabContent(acc,btn.dataset.tab);
    });
  });
}

// ===================== RENDER TAB CONTENT =====================
function renderTabContent(acc, tab) {
  if(tab === 'fish') {
    const mergedFish = mergeDuplicates(acc.fish);
    return mergedFish.map(f => `
      <div class="item-card">
        <p><strong>${f.name}</strong></p>
        <p>Mutation: ${f.mutation}</p>
        <p>Weight: ${f.weight} kg</p>
        <p>Price: $${f.price}</p>
        <p>Qty: ${f.quantity}</p>
      </div>
    `).join('');
  } else if(tab === 'items') {
    const mergedItems = mergeItemDuplicates(acc.items);
    return mergedItems.map(i => `
      <div class="item-card">
        <p><strong>${i.name}</strong></p>
        <p>Qty: ${i.quantity}</p>
      </div>
    `).join('');
  } else if(tab === 'quest') {
    return availableQuests.map(q=>{
      const activeClass = (acc.quest === q.name) ? 'active' : '';
      const reqs = q.requirements.map(r=>`<li>${r}</li>`).join('');
      return `
      <div class="quest-card ${activeClass}" data-quest="${q.name}">
        <strong>${q.name}</strong>
        <ul>${reqs}</ul>
        <div class="reward">Reward: ${q.reward}</div>
      </div>
      `;
    }).join('');
  }
}

// ===================== MERGE DUPLICATES =====================
function mergeDuplicates(fishArray) {
  const map = {};
  fishArray.forEach(f => {
    const key = `${f.name}_${f.weight}_${f.mutation}`;
    if(map[key]) map[key].quantity +=1;
    else map[key] = {...f, quantity:1};
  });
  return Object.values(map);
}

function mergeItemDuplicates(itemArray) {
  const map = {};
  itemArray.forEach(i => {
    if(map[i.name]) map[i.name].quantity += i.quantity;
    else map[i.name] = {...i};
  });
  return Object.values(map);
}

// ===================== LOGIC QUEST CLICK =====================
accountDetail.addEventListener('click',(e)=>{
  if(e.target.closest('.quest-card') && e.target.closest('.quest-card').dataset.quest){
    const questCard = e.target.closest('.quest-card');
    const selectedQuest = questCard.dataset.quest;
    const cardIndex = accountDetail.querySelector('h3').innerText.split('_')[1]-1;
    dummyAccounts[cardIndex].quest = selectedQuest;
    dummyAccounts[cardIndex].questProgress = 0;
    renderCards(); // update main card
    showAccountDetail(cardIndex); // refresh detail panel
  }
});

// ===================== LOGOUT =====================
if(logoutBtn) {
  logoutBtn.addEventListener('click',()=>{
    window.location.href="index.html";
  });
}

// ===================== INIT =====================
renderCards();
