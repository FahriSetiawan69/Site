if (!AuthState.isLoggedIn()) {
  window.location.href = "index.html";
}

function logout() {
  AuthState.logout();
  window.location.href = "index.html";
}

// Render dummy data
if (window.fishData && document.getElementById("fishList")) {
  fishData.forEach(f => {
    document.getElementById("fishList").innerHTML += `<div>${f.name} (${f.weight})</div>`;
  });
}

if (window.itemData && document.getElementById("itemList")) {
  itemData.forEach(i => {
    document.getElementById("itemList").innerHTML += `<div>${i.name} x${i.count}</div>`;
  });
}

if (window.questData && document.getElementById("questList")) {
  questData.forEach(q => {
    document.getElementById("questList").innerHTML += `<div>${q.name}: ${q.progress}</div>`;
  });
}
