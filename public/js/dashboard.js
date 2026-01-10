document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".sidebar button[data-page]");
  const pages = document.querySelectorAll(".page-section");

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove("active"));
    navButtons.forEach(b => b.classList.remove("active"));

    const page = document.getElementById(pageId);
    const btn = document.querySelector(`.sidebar button[data-page="${pageId}"]`);

    if (page) page.classList.add("active");
    if (btn) btn.classList.add("active");
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(btn.dataset.page);
    });
  });

  /* DEFAULT PAGE */
  showPage("profile");
});
