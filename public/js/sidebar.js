document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".page-section");

  function hideAllSections() {
    sections.forEach(section => {
      section.style.display = "none";
      section.classList.remove("active");
    });
  }

  function activateSection(pageId) {
    hideAllSections();

    const target = document.getElementById(pageId);
    if (target) {
      target.style.display = "block";
      target.classList.add("active");
    }
  }

  // CLICK HANDLER
  navButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const page = btn.dataset.page;
      activateSection(page);
    });
  });

  // ===== DEFAULT PAGE =====
  // PAKSA SELALU KE PROFILE
  navButtons.forEach(b => b.classList.remove("active"));

  const profileBtn = document.querySelector('.nav-btn[data-page="profile"]');
  if (profileBtn) profileBtn.classList.add("active");

  activateSection("profile");
});
