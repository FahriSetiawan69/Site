document.addEventListener("DOMContentLoaded", () => {
    // DEFAULT PAGE
    openSection("profile");

    document.querySelectorAll(".sidebar-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.target;
            openSection(target);
        });
    });
});

function openSection(section) {
    document.querySelectorAll(".page-section").forEach(sec => {
        sec.style.display = "none";
    });

    const active = document.getElementById(section);
    if (active) active.style.display = "block";

    document.querySelectorAll(".sidebar-btn").forEach(b => b.classList.remove("active"));
    document.querySelector(`.sidebar-btn[data-target="${section}"]`)?.classList.add("active");
}
