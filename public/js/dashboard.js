// =========================
// GLOBAL STATE
// =========================
let currentAccount = null;

// Dummy quest data (SUDAH ADA POLANYA DI SCRIPT KAMU)
const QUEST_LIST = [
  {
    id: 1,
    name: "Fishing Novice",
    requirements: [
      "Catch 10 fish",
      "Use any rod"
    ],
    reward: "500 Gold"
  },
  {
    id: 2,
    name: "Deep Sea Hunter",
    requirements: [
      "Catch 25 fish",
      "Use Magic Rod"
    ],
    reward: "1500 Gold"
  },
  {
    id: 3,
    name: "Legendary Angler",
    requirements: [
      "Catch 50 fish",
      "Use Golden Rod"
    ],
    reward: "5000 Gold"
  }
];

// =========================
// CARD CLICK
// =========================
function openAccountDetail(account) {
  currentAccount = account;

  renderAccountInfo(account);

  // 🔥 QUEST LANGSUNG MUNCUL (PENGGANTI CHANGE QUEST)
  renderQuestList(account);

  openDetailModal();
}

// =========================
// RENDER ACCOUNT INFO
// =========================
function renderAccountInfo(account) {
  document.getElementById("detailPlayerName").innerText = account.name;
  document.getElementById("detailGold").innerText = account.gold;
  document.getElementById("detailBackpack").innerText = account.backpack;
  document.getElementById("detailPing").innerText = account.ping + "ms";
  document.getElementById("detailRod").innerText = account.rod;
  document.getElementById("detailStatus").innerText = account.status;
}

// =========================
// QUEST RENDER (INTI FIX)
// =========================
function renderQuestList(account) {
  const questContainer = document.getElementById("questList");
  if (!questContainer) return;

  questContainer.innerHTML = "";

  QUEST_LIST.forEach((quest) => {
    const questCard = document.createElement("div");
    questCard.className = "quest-card";

    const isActive = account.quest && account.quest.id === quest.id;

    questCard.innerHTML = `
      <div class="quest-title ${isActive ? "active" : ""}">
        ${quest.name}
      </div>

      <ul class="quest-req">
        ${quest.requirements.map(req => `<li>${req}</li>`).join("")}
      </ul>

      <div class="quest-reward">
        Reward: ${quest.reward}
      </div>
    `;

    questCard.addEventListener("click", () => {
      account.quest = quest;
      renderQuestList(account);
      updateCardQuest(account);
    });

    questContainer.appendChild(questCard);
  });
}

// =========================
// UPDATE QUEST DI CARD
// =========================
function updateCardQuest(account) {
  const card = document.querySelector(`[data-player="${account.name}"]`);
  if (!card) return;

  const questText = card.querySelector(".card-quest");
  if (questText) {
    questText.innerText = account.quest
      ? account.quest.name
      : "No Quest";
  }
}

// =========================
// MODAL CONTROL
// =========================
function openDetailModal() {
  document.getElementById("detailModal").classList.add("show");
}

function closeDetailModal() {
  document.getElementById("detailModal").classList.remove("show");
}
