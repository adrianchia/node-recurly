'use strict';
function account(api) {

  const accountApi = {
    list: listAccounts,
    create: createAccount,
    get: lookupAccount,
    update: updateAccount,
    close: closeAccount,
    reopen: reopenAccount,
    balance: getBalance,
    notes: listAccountNotes
  };

  /**
   * @param {Object} queryParams Query Params
   */
  function listAccounts(queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/accounts', params);
  }

  function createAccount(newAccount) {
    return api.post('/accounts', newAccount);
  }

  function lookupAccount(accountCode) {
    return api.get('/accounts/' + encodeURIComponent(accountCode));
  }

  function updateAccount(accountCode, accountBody) {
    return api.put('/accounts/' + encodeURIComponent(accountCode), accountBody);
  }

  function closeAccount(accountCode) {
    return api.delete('/accounts/' + encodeURIComponent(accountCode));
  }

  function reopenAccount(accountCode) {
    return api.put('/accounts/' + encodeURIComponent(accountCode) + '/reopen');
  }

  function getBalance(accountCode) {
    return api.get('/accounts/' + encodeURIComponent(accountCode) + '/balance');
  }

  function listAccountNotes(accountCode, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/accounts/' + encodeURIComponent(accountCode) + '/notes', params);
  }

  return accountApi;
}

module.exports = account;
