const views = {
  profile: document.getElementById("profileView"),
  accounts: document.getElementById("accountsView"),
  settings: document.getElementById("settingsView"),
  about: document.getElementById("aboutView")
};

function switchView(viewName) {
  Object.values(views).forEach(v => v.classList.remove("active"));
  views[viewName].classList.add("active");
}

/* DEFAULT VIEW */
switchView("profile");
