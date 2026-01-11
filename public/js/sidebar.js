document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".page-section");

  function showSection(targetId) {
    sections.forEach(section => {
      section.classList.remove("active");
    });

    const target = document.getElementById(targetId);
    if (target) {
      target.classList.add("active");
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // remove active state from all buttons
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const page = btn.getAttribute("data-page");
      showSection(page);
    });
  });

  // DEFAULT PAGE (PROFILE)
  showSection("profile");
});
