const grid = document.getElementById("accountGrid");
const detail = document.getElementById("detailPanel");

function renderCards() {
  grid.innerHTML = "";
  window.accounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${acc.username}</h3>
      <p>💰 Gold: ${acc.gold}</p>
      <p>🎒 Backpack: ${acc.backpack}</p>
      <p>📡 Ping: ${acc.ping}</p>
      <p>🎣 Rod: ${acc.rod}</p>
      <p>📜 Quest: ${acc.quest}</p>

      <div class="progress">
        <div class="progress-bar" style="width:${acc.questProgress}%"></div>
      </div>

      <div class="status ${acc.status === "FISHING" ? "fishing" : "idle"}">
        ${acc.status}
      </div>
    `;

    card.onclick = () => showDetail(acc);
    grid.appendChild(card);
  });
}

function showDetail(acc) {
  detail.classList.remove("hidden");
  document.getElementById("detailUsername").innerText = acc.username;

  document.getElementById("fishList").innerHTML =
    acc.fish.map(f => `<li>${f}</li>`).join("");

  document.getElementById("itemList").innerHTML =
    acc.items.map(i => `<li>${i}</li>`).join("");

  document.getElementById("questDetail").innerText =
    `${acc.quest} (${acc.questProgress}%)`;
}

renderCards();
