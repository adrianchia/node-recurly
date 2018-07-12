'use strict';
function purchase(api) {

  const purchaseApi = {
    create: createPurchase,
    preview: previewPurchase,
    authorize: authorizePurchase,
    pending: pendingPurchase
  };

  function createPurchase(purchaseBody) {
    return api.post('/purchases', purchaseBody);
  }

  function previewPurchase(purchaseBody) {
    return api.post('/purchases/preview', purchaseBody);
  }

  function authorizePurchase(purchaseBody) {
    return api.post('/purchases/authorize', purchaseBody);
  }

  function pendingPurchase(purchaseBody) {
    return api.post('/purchases/pending', purchaseBody);
  }

  return purchaseApi;
}

module.exports = purchase;
