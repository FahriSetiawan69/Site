const DEV_KEY = "abogoboga";

function submitKey() {
  const input = document.getElementById("keyInput");
  const status = document.getElementById("statusText");

  const key = input.value.trim();

  if (!key) {
    status.textContent = "Key cannot be empty";
    status.style.color = "orange";
    return;
  }

  if (key === DEV_KEY) {
    sessionStorage.setItem("fishit_key_valid", "true");
    status.textContent = "Access granted...";
    status.style.color = "#9bffb1";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);

  } else {
    status.textContent = "Invalid key";
    status.style.color = "red";
  }
}
