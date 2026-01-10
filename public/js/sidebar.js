document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".menu-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    switchView(btn.dataset.view);
  };
});

document.getElementById("logoutBtn").onclick = () => {
  localStorage.clear();
  location.href = "/";
};
