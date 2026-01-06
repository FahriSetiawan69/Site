const VALID_KEY = "abogoboga";

const btn = document.getElementById("loginBtn");
const input = document.getElementById("keyInput");
const msg = document.getElementById("loginMsg");

btn.addEventListener("click", () => {
  const key = input.value.trim();

  if (!key) {
    msg.textContent = "Key tidak boleh kosong";
    return;
  }

  if (key === VALID_KEY) {
    localStorage.setItem("fishit_key_valid", "true");
    window.location.href = "dashboard.html"; // 🔥 redirect
  } else {
    msg.textContent = "Key salah";
  }
});
