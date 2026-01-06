// Proteksi dashboard
if (!AuthState.isLoggedIn()) {
  window.location.href = "index.html";
}

// Logout function
function logout() {
  AuthState.logout();
  window.location.href = "index.html";
}

// Render dummy data
document.addEventListener("DOMContentLoaded", () => {
  // Fish
  fishData.forEach(f => {
    document.getElementById("fishList").innerHTML += `<div>${f.name} (${f.weight})</div>`;
  });

  // Items
  itemData.forEach(i => {
    document.getElementById("itemList").innerHTML += `<div>${i.name} x${i.count}</div>`;
  });

  // Quest
  questData.forEach(q => {
    document.getElementById("questList").innerHTML += `<div>${q.name}: ${q.progress}</div>`;
  });
});
