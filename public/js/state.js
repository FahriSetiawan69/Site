if (localStorage.getItem("fishit_key_valid") !== "true") {
  window.location.href = "index.html";
}

let activeAccountId = null;

function setActiveAccount(id) {
  activeAccountId = id;
}

function getActiveAccount() {
  return dummyAccounts.find(acc => acc.id === activeAccountId);
}

