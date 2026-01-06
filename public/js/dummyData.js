window.dummyAccounts = Array.from({ length: 10 }).map((_, i) => ({
  username: `player_${i + 1}`,
  gold: 10000 + i * 500,
  backpack: `${10 + i}/50`,
  ping: 30 + i * 3,
  rod: "Golden Rod",
  status: i % 2 === 0 ? "fishing" : "idle",
  quest: {
    name: "Catch Secret Fish",
    progress: 40 + i * 3
  },
  fish: [
    {
      name: "Golden Carp",
      img: "img/fish.png",
      mutation: "Golden",
      weight: "2.4",
      price: "12000",
      count: 2
    }
  ]
}));
