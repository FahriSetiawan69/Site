import { state, getSelectedAccount } from "../state.js";
import { renderQuestTab } from "./QuestTab.js";

const modal = document.getElementById("detailModal");
const body = document.getElementById("detailBody");

export function openDetailModal() {
  modal.classList.remove("hidden");
  renderDetail();
}

export function closeDetailModal() {
  modal.classList.add("hidden");
}

function renderDetail() {
  const acc = getSelectedAccount();
  if (!acc) return;

  body.innerHTML = `
    <h2>${acc.username}</h2>

    <div class="tab-buttons">
      <button data-tab="fish">Fish</button>
      <button data-tab="other">Other</button>
      <button data-tab="quest">Quest</button>
    </div>

    <div id="tabContent"></div>
  `;

  document.querySelectorAll(".tab-buttons button").forEach(btn => {
    btn.onclick = () => switchTab(btn.dataset.tab);
  });

  switchTab("quest");
}

function switchTab(tab) {
  const acc = getSelectedAccount();
  const content = document.getElementById("tabContent");

  if (tab === "quest") {
    content.innerHTML = "";
    content.appendChild(renderQuestTab(acc));
  } else {
    content.innerHTML = `
      <p style="opacity:.6">Dummy ${tab} tab (akan diisi inventory real-time)</p>
    `;
  }
}