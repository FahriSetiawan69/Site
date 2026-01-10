function showPage(pageId) {
    // hide all pages
    document.querySelectorAll(".page").forEach(p => {
        p.style.display = "none";
    });

    // show target page
    const target = document.getElementById(pageId);
    if (target) target.style.display = "block";

    // active button
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    const btn = document.querySelector(`.nav-btn[data-page="${pageId}"]`);
    if (btn) btn.classList.add("active");

    // special hook: Accounts Monitor
    if (pageId === "accountsPage" && typeof renderAccountsMonitor === "function") {
        renderAccountsMonitor();
    }
}

window.addEventListener("load", () => {
    // default page = PROFILE
    showPage("profilePage");

    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            showPage(btn.dataset.page + "Page");
        });
    });
});
