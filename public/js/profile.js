document.addEventListener("DOMContentLoaded", () => {
  const editAvatarBtn = document.getElementById("editAvatarBtn");
  const avatarGrid = document.getElementById("avatarGrid");

  const editUsernameBtn = document.getElementById("editUsernameBtn");
  const usernameText = document.getElementById("usernameText");
  const usernameInput = document.getElementById("usernameInput");

  /* ==========================
     TOGGLE AVATAR GRID
  ========================== */

  if (editAvatarBtn && avatarGrid) {
    avatarGrid.style.display = "none";

    editAvatarBtn.addEventListener("click", () => {
      avatarGrid.style.display =
        avatarGrid.style.display === "none" ? "grid" : "none";
    });
  }

  /* ==========================
     TOGGLE USERNAME EDIT
  ========================== */

  if (editUsernameBtn && usernameInput && usernameText) {
    usernameInput.style.display = "none";

    editUsernameBtn.addEventListener("click", () => {
      const isHidden = usernameInput.style.display === "none";

      usernameInput.style.display = isHidden ? "block" : "none";
      usernameText.style.display = isHidden ? "none" : "block";

      editUsernameBtn.innerText = isHidden
        ? "Cancel Edit"
        : "Edit Username";
    });
  }
});
