function login() {
  const key = document.getElementById("keyInput").value;
  const status = document.getElementById("status");

  // DEV KEY
  if (key === "abogoboga") {
    sessionStorage.setItem("fishit_key_valid", "true");

    status.innerText = "Key validated successfully.";
    status.style.color = "green";

    // MASUK DASHBOARD
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);

  } else {
    status.innerText = "Invalid key.";
    status.style.color = "red";
  }
}
