'use strict';
function invoice(api) {
  const invoiceApi = {
    list: listInvoice,
    listByAccount: listInvoiceByAccount,
    preview: previewInvoice,
    create: postInvoice,
    get: lookupInvoice,
    markSuccessful: markSuccessful,
    markFailed: markFailed,
    refund: refund,
    enterOfflinePayment: enterOfflinePayment,
    collect: collectInvoice,
    void: voidInvoice
  };

  function listInvoice(queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/invoices', params);
  }

  function listInvoiceByAccount(accountCode, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/accounts/' + encodeURIComponent(accountCode) + '/invoices', params);
  }

  function previewInvoice(accountCode, body) {
    return api.post('/accounts/' + encodeURIComponent(accountCode) + '/invoices/preview', body);
  }

  function postInvoice(accountCode, body) {
    return api.post('/accounts/' + encodeURIComponent(accountCode) + '/invoices', body);
  }

  function lookupInvoice(invoiceNumber) {
    return api.get('/invoices/' + encodeURIComponent(invoiceNumber));
  }

  function markSuccessful(invoiceNumber) {
    return api.put('/invoices/' + encodeURIComponent(invoiceNumber) + '/mark_successful');
  }

  function markFailed(invoiceNumber) {
    return api.put('/invoices/' + encodeURIComponent(invoiceNumber) + '/mark_failed');
  }

  function refund(invoiceNumber, body) {
    return api.post('/invoices/' + encodeURIComponent(invoiceNumber) + '/refund', body);
  }

  function enterOfflinePayment(invoiceNumber, body) {
    return api.post('/invoices/' + encodeURIComponent(invoiceNumber) + '/transactions', body);
  }

  function collectInvoice(invoiceNumber) {
    return api.put('/invoices/' + encodeURIComponent(invoiceNumber) + '/collect');
  }

  function voidInvoice(invoiceNumber) {
    return api.put('/invoices/' + encodeURIComponent(invoiceNumber) + '/void');
  }

  return invoiceApi;
}

module.exports = invoice;
