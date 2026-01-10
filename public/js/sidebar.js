function showPage(pageId) {
    // hide all pages
    document.querySelectorAll(".page").forEach(p => {
        p.style.display = "none";
    });

    // show page
    const page = document.getElementById(pageId);
    if (page) page.style.display = "block";

    // active button
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    const btn = document.querySelector(`.nav-btn[data-page="${pageId.replace('Page','')}"]`);
    if (btn) btn.classList.add("active");

    // 🔑 HOOK: panggil render khusus per halaman
    if (pageId === "accountsPage" && typeof renderAccountsMonitor === "function") {
        renderAccountsMonitor();
    }
}

window.addEventListener("load", () => {
    // DEFAULT = PROFILE
    showPage("profilePage");

    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            showPage(btn.dataset.page + "Page");
        });
    });
});
