const questTemplates = [
  {
    id: "quest_secret",
    name: "Secret Hunter",
    tasks: [
      { name: "Tangkap ikan Secret", current: 0, target: 2 },
      { name: "Tangkap ikan Legendary", current: 0, target: 1 }
    ]
  },
  {
    id: "quest_gold",
    name: "Gold Farmer",
    tasks: [
      { name: "Kumpulkan Gold", current: 0, target: 50000 }
    ]
  },
  {
    id: "quest_daily",
    name: "Daily Fisher",
    tasks: [
      { name: "Tangkap 20 ikan", current: 0, target: 20 }
    ]
  }
];

export function generateDummyAccounts(count = 20) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    username: `Player_${i + 1}`,
    avatar: `https://www.roblox.com/headshot-thumbnail/image?userId=${100000 + i}&width=150&height=150&format=png`,
    gold: Math.floor(Math.random() * 50000),
    backpackCount: Math.floor(Math.random() * 60),
    ping: Math.floor(50 + Math.random() * 80),
    status: "Online",
    quests: JSON.parse(JSON.stringify(questTemplates)),
    selectedQuestId: questTemplates[0].id
  }));
}

export function tickDummyProgress(account) {
  account.gold += Math.floor(Math.random() * 500);
  account.ping = Math.floor(40 + Math.random() * 120);
  account.backpackCount += Math.random() > 0.7 ? 1 : 0;

  const quest = account.quests.find(q => q.id === account.selectedQuestId);
  if (!quest) return;

  quest.tasks.forEach(task => {
    if (task.current < task.target) {
      task.current += Math.random() > 0.8 ? 1 : 0;
      if (task.current > task.target) task.current = task.target;
    }
  });
}