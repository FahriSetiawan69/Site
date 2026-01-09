const QUEST_LIST = [
  {
    id: "q1",
    name: "Fishing Beginner",
    requirements: ["Catch 10 fish", "Stay fishing 5 minutes"],
    reward: "+500 Gold"
  },
  {
    id: "q2",
    name: "Deep Sea Hunter",
    requirements: ["Catch rare fish", "Use Magic Rod"],
    reward: "+1500 Gold"
  },
  {
    id: "q3",
    name: "Idle Farmer",
    requirements: ["Stay idle 10 minutes"],
    reward: "+300 Gold"
  }
];

const cardsContainer = document.getElementById("accountCards");
const detailPanel = document.getElementById("accountDetail");

function renderCards() {
  cardsContainer.innerHTML = "";

  state.players.forEach(player => {
    const card = document.createElement("div");
    card.className = "account-card";
    card.onclick = () => openDetail(player.id);

    card.innerHTML = `
      <h3>${player.username}</h3>

      <div class="card-info">Gold: ${player.gold}</div>
      <div class="card-info">Backpack: ${player.backpack}</div>
      <div class="card-info">Ping: ${player.ping}ms</div>
      <div class="card-info">Rod: ${player.rod}</div>
      <div class="card-info">Quest: ${player.quest ? player.quest.name : "None"}</div>

      <div class="status ${player.status === "Fishing" ? "fishing" : "idle"}">
        ${player.status}
      </div>

      <div class="progress-bar">
        <div class="progress" style="width:${player.progress}%"></div>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}

function openDetail(playerId) {
  const player = state.players.find(p => p.id === playerId);
  if (!player) return;

  state.selectedPlayer = player;

  detailPanel.classList.remove("hidden");
  detailPanel.innerHTML = `
    <div class="detail-box">
      <h2>${player.username}</h2>

      <div class="tab-header">
        <button class="active">Quest</button>
      </div>

      <div class="quest-area">
        <p><b>Current Quest:</b> ${player.quest ? player.quest.name : "None"}</p>
        ${renderQuestList(player)}
      </div>

      <button class="close-btn" onclick="closeDetail()">Close</button>
    </div>
  `;
}

function renderQuestList(player) {
  return `
    <div class="quest-list">
      ${QUEST_LIST.map(q => `
        <div class="quest-box ${player.quest?.id === q.id ? "active" : ""}"
             onclick="selectQuest('${player.id}','${q.id}')">
          <h4>${q.name}</h4>
          <ul>
            ${q.requirements.map(r => `<li>${r}</li>`).join("")}
          </ul>
          <div class="quest-reward">${q.reward}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function selectQuest(playerId, questId) {
  const player = state.players.find(p => p.id === playerId);
  const quest = QUEST_LIST.find(q => q.id === questId);
  if (!player || !quest) return;

  player.quest = quest;
  player.progress = 0;

  renderCards();
  openDetail(playerId);
}

function closeDetail() {
  detailPanel.classList.add("hidden");
  detailPanel.innerHTML = "";
}

renderCards();
