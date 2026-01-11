document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".page-section");

  function resetSections() {
    sections.forEach(sec => {
      sec.classList.remove("active");
      sec.style.display = "none";
    });
  }

  function openPage(pageId) {
    resetSections();

    const target = document.getElementById(pageId);
    if (!target) return;

    target.style.display = "block";
    target.classList.add("active");
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      openPage(btn.dataset.page);
    });
  });

  // ===== FORCE DEFAULT PAGE =====
  navButtons.forEach(b => b.classList.remove("active"));

  const profileBtn = document.querySelector('.nav-btn[data-page="profile"]');
  if (profileBtn) profileBtn.classList.add("active");

  openPage("profile");
});
