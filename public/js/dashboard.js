// dashboard.js

import { accounts } from "./dummyData.js";

const grid = document.getElementById("accountsGrid");
const detail = document.getElementById("accountDetail");

let selectedAccount = null;

/* =============================
   RENDER ACCOUNT CARDS
============================= */
function renderAccounts() {
  grid.innerHTML = "";

  accounts.forEach((acc) => {
    const card = document.createElement("div");
    card.className = "account-card";

    const statusClass = acc.status === "Fishing" ? "status-fishing" : "status-idle";

    card.innerHTML = `
      <h3>${acc.username}</h3>
      <p>Gold: ${acc.gold}</p>
      <p>Backpack: ${acc.backpack}</p>
      <p>Ping: ${acc.ping} ms</p>
      <p>Rod: ${acc.rod}</p>
      <p>Quest: ${acc.currentQuest || "None"}</p>

      ${
        acc.currentQuest
          ? `
        <div class="quest-progress">
          <div class="quest-progress-bar" style="width:${acc.questProgress || 0}%"></div>
        </div>
        `
          : ""
      }

      <div class="status ${statusClass}">
        ${acc.status}
      </div>
    `;

    card.addEventListener("click", () => {
      selectedAccount = acc;
      renderDetail(acc);
    });

    grid.appendChild(card);
  });
}

/* =============================
   DETAIL PANEL
============================= */
function renderDetail(acc) {
  if (!detail) return;

  detail.innerHTML = `
    <h2>${acc.username} Detail</h2>

    <div class="detail-tabs">
      <button class="tab-btn active" data-tab="fish">Fish</button>
      <button class="tab-btn" data-tab="item">Item</button>
      <button class="tab-btn" data-tab="quest">Quest</button>
    </div>

    <div class="detail-content" id="detailContent"></div>
  `;

  bindTabs(acc);
  renderQuestTab(acc); // default tab
}

/* =============================
   TAB HANDLER
============================= */
function bindTabs(acc) {
  const buttons = document.querySelectorAll(".tab-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.dataset.tab;
      if (tab === "quest") renderQuestTab(acc);
      if (tab === "fish") renderFishTab(acc);
      if (tab === "item") renderItemTab(acc);
    });
  });
}

/* =============================
   QUEST TAB
============================= */
function renderQuestTab(acc) {
  const content = document.getElementById("detailContent");

  content.innerHTML = acc.quests
    .map(
      (q) => `
      <div class="quest-card">
        <h4>${q.name}</h4>
        <p>${q.desc}</p>
        <div class="quest-progress">
          <div class="quest-progress-bar" style="width:${q.progress}%"></div>
        </div>
      </div>
    `
    )
    .join("");
}

/* =============================
   FISH TAB (PLACEHOLDER)
============================= */
function renderFishTab(acc) {
  const content = document.getElementById("detailContent");
  content.innerHTML = `<p>Fish inventory coming soon</p>`;
}

/* =============================
   ITEM TAB (PLACEHOLDER)
============================= */
function renderItemTab(acc) {
  const content = document.getElementById("detailContent");
  content.innerHTML = `<p>Item inventory coming soon</p>`;
}

/* =============================
   INIT
============================= */
renderAccounts();
