document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".page-section");

  function hideAllSections() {
    sections.forEach(section => {
      section.classList.remove("active");
      section.style.display = "none";
    });
  }

  function showSection(id) {
    hideAllSections();
    const target = document.getElementById(id);
    if (target) {
      target.style.display = "block";
      target.classList.add("active");
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const page = btn.dataset.page;
      showSection(page);
    });
  });

  // ===== DEFAULT PAGE =====
  const defaultBtn = document.querySelector('.nav-btn[data-page="profile"]');
  if (defaultBtn) {
    defaultBtn.classList.add("active");
    showSection("profile");
  }
});
