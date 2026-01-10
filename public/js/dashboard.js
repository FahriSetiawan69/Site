const views = {
  profile: document.getElementById("profileView"),
  accounts: document.getElementById("accountsView"),
  settings: document.getElementById("settingsView"),
  about: document.getElementById("aboutView")
};

document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".menu-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    Object.values(views).forEach(v => v.classList.remove("active"));
    views[btn.dataset.view].classList.add("active");
  };
});

/* DUMMY DATA */
const accounts = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `player_${i+1}`,
  gold: 10000 + i * 1000,
  backpack: Math.floor(Math.random()*5)+1,
  ping: 30 + i * 3,
  rod: ["Basic Rod","Magic Rod","Golden Rod"][i%3],
  fishing: Math.random() > 0.5,
  progress: Math.floor(Math.random()*100)
}));

const cardsEl = document.getElementById("accountCards");
const detailEl = document.getElementById("accountDetail");

function renderCards() {
  cardsEl.innerHTML = "";
  accounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <b>${acc.name}</b><br>
      Gold: ${acc.gold}<br>
      Backpack: ${acc.backpack}<br>
      Ping: ${acc.ping} ms<br>
      Rod: ${acc.rod}
      <div class="status ${acc.fishing ? "fishing":"idle"}">
        ${acc.fishing ? "Fishing":"Idle"}
      </div>
      <div class="progress">
        <div class="progress-bar" style="width:${acc.progress}%"></div>
      </div>
    `;
    card.onclick = () => showDetail(acc);
    cardsEl.appendChild(card);
  });
}

function showDetail(acc) {
  detailEl.classList.remove("hidden");
  detailEl.innerHTML = `
    <h3>${acc.name}</h3>
    <p>Gold: ${acc.gold}</p>
    <p>Rod: ${acc.rod}</p>
    <p>Status: ${acc.fishing ? "Fishing":"Idle"}</p>
    <h4>Quest</h4>
    <ul>
      <li>Catch Rare Fish</li>
      <li>Daily Fishing</li>
      <li>Big Catch</li>
    </ul>
  `;
}

renderCards();
