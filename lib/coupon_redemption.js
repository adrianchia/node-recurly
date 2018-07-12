'use strict';
function couponRedemption(api) {
  const couponRedemptionApi = {
    get: getCouponRedemption,
    listByAccount: listCouponRedemptions,
    listByInvoice: listInvoiceCouponRedemptions,
    listBySubscription: listSubscriptionCouponRedemptions,
    redeem: redeemCoupon,
    remove: removeCoupon
  };

  function getCouponRedemption(accountCode, redemptionUuid) {
    return api.get('/accounts/' + encodeURIComponent(accountCode) + '/redemptions/' + encodeURIComponent(redemptionUuid));
  }

  function listCouponRedemptions(accountCode, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/accounts/' + encodeURIComponent(accountCode) + '/redemptions', params);
  }

  function listInvoiceCouponRedemptions(invoiceNumber, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/invoices/' + encodeURIComponent(invoiceNumber) + '/redemptions', params);
  }

  function listSubscriptionCouponRedemptions(uuid, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/subscriptions/' + encodeURIComponent(uuid) + '/redemptions', params);
  }

  function redeemCoupon(couponCode, couponBody) {
    return api.post('/coupons/' + encodeURIComponent(couponCode) + '/redeem', couponBody);
  }

  /**
   *
   * @param {string} accountCode
   * @param {string} [redemptionUuid]
   */
  function removeCoupon(accountCode, redemptionUuid) {
    let baseEndpoint = '/accounts/' + encodeURIComponent(accountCode) + '/redemptions';
    let endpoint = redemptionUuid ? baseEndpoint + '/' + encodeURIComponent(redemptionUuid) : baseEndpoint;
    return api.delete(endpoint);
  }

  return couponRedemptionApi;
}

module.exports = couponRedemption;
