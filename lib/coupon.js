'use strict';
function coupon(api) {
  const couponApi = {
    list: listCoupons,
    create: createCoupon,
    get: lookupCoupon,
    generateUniqueCodes: generateUniqueCodes,
    expire: expireCoupon,
    update: updateCoupon,
    restore: restoreCoupon,
    listUniqueCodes: listUniqueCodes
  };

  function listCoupons(queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/coupons', params);
  }

  function createCoupon(couponBody) {
    return api.post('/coupons', couponBody);
  }

  function lookupCoupon(couponCode) {
    return api.get('/coupons/' + encodeURIComponent(couponCode));
  }

  function generateUniqueCodes(couponCode, body) {
    return api.post('/coupons/' + encodeURIComponent(couponCode) + '/generate', body);
  }

  function expireCoupon(couponCode) {
    return api.delete('/coupons/' + encodeURIComponent(couponCode));
  }

  function updateCoupon(couponCode, body) {
    return api.put('/coupons/' + encodeURIComponent(couponCode), body);
  }

  function restoreCoupon(couponCode, body) {
    return api.put('/coupons/' + encodeURIComponent(couponCode) + '/restore', body);
  }

  function listUniqueCodes(couponCode, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/coupons/' + encodeURIComponent(couponCode) + '/unique_coupon_codes', params);
  }

  return couponApi;
}

module.exports = coupon;
