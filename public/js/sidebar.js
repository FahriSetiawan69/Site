const pages = {
  profile: document.getElementById("profilePage"),
  accounts: document.getElementById("accountsPage"),
  settings: document.getElementById("settingsPage"),
  about: document.getElementById("aboutPage")
};

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    Object.values(pages).forEach(p => p.classList.remove("active"));
    pages[btn.dataset.page].classList.add("active");
  };
});

document.getElementById("logoutBtn").onclick = () => {
  localStorage.clear();
  window.location.href = "/";
};
