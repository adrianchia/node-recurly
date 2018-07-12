'use strict';
function creditPayment(api) {
  const creditPaymentApi = {
    list: listCreditPayments,
    get: lookupCreditPayment,
    listByAccount: listCreditPaymentsOnAccount
  };

  /**
   * List Credit Payments
   * @param {object} queryParams
   */
  function listCreditPayments(queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/credit_payments', params);
  }

  /**
   * Lookup Credit Payment
   * @param {string} uuid The uuid for the credit payment.
   */
  function lookupCreditPayment(uuid) {
    return api.get('/credit_payments/' + encodeURIComponent(uuid));
  }

  /**
   * List credit payments associated with a specific account.
   * @param {string} accountCode The account's accountCode
   */
  function listCreditPaymentsOnAccount(accountCode, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/accounts/' + encodeURIComponent(accountCode) + '/credit_payments', params);
  }

  return creditPaymentApi;
}

module.exports = creditPayment;
