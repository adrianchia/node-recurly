'use strict';
function giftCard(api) {
  const giftCardApi = {
    list: listGiftCards,
    preview: previewGiftCard,
    create: createGiftCard,
    get: lookupGiftCard,
    redeem: redeemGiftCard,
    previewSubscription: previewSubscription,
    createSubscription: createSubscription
  };

  function listGiftCards(queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/gift_cards', params);
  }

  function previewGiftCard(giftCardBody) {
    return api.post('/gift_cards/preview', giftCardBody);
  }

  function createGiftCard(giftCardBody) {
    return api.post('/gift_cards', giftCardBody);
  }

  function lookupGiftCard(id) {
    return api.get('/gift_cards/' + encodeURIComponent(id));
  }

  function redeemGiftCard(redemptionCode, body) {
    return api.post('/gift_cards/' + encodeURIComponent(redemptionCode) + '/redeem', body);
  }

  function previewSubscription(body) {
    return api.post('/subscriptions/preview', body);
  }

  function createSubscription(body) {
    return api.post('/subscriptions', body);
  }

  return giftCardApi;
}

module.exports = giftCard;
