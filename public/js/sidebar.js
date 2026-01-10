function openSection(sectionId) {
    document.querySelectorAll(".page-section").forEach(sec => {
        sec.style.display = "none";
    });

    const target = document.getElementById(sectionId);
    if (target) target.style.display = "block";

    document.querySelectorAll(".sidebar-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    const activeBtn = document.querySelector(`.sidebar-btn[data-target="${sectionId}"]`);
    if (activeBtn) activeBtn.classList.add("active");
}

// INIT — HANYA SEKALI
window.addEventListener("load", () => {
    // DEFAULT PAGE
    openSection("profile");

    document.querySelectorAll(".sidebar-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            openSection(btn.dataset.target);
        });
    });
});
