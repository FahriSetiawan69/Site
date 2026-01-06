(function () {
  const isValid = sessionStorage.getItem("fishit_key_valid");

  if (!isValid) {
    window.location.href = "index.html";
  }
})();