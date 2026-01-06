document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("accountGrid");

  // HARD CHECK
  if (!grid) {
    alert("ERROR: accountGrid tidak ditemukan");
    return;
  }

  if (!window.dummyAccounts || window.dummyAccounts.length === 0) {
    grid.innerHTML = "<p style='color:red'>DATA AKUN KOSONG</p>";
    return;
  }

  grid.innerHTML = "";

  window.dummyAccounts.forEach(acc => {
    const card = document.createElement("div");
    card.style.background = "rgba(120,0,200,.35)";
    card.style.borderRadius = "14px";
    card.style.padding = "12px";
    card.style.color = "#fff";

    card.innerHTML = `
      <h3>${acc.username}</h3>
      <div>Gold: ${acc.gold}</div>
      <div>Backpack: ${acc.backpack}</div>
      <div>Ping: ${acc.ping} ms</div>
      <div>Rod: ${acc.rod}</div>
      <div>Quest: ${acc.quest.name}</div>

      <div style="margin-top:6px;height:6px;background:#222;border-radius:6px;">
        <div style="
          width:${acc.quest.progress}%;
          height:100%;
          background:#22c55e;
        "></div>
      </div>

      <div style="
        margin-top:6px;
        font-weight:bold;
        color:${acc.status === "fishing" ? "#22c55e" : "#ff4d4d"};
      ">
        ${acc.status.toUpperCase()}
      </div>
    `;

    grid.appendChild(card);
  });
});
