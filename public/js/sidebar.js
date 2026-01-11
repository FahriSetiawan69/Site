document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".nav-btn");
  const pages = document.querySelectorAll(".page-section");

  function switchPage(pageId) {
    pages.forEach(p => {
      p.classList.remove("active");
      p.style.display = "none";
    });

    const page = document.getElementById(pageId);
    if (page) {
      page.style.display = "block";
      page.classList.add("active");
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      switchPage(btn.dataset.page);
    });
  });

  // === HARD RESET STATE ===
  buttons.forEach(b => b.classList.remove("active"));
  pages.forEach(p => {
    p.classList.remove("active");
    p.style.display = "none";
  });

  // === FORCE DEFAULT PAGE ===
  const profileBtn = document.querySelector('[data-page="profile"]');
  if (profileBtn) {
    profileBtn.classList.add("active");
    switchPage("profile");
  }
});
