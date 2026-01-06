console.log("main.js loaded"); // DEBUG WAJIB ADA

document.getElementById("loginBtn").addEventListener("click", login);

function login() {
  console.log("login function triggered");

  const keyInput = document.getElementById("keyInput");
  const status = document.getElementById("status");

  if (!keyInput) {
    alert("keyInput not found");
    return;
  }

  const key = keyInput.value.trim();

  if (key === "abogoboga") {
    sessionStorage.setItem("fishit_key_valid", "true");

    status.innerText = "Key validated successfully.";
    status.style.color = "green";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 500);

  } else {
    status.innerText = "Invalid key.";
    status.style.color = "red";
  }
}
