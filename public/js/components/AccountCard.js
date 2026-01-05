export function renderAccountCard(account, onClick) {
  const card = document.createElement("div");
  card.className = "account-card";

  const quest = account.quests.find(q => q.id === account.selectedQuestId);
  const totalTasks = quest.tasks.reduce((a, b) => a + b.target, 0);
  const doneTasks = quest.tasks.reduce((a, b) => a + b.current, 0);
  const percent = Math.floor((doneTasks / totalTasks) * 100);

  card.innerHTML = `
    <img class="avatar" src="${account.avatar}" />
    <div class="account-name">${account.username}</div>
    <div class="stat">💰 Gold: ${account.gold.toLocaleString()}</div>
    <div class="stat">🎒 Backpack: ${account.backpackCount}</div>
    <div class="stat">📶 Ping: ${account.ping} ms</div>
    <div class="stat">📜 Quest: ${quest.name}</div>
    <div class="progress">
      <div class="progress-fill" style="width:${percent}%"></div>
    </div>
    <div class="stat">${percent}%</div>
  `;

  card.addEventListener("click", onClick);
  return card;
}