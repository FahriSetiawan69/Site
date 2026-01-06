window.accounts = Array.from({ length: 10 }).map((_, i) => ({
  username: `player_${i + 1}`,
  gold: Math.floor(Math.random() * 100000),
  backpack: Math.floor(Math.random() * 40) + "/50",
  ping: Math.floor(Math.random() * 80) + " ms",
  rod: ["Basic Rod", "Silver Rod", "Golden Rod"][i % 3],
  quest: "Catch Secret Fish",
  questProgress: Math.floor(Math.random() * 100),
  status: Math.random() > 0.5 ? "FISHING" : "IDLE",
  fish: ["Golden Carp", "Rainbow Trout", "Secret Fish"],
  items: ["Magic Rod", "Golden Bait", "Lucky Charm"]
}));
