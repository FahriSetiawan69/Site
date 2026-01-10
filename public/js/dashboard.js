document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".sidebar button[data-page]");
  const pages = document.querySelectorAll(".page-section");

  function showPage(id) {
    pages.forEach(p => {
      p.classList.remove("active");
      p.style.display = "none";
    });

    navButtons.forEach(b => b.classList.remove("active"));

    const page = document.getElementById(id);
    const btn = document.querySelector(
      `.sidebar button[data-page="${id}"]`
    );

    if (!page) return;

    page.classList.add("active");
    page.style.display = "block";
    if (btn) btn.classList.add("active");
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(btn.dataset.page);
    });
  });

  // DEFAULT PAGE
  showPage("profile");

  // DUMMY ACCOUNTS
  const accounts = Array.from({ length: 10 }, (_, i) => ({
    name: `player_${i + 1}`,
    gold: 10000 + i * 1000,
    backpack: (i % 5) + 1,
    ping: 30 + i * 3,
    rod: ["Basic Rod", "Magic Rod", "Golden Rod"][i % 3],
    status: i % 2 === 0 ? "Fishing" : "Idle"
  }));

  const grid = document.getElementById("cardGrid");
  const detail = document.getElementById("detailPanel");

  if (grid) {
    accounts.forEach(acc => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <b>${acc.name}</b><br>
        Gold: ${acc.gold}<br>
        Backpack: ${acc.backpack}<br>
        Ping: ${acc.ping} ms<br>
        Rod: ${acc.rod}
        <div class="status ${acc.status.toLowerCase()}">${acc.status}</div>
      `;

      card.onclick = () => {
        detail.innerHTML = `
          <h4>${acc.name} Detail</h4>
          <p>Quest system ready</p>
        `;
      };

      grid.appendChild(card);
    });
  }
});
