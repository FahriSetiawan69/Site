const menuButtons = document.querySelectorAll(".menu-item");
const panels = document.querySelectorAll(".panel");

menuButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    menuButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;
    panels.forEach(p => p.classList.remove("active"));
    document.getElementById(`tab-${tab}`).classList.add("active");
  });
});

// Logout (dummy)
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("fishit_key");
  window.location.href = "/";
});
