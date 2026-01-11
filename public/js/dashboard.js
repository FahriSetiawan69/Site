const grid = document.getElementById("cardGrid");
const detailPanel = document.getElementById("detailPanel");

const accounts = new Map();
let activeId = null;

function createCard(id) {
  const card = document.createElement("div");
  card.className = "account-card";
  card.dataset.id = id;

  card.addEventListener("click", () => {
    activeId = id;
    renderDetail(id);
  });

  grid.appendChild(card);
  accounts.set(id, card);
}

function updateCard(id, data) {
  if (!accounts.has(id)) {
    createCard(id);
  }

  const card = accounts.get(id);
  card.innerHTML = `
    <h3>${data.username}</h3>
    <p>Gold: ${data.gold}</p>
    <p>Backpack: ${data.backpack}</p>
    <p>Ping: ${data.ping} ms</p>
    <p>Rod: ${data.rod}</p>
    <span class="status ${data.status.toLowerCase()}">${data.status}</span>
  `;

  card._quest = data.quest || null;
}

function renderDetail(id) {
  const card = accounts.get(id);
  if (!card) return;

  detailPanel.innerHTML = "";
  const title = document.createElement("h3");
  title.textContent = card.querySelector("h3").textContent;
  detailPanel.appendChild(title);

  if (card._quest) {
    detailPanel.innerHTML += `
      <strong>${card._quest.name}</strong>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${card._quest.progress}%"></div>
      </div>
    `;
  }
}

// 🔗 LUA / CONSOLE ENTRY POINT
window.updateAccountsFromLua = function(list) {
  list.forEach(acc => updateCard(acc.id, acc));
};
