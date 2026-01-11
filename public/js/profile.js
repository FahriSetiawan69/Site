document.addEventListener("DOMContentLoaded", () => {
  const profileUsername = document.getElementById("profileUsername");
  const usernameInput = document.getElementById("usernameInput");
  const activeAvatar = document.getElementById("activeAvatar");

  const avatarCard = document.querySelector(".avatar-card");
  const avatarImages = document.querySelectorAll(".avatar-grid img");

  const saveBtn = document.getElementById("saveProfileBtn");

  /* Inject buttons */
  const profileCard = document.querySelector(".profile-card");

  const editAvatarBtn = document.createElement("button");
  editAvatarBtn.textContent = "Edit Avatar";
  editAvatarBtn.className = "profile-action-btn";

  const editUsernameBtn = document.createElement("button");
  editUsernameBtn.textContent = "Edit Username";
  editUsernameBtn.className = "profile-action-btn";

  profileCard.appendChild(editAvatarBtn);
  profileCard.appendChild(editUsernameBtn);

  /* Username edit wrapper */
  const usernameEdit = document.createElement("div");
  usernameEdit.className = "username-edit";
  usernameEdit.appendChild(usernameInput);
  usernameEdit.appendChild(saveBtn);
  profileCard.appendChild(usernameEdit);

  /* Load saved data */
  const savedName = localStorage.getItem("username");
  const savedAvatar = localStorage.getItem("avatar");

  if (savedName) {
    profileUsername.textContent = savedName;
    usernameInput.value = savedName;
  }

  if (savedAvatar) {
    activeAvatar.src = `img/avatars/${savedAvatar}`;
  }

  /* Toggle avatar selector */
  editAvatarBtn.addEventListener("click", () => {
    avatarCard.classList.toggle("active");
  });

  /* Toggle username edit */
  editUsernameBtn.addEventListener("click", () => {
    usernameEdit.classList.toggle("active");
  });

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

  /* Save username */
  saveBtn.addEventListener("click", () => {
    const name = usernameInput.value.trim();
    if (!name) return;

    localStorage.setItem("username", name);
    profileUsername.textContent = name;
    usernameEdit.classList.remove("active");
  });
});
