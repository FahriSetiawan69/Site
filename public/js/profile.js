document.addEventListener("DOMContentLoaded", () => {

  const usernameEl = document.getElementById("profileUsername");
  const usernameInput = document.getElementById("usernameInput");
  const saveBtn = document.getElementById("saveProfileBtn");

  const avatarPreview = document.getElementById("activeAvatar");
  const avatarOptions = document.querySelectorAll(".avatar-grid img");

  /* LOAD SAVED PROFILE */
  const savedUsername = localStorage.getItem("profile_username");
  const savedAvatar = localStorage.getItem("profile_avatar");

  if (savedUsername) {
    usernameEl.textContent = savedUsername;
    usernameInput.value = savedUsername;
  }

  if (savedAvatar) {
    avatarPreview.src = `img/avatars/${savedAvatar}`;
  }

  /* SAVE PROFILE */
  saveBtn.addEventListener("click", () => {
    const name = usernameInput.value.trim();
    if (!name) return;

    localStorage.setItem("profile_username", name);
    usernameEl.textContent = name;
  });

  /* AVATAR SELECT */
  avatarOptions.forEach(img => {
    img.addEventListener("click", () => {
      const avatar = img.dataset.avatar;
      avatarPreview.src = `img/avatars/${avatar}`;
      localStorage.setItem("profile_avatar", avatar);
    });
  });

});
