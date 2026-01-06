// CEK LOGIN KEY
if (sessionStorage.getItem("fishit_key_valid") !== "true") {
  window.location.href = "index.html";
}

// TAB SWITCH
function showTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
}

// LOGOUT
function logout() {
  sessionStorage.removeItem("fishit_key_valid");
  window.location.href = "index.html";
}

/* =====================
   DUMMY DATA
===================== */

const fishData = [
  { name: "Golden Carp", weight: "2.5kg", rarity: "Rare" },
  { name: "Rainbow Trout", weight: "1.2kg", rarity: "Common" }
];

const itemData = [
  { name: "Magic Rod", count: 1 },
  { name: "Golden Bait", count: 3 }
];

const questData = [
  { name: "Catch Secret Fish", progress: "2 / 3", reward: "500 Coins" },
  { name: "Collect Rare Fish", progress: "1 / 5", reward: "Magic Bait" }
];

// RENDER FISH
const fishList = document.getElementById("fishList");
if (fishList) {
  fishData.forEach(f => {
    fishList.innerHTML += `
      <div class="item-card">
        <h4>${f.name}</h4>
        <p>${f.weight}</p>
        <span>${f.rarity}</span>
      </div>
    `;
  });
}

// RENDER ITEMS
const itemList = document.getElementById("itemList");
if (itemList) {
  itemData.forEach(i => {
    itemList.innerHTML += `
      <div class="item-card">
        <h4>${i.name}</h4>
        <p>x${i.count}</p>
      </div>
    `;
  });
}

// RENDER QUEST
const questList = document.getElementById("questList");
if (questList) {
  questData.forEach(q => {
    questList.innerHTML += `
      <div class="item-card">
        <h4>${q.name}</h4>
        <p>${q.progress}</p>
        <small>${q.reward}</small>
      </div>
    `;
  });
}
