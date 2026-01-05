import { state, setAccounts, updateAccount, selectAccount } from "./state.js";
import { generateDummyAccounts, tickDummyProgress } from "./dummyData.js";
import { renderAccountCard } from "./components/AccountCard.js";
import { openDetailModal, closeDetailModal } from "./components/DetailModal.js";

const grid = document.getElementById("accountGrid");
const modal = document.getElementById("detailModal");
const closeBtn = document.getElementById("closeModal");

setAccounts(generateDummyAccounts(20));

function renderGrid() {
  grid.innerHTML = "";
  state.accounts.forEach(acc => {
    const card = renderAccountCard(acc, () => {
      selectAccount(acc.id);
      openDetailModal();
    });
    grid.appendChild(card);
  });
}

renderGrid();

setInterval(() => {
  state.accounts.forEach(acc => {
    tickDummyProgress(acc);
    updateAccount(acc.id, acc);
  });
  renderGrid();
}, 1000);

closeBtn.addEventListener("click", closeDetailModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeDetailModal();
});