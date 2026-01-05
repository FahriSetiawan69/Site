export const state = {
  accounts: [],
  selectedAccountId: null
};

export function setAccounts(data) {
  state.accounts = data;
}

export function updateAccount(id, newData) {
  const acc = state.accounts.find(a => a.id === id);
  if (!acc) return;
  Object.assign(acc, newData);
}

export function selectAccount(id) {
  state.selectedAccountId = id;
}

export function getSelectedAccount() {
  return state.accounts.find(a => a.id === state.selectedAccountId);
}