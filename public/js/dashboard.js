document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {

      // Remove active from all
      navLinks.forEach(l => l.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));

      // Activate clicked
      link.classList.add("active");
      const target = link.dataset.target;
      document.getElementById(target).classList.add("active");
    });
  });
});
