import { groupFishInventory, calculateTotalPrice } from "../logic/fishLogic.js";

export function renderFishTab(account) {
  const wrapper = document.createElement("div");

  const grouped = groupFishInventory(account.fishInventory);
  const totalPrice = calculateTotalPrice(grouped);

  wrapper.innerHTML = `
    <h3>🐟 Fish Inventory</h3>
    <div class="stat">Total Sell Price: 💰 ${totalPrice.toLocaleString()}</div>
    <hr/>
  `;

  grouped.forEach(fish => {
    const div = document.createElement("div");
    div.style.marginBottom = "10px";

    div.innerHTML = `
      <strong>${fish.name}</strong> (${fish.rarity})<br/>
      ⚖️ ${fish.weight}kg × ${fish.count}<br/>
      💰 ${fish.price.toLocaleString()} each
    `;
    wrapper.appendChild(div);
  });

  return wrapper;
}