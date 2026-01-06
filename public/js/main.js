console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loginBtn");
  const input = document.getElementById("keyInput");
  const status = document.getElementById("status");

  if (!btn || !input) {
    console.error("Login elements not found");
    return;
  }

  btn.addEventListener("click", () => {
    const key = input.value.trim();

    console.log("Login attempt:", key);

    if (key === "abogoboga") {
      AuthState.login();

      status.innerText = "Key validated successfully.";
      status.style.color = "green";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);

    } else {
      status.innerText = "Invalid key.";
      status.style.color = "red";
    }
  });
});
