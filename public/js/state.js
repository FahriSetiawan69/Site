console.log("state.js loaded");

window.AuthState = {
  isLoggedIn() {
    return sessionStorage.getItem("fishit_key_valid") === "true";
  },

  login() {
    sessionStorage.setItem("fishit_key_valid", "true");
  },

  logout() {
    sessionStorage.removeItem("fishit_key_valid");
  }
};
