export function simulateInventory(account) {
  if (!account.fishInventory) account.fishInventory = [];
  if (!account.otherInventory) account.otherInventory = [];

  // Simulasi dapet ikan
  if (Math.random() > 0.6) {
    const fishPool = [
      { name: "Golden Carp", rarity: "Legendary", price: 12000 },
      { name: "Shadow Eel", rarity: "Epic", price: 7000 },
      { name: "Silver Tuna", rarity: "Rare", price: 3200 },
      { name: "Crystal Koi", rarity: "Secret", price: 45000 }
    ];

    const pick = fishPool[Math.floor(Math.random() * fishPool.length)];

    account.fishInventory.push({
      name: pick.name,
      rarity: pick.rarity,
      weight: +(Math.random() * 5 + 1).toFixed(1),
      price: pick.price
    });
  }

  // Simulasi item other
  if (Math.random() > 0.8) {
    const items = ["Enchant Stone", "Totem", "Ancient Relic"];
    const name = items[Math.floor(Math.random() * items.length)];

    const found = account.otherInventory.find(i => i.name === name);
    if (found) found.count++;
    else account.otherInventory.push({ name, count: 1 });
  }
}