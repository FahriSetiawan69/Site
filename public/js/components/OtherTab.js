export function renderOtherTab(account) {
  const wrapper = document.createElement("div");

  wrapper.innerHTML = `<h3>📦 Other Items</h3><hr/>`;

  account.otherInventory.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `${item.name} × ${item.count}`;
    wrapper.appendChild(div);
  });

  return wrapper;
}