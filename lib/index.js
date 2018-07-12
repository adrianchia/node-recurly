'use strict';
const client = require('./client');

/**
 * Creates a new Recurly client
 * @param {Object} config
 * @param {String} config.apiKey Recurly's private key
 * @param {String} config.subdomain Recurly subdomain. i.e. <subdomain>.recurly.com
 */
function Recurly(config) {
  if (!config) {
    throw new Error('Recurly apiKey and subdomain are required.');
  }

  else if (!config.apiKey) {
    throw new Error('Recurly apiKey is required.');
  }

  else if (!config.subdomain) {
    throw new Error('Recurly subdomain is required');
  }

  const API = client.createInstance(config.subdomain, config.apiKey);

  return {
    accounts: require('./account')(API),
    purchases:  require('./purchase')(API),
    billingInfo: require('./billing_info')(API),
    shippingAddress: require('./shipping_address')(API),
    accountAcquisition: require('./account_acquisition')(API),
    adjustments: require('./adjustment')(API),
    coupons: require('./coupon')(API),
    couponRedemptions: require('./coupon_redemption')(API),
    giftCards: require('./gift_card')(API),
    invoice: require('./invoice')(API),
    plans: require('./plan')(API),
    planAddons: require('./plan_add_ons')(API),
    subscriptions: require('./subscription')(API),
    measuredUnits: require('./measured_unit')(API),
    subscriptionUsage: require('./subscription_usage')(API),
    transactions: require('./transaction')(API),
    creditPayments: require('./credit_payment')(API),
    exportDates: require('./automated_exports')(API)
  };

}

module.exports = Recurly;
