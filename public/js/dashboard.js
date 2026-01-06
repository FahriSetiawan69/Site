if (!AuthState.isLoggedIn()) {
  window.location.href = "index.html";
}

function logout() {
  AuthState.logout();
  window.location.href = "index.html";
}

// Render dummy data
fishData.forEach(f => {
  document.getElementById("fishList").innerHTML += `<div>${f.name} (${f.weight})</div>`;
});

itemData.forEach(i => {
  document.getElementById("itemList").innerHTML += `<div>${i.name} x${i.count}</div>`;
});

questData.forEach(q => {
  document.getElementById("questList").innerHTML += `<div>${q.name}: ${q.progress}</div>`;
});
