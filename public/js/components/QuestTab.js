export function renderQuestTab(account) {
  const wrapper = document.createElement("div");

  account.quests.forEach(q => {
    const isActive = q.id === account.selectedQuestId;

    const total = q.tasks.reduce((a, b) => a + b.target, 0);
    const done = q.tasks.reduce((a, b) => a + b.current, 0);
    const percent = Math.floor((done / total) * 100);

    const block = document.createElement("div");
    block.style.marginBottom = "16px";
    block.style.padding = "12px";
    block.style.borderRadius = "12px";
    block.style.background = isActive ? "#3b1d7a" : "#1e1233";
    block.style.cursor = "pointer";

    block.innerHTML = `
      <strong>${q.name}</strong>
      <div class="progress" style="margin:8px 0">
        <div class="progress-fill" style="width:${percent}%"></div>
      </div>
      <div>${percent}%</div>
      <ul>
        ${q.tasks.map(t => `<li>${t.name}: ${t.current}/${t.target}</li>`).join("")}
      </ul>
    `;

    block.onclick = () => {
      account.selectedQuestId = q.id;
    };

    wrapper.appendChild(block);
  });

  return wrapper;
}