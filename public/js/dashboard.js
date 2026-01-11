const grid = document.getElementById("cardGrid");
const detailPanel = document.getElementById("detailPanel");
const detailTitle = document.getElementById("detailTitle");
const detailContent = document.getElementById("detailContent");
const template = document.getElementById("accountCardTemplate");

const accounts = new Map();
let activeAccount = null;

/* REGISTER CARD ONCE */
function registerAccount(id) {
  if (accounts.has(id)) return;

  const clone = template.content.cloneNode(true);
  const card = clone.querySelector(".account-card");
  card.dataset.id = id;

  card.addEventListener("click", () => selectAccount(id));

  grid.appendChild(clone);
  accounts.set(id, card);
}

/* UPDATE DATA */
function updateAccountData(id, data) {
  registerAccount(id);
  const card = accounts.get(id);

  card.querySelector(".acc-name").textContent = data.username;
  card.querySelector(".acc-gold").textContent = data.gold;
  card.querySelector(".acc-backpack").textContent = data.backpack;
  card.querySelector(".acc-ping").textContent = data.ping;
  card.querySelector(".acc-rod").textContent = data.rod;

  const status = card.querySelector(".acc-status");
  status.textContent = data.status;
  status.className = "acc-status " + data.status.toLowerCase();

  card._quest = data.quest || null;

  if (activeAccount === id) renderDetail(id);
}

/* DETAIL */
function selectAccount(id) {
  activeAccount = id;
  renderDetail(id);
}

function renderDetail(id) {
  const card = accounts.get(id);
  detailPanel.classList.remove("hidden");
  detailTitle.textContent = card.querySelector(".acc-name").textContent + " Detail";

  const quest = card._quest;
  if (!quest) {
    detailContent.textContent = "No active quest";
    return;
  }

  detailContent.innerHTML = `
    <strong>${quest.name}</strong>
    <div style="margin-top:8px;">${quest.progress}%</div>
  `;
}

/* LUA BRIDGE */
window.updateAccountsFromLua = function(list) {
  list.forEach(acc => updateAccountData(acc.id, acc));
};
