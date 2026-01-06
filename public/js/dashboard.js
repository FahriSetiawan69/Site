const grid = document.getElementById("accountGrid");
const detailPanel = document.getElementById("detailPanel");
const detailContent = document.getElementById("detailContent");
const detailUsername = document.getElementById("detailUsername");
const detailGold = document.getElementById("detailGold");

function renderAccounts() {
  grid.innerHTML = "";
  dummyAccounts.slice(0,10).forEach(acc => {
    const card = document.createElement("div");
    card.className = "account-card";
    card.innerHTML = `
      <h3>${acc.username}</h3>
      <div class="stat">Gold: ${acc.gold}</div>
      <div class="stat">Backpack: ${acc.backpack}</div>
      <div class="stat">Ping: ${acc.ping} ms</div>
      <div class="stat">Rod: ${acc.rod}</div>
      <div class="stat">Quest: ${acc.quest.name}</div>
      <div class="progress"><span style="width:${acc.quest.progress}%"></span></div>
      <div class="status ${acc.status}">${acc.status.toUpperCase()}</div>
    `;
    card.onclick = () => openDetail(acc);
    grid.appendChild(card);
  });
}

function openDetail(acc) {
  detailPanel.classList.remove("hidden");
  detailUsername.textContent = acc.username;
  detailGold.textContent = `Gold: ${acc.gold}`;
  renderFish(acc);
}

function renderFish(acc) {
  detailContent.innerHTML = `<div class="grid">
    ${acc.fish.map(f => `
      <div class="item-card">
        <img src="${f.img}" width="80"><br>
        <b>${f.name}</b><br>
        ${f.mutation}<br>
        ${f.weight} kg<br>
        $${f.price}<br>
        x${f.count}
      </div>
    `).join("")}
  </div>`;
}

document.getElementById("closeDetail").onclick = () => {
  detailPanel.classList.add("hidden");
};

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("fishit_key");
  window.location.href = "/";
};

renderAccounts();
