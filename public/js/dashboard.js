// Inject dummy account cards
const accountCards = document.getElementById('accountCards');
dummyAccounts.forEach(acc => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `<h4>${acc.username}</h4>
                    <p>Gold: ${acc.gold}</p>
                    <p>Backpack: ${acc.backpack}</p>
                    <p>Ping: ${acc.ping}</p>
                    <p>Rod: ${acc.rod}</p>
                    <p>Quest: ${acc.quest.name}</p>
                    <div class="progress-bar" style="background:green;width:${acc.quest.progress}%"></div>
                    <p>Status: <span style="color:${acc.status=='Fishing'?'#7fff7f':'#ff3f3f'}">${acc.status}</span></p>`;
  accountCards.appendChild(card);

  // Click card
  card.addEventListener('click', () => showDetail(acc));
});

// Show account detail
function showDetail(account) {
  document.getElementById('accountDetail').classList.remove('hidden');
  document.getElementById('detailUsername').innerText = account.username;
  document.getElementById('detailGold').innerText = `Gold: ${account.gold}`;

  // Reset tab content
  document.querySelectorAll('.tab-content-section').forEach(sec => sec.classList.add('hidden'));

  // Fish tab
  const fishTab = document.getElementById('fishTab');
  fishTab.innerHTML = '';
  account.fish.forEach(f => fishTab.innerHTML += `<p>${f.name} (${f.weight}kg)</p>`);

  // Items tab
  const itemsTab = document.getElementById('itemsTab');
  itemsTab.innerHTML = '';
  account.items.forEach(i => itemsTab.innerHTML += `<p>${i.name} x${i.count}</p>`);

  // Quest tab
  const questTab = document.getElementById('questTab');
  questTab.innerHTML = '';
  account.availableQuests.forEach(q => {
    const div = document.createElement('div');
    div.classList.add('quest-item');
    div.innerHTML = `<h4>${q.name}</h4>
                     <ul>${q.requirements.map(r=>`<li>${r}</li>`).join('')}</ul>
                     <p class="reward">Reward: ${q.reward}</p>`;
    div.addEventListener('click', ()=> {
      account.quest = q; // Update selected quest
      showDetail(account);
    });
    questTab.appendChild(div);
  });

  // Show default tab (fish)
  document.getElementById('fishTab').classList.remove('hidden');
}

// Tab buttons
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.tab-content-section').forEach(sec=>sec.classList.add('hidden'));
    const tab = btn.dataset.tab;
    if(tab==='fish') document.getElementById('fishTab').classList.remove('hidden');
    else if(tab==='items') document.getElementById('itemsTab').classList.remove('hidden');
    else document.getElementById('questTab').classList.remove('hidden');
  });
});
