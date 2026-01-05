export function groupFishInventory(fishes = []) {
  const map = {};

  fishes.forEach(f => {
    const key = `${f.name}_${f.weight}`;
    if (!map[key]) {
      map[key] = {
        name: f.name,
        weight: f.weight,
        rarity: f.rarity,
        price: f.price,
        count: 0
      };
    }
    map[key].count++;
  });

  return Object.values(map);
}

export function calculateTotalPrice(groupedFish) {
  return groupedFish.reduce((sum, f) => {
    return sum + f.price * f.count;
  }, 0);
}