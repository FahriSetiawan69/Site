document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("usernameInput");
  const profileUsername = document.getElementById("profileUsername");
  const activeAvatar = document.getElementById("activeAvatar");
  const avatarImages = document.querySelectorAll(".avatar-grid img");
  const saveBtn = document.getElementById("saveProfileBtn");

  /* Load saved profile */
  const savedName = localStorage.getItem("username");
  const savedAvatar = localStorage.getItem("avatar");

  if (savedName) {
    usernameInput.value = savedName;
    profileUsername.textContent = savedName;
  }

  if (savedAvatar) {
    activeAvatar.src = `img/avatars/${savedAvatar}`;
  }

  /* Avatar select */
  avatarImages.forEach(img => {
    if (img.dataset.avatar === savedAvatar) {
      img.classList.add("active");
    }

    img.addEventListener("click", () => {
      avatarImages.forEach(i => i.classList.remove("active"));
      img.classList.add("active");

      const avatarFile = img.dataset.avatar;
      activeAvatar.src = `img/avatars/${avatarFile}`;
      localStorage.setItem("avatar", avatarFile);
    });
  });

  /* Save profile */
  saveBtn.addEventListener("click", () => {
    const name = usernameInput.value.trim();
    if (!name) return;

    localStorage.setItem("username", name);
    profileUsername.textContent = name;
  });
});
