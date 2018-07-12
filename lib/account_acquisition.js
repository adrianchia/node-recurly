'use strict';
function accountAcquisition(api) {
  const accountAcquisitionApi = {
    create: createAccountAcquisition,
    get: lookupAccountAcquisition,
    update: updateAccountAcquisition,
    clear: clearAccountAcquisition
  };

  function createAccountAcquisition(accountCode, acquisitionBody) {
    return api.post('/accounts/' + encodeURIComponent(accountCode) + '/acquisition', acquisitionBody);
  }

  function lookupAccountAcquisition(accountCode) {
    return api.get('/accounts/' + encodeURIComponent(accountCode) + '/acquisition');
  }

  function updateAccountAcquisition(accountCode, acquisitionBody) {
    return api.put('/accounts/' + encodeURIComponent(accountCode) + '/acquisition', acquisitionBody);
  }

  function clearAccountAcquisition(accountCode) {
    return api.delete('/accounts/' + encodeURIComponent(accountCode) + '/acquisition');
  }

  return accountAcquisitionApi;
}

module.exports = accountAcquisition;
