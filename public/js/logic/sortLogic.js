export function sortByRarity(list) {
  const order = {
    Common: 1,
    Uncommon: 2,
    Rare: 3,
    Epic: 4,
    Legendary: 5,
    Secret: 6
  };

  return [...list].sort((a, b) => {
    return (order[b.rarity] || 0) - (order[a.rarity] || 0);
  });
}

export function sortByPrice(list) {
  return [...list].sort((a, b) => {
    return (b.price * b.count) - (a.price * a.count);
  });
}