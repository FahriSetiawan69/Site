document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".sidebar button[data-page]");
  const pages = document.querySelectorAll(".page-section");

  function showPage(pageId) {
    // sembunyikan semua page
    pages.forEach(page => {
      page.style.display = "none";
      page.classList.remove("active");
    });

    // matikan semua button
    navButtons.forEach(btn => btn.classList.remove("active"));

    // tampilkan target
    const targetPage = document.getElementById(pageId);
    const targetBtn = document.querySelector(
      `.sidebar button[data-page="${pageId}"]`
    );

    if (!targetPage) {
      console.error("PAGE NOT FOUND:", pageId);
      return;
    }

    targetPage.style.display = "block";
    targetPage.classList.add("active");
    if (targetBtn) targetBtn.classList.add("active");
  }

  // event sidebar
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(btn.dataset.page);
    });
  });

  // ✅ DEFAULT PAGE = PROFILE
  showPage("profile");
});
