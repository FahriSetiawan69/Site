let activeAccountId = null;

function setActiveAccount(id) {
  activeAccountId = id;
}

function getActiveAccount() {
  return dummyAccounts.find(acc => acc.id === activeAccountId);
}
