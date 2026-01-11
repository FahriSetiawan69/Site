/* =====================================================
   AVATAR PRELOAD (PENTING - HARUS DI PALING ATAS)
   ===================================================== */

(function preloadAvatars() {
  const avatarFiles = [
    "avatar_1.png",
    "avatar_2.png",
    "avatar_3.png",
    "avatar_4.png",
    "avatar_5.png"
  ];

  avatarFiles.forEach(file => {
    const img = new Image();
    img.src = `img/avatars/${file}`;

    // Paksa decode lebih awal (browser modern)
    if (img.decode) {
      img.decode().catch(() => {});
    }
  });
})();

/* =====================================================
   PROFILE LOGIC
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* -------- ELEMENT -------- */
  const usernameText = document.getElementById("profileUsername");
  const usernameInput = document.getElementById("usernameInput");
  const saveBtn = document.getElementById("saveProfileBtn");

  const avatarPreview = document.getElementById("activeAvatar");
  const avatarOptions = document.querySelectorAll(".avatar-grid img");

  if (!usernameText || !avatarPreview) {
    // Profile section belum ada / belum aktif
    return;
  }

  /* -------- LOAD SAVED DATA -------- */
  const savedUsername = localStorage.getItem("profile_username");
  const savedAvatar = localStorage.getItem("profile_avatar");

  if (savedUsername) {
    usernameText.textContent = savedUsername;
    if (usernameInput) usernameInput.value = savedUsername;
  } else {
    usernameText.textContent = "User";
  }

  if (savedAvatar) {
    avatarPreview.src = `img/avatars/${savedAvatar}`;
  }

  /* -------- SAVE USERNAME -------- */
  if (saveBtn && usernameInput) {
    saveBtn.addEventListener("click", () => {
      const value = usernameInput.value.trim();
      if (!value) return;

      localStorage.setItem("profile_username", value);
      usernameText.textContent = value;
    });
  }

  /* -------- AVATAR SELECT -------- */
  avatarOptions.forEach(img => {
    img.addEventListener("click", () => {
      const avatar = img.dataset.avatar;
      if (!avatar) return;

      avatarPreview.src = `img/avatars/${avatar}`;
      localStorage.setItem("profile_avatar", avatar);

      // Optional: highlight selected avatar
      avatarOptions.forEach(i => i.classList.remove("active"));
      img.classList.add("active");
    });
  });

});
