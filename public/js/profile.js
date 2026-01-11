document.addEventListener("DOMContentLoaded", () => {

  const avatarCard = document.querySelector(".avatar-card");
  const avatarImages = document.querySelectorAll(".avatar-grid img");
  const activeAvatar = document.getElementById("activeAvatar");

  const usernameInput = document.getElementById("usernameInput");
  const usernameText = document.getElementById("profileUsername");

  const editAvatarBtn = document.getElementById("editAvatarBtn");
  const editUsernameBtn = document.getElementById("editUsernameBtn");
  const saveBtn = document.getElementById("saveProfileBtn");

  /* ===============================
     LOAD SAVED PROFILE
  ================================ */

  const savedAvatar = localStorage.getItem("profileAvatar");
  const savedUsername = localStorage.getItem("profileUsername");

  if (savedAvatar) {
    activeAvatar.src = `img/avatars/${savedAvatar}`;
  }

  if (savedUsername) {
    usernameText.textContent = savedUsername;
    usernameInput.value = savedUsername;
  }

  /* ===============================
     TOGGLE AVATAR SELECTOR
  ================================ */

  editAvatarBtn.addEventListener("click", () => {
    avatarCard.classList.toggle("show");
  });

  /* ===============================
     TOGGLE USERNAME INPUT
  ================================ */

  editUsernameBtn.addEventListener("click", () => {
    usernameInput.classList.toggle("show");
    if (usernameInput.classList.contains("show")) {
      usernameInput.focus();
    }
  });

  /* ===============================
     SELECT AVATAR
  ================================ */

  avatarImages.forEach(img => {
    img.addEventListener("click", () => {
      avatarImages.forEach(i => i.classList.remove("active"));
      img.classList.add("active");

      const avatarFile = img.dataset.avatar;
      activeAvatar.src = `img/avatars/${avatarFile}`;
      localStorage.setItem("profileAvatar", avatarFile);
    });
  });

  /* ===============================
     SAVE PROFILE
  ================================ */

  saveBtn.addEventListener("click", () => {
    const newUsername = usernameInput.value.trim();

    if (newUsername.length > 0) {
      localStorage.setItem("profileUsername", newUsername);
      usernameText.textContent = newUsername;
      usernameInput.classList.remove("show");
    }

    avatarCard.classList.remove("show");
  });

});
