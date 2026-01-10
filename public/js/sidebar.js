document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll(".page-section");
  const sidebarButtons = document.querySelectorAll("[data-page]");

  function showPage(pageId) {
    // sembunyikan semua halaman
    sections.forEach(sec => {
      sec.style.display = "none";
    });

    // tampilkan satu halaman
    const target = document.getElementById(pageId);
    if (target) {
      target.style.display = "block";
    }

    // update active state sidebar
    sidebarButtons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
    if (activeBtn) activeBtn.classList.add("active");
  }

  // klik sidebar
  sidebarButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const pageId = btn.dataset.page;
      showPage(pageId);
    });
  });

  // DEFAULT SAAT LOGIN
  showPage("page-profile");
});
