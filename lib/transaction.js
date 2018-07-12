'use strict';
function transaction(api) {
  const transactionApi = {
    list: listTransactions,
    listByAccount: listTransactionsByAccount,
    create: createTransaction,
    get: lookupTransaction,
    refund: refundTransaction
  };

  /**
   * List Transactions
   * @param {object} queryParams
   */
  function listTransactions(queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/transactions', params);
  }

  /**
   * List Account's Transactions
   * @param {string} accountCode
   * @param {object} queryParams
   */
  function listTransactionsByAccount(accountCode, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/accounts/' + encodeURIComponent(accountCode) + '/transactions', params);
  }

  /**
   * Create Transaction
   * @param {object} body
   */
  function createTransaction(body) {
    return api.post('/transactions', body);
  }

  /**
   * Lookup a specific transaction.
   * @param {string} uuid Transaction's unique identifier.
   */
  function lookupTransaction(uuid) {
    return api.get('/transactions/' + encodeURIComponent(uuid));
  }

  /**
   * Refund Transaction
   * @param {string} uuid Transaction's unique identifier.
   * @param {object} [body]
   * @param {number} [body.amount_in_cents] Amount to refund in cents. Defaults to full amount.
   */
  function refundTransaction(uuid, body) {
    return api.delete('/transactions/' + encodeURIComponent(uuid), body);
  }

  return transactionApi;
}

module.exports = transaction;
