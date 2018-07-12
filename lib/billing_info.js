'use strict';

function billingInfo(api) {
  const billingInfoApi = {
    create: createAccountBillingInfo,
    get: lookupAccountBillingInfo,
    update: updateAccoountBillingInfo,
    clear: clearAccountBillingInfo
  };

  function createAccountBillingInfo(accountCode, billingInfoBody) {
    return api.post('/accounts/' + encodeURIComponent(accountCode) + '/billing_info', billingInfoBody);
  }

  function lookupAccountBillingInfo(accountCode) {
    return api.get('/accounts/' + encodeURIComponent(accountCode) + '/billing_info');
  }

  function updateAccoountBillingInfo(accountCode, billingInfoBody) {
    return api.put('/accounts/' + encodeURIComponent(accountCode) + '/billing_info', billingInfoBody);
  }

  function clearAccountBillingInfo(accountCode) {
    return api.delete('/accounts/' + encodeURIComponent(accountCode) + '/billing_info');
  }

  return billingInfoApi;
}

module.exports = billingInfo;
