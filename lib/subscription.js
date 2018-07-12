'use strict';
function subscription(api) {
  const subscriptionApi = {
    list: listSubscriptions,
    listByAccount: listSubscriptionsByAccount,
    preview: previewSubscription,
    create: createSubscription,
    get: lookupSubscription,
    update: updateSubscription,
    updateNotes: updateSubscriptionNotes,
    cancel: cancelSubscription,
    reactivate: reactivateSubscription,
    terminate: terminateSubscription,
    postpone: postponeSubscription,
    previewChange: previewSubscriptionChange,
    pause: pauseSubscription,
    resume: resumeSubscription
  };

  /**
   * Returns a list of all the subscriptions.
   * @param {object} queryParams
   */
  function listSubscriptions(queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/subscriptions', params);
  }

  /**
   *
   * @param {string} accountCode Unique account identifier.
   * @param {object} queryParams
   */
  function listSubscriptionsByAccount(accountCode, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/accounts/' + encodeURIComponent(accountCode) + '/subscriptions', params);
  }

  /**
   * Returns a preview for a new subscription applied to an account.
   * @param {object} body
   */
  function previewSubscription(body) {
    return api.post('/subscriptions/preview', body);
  }

  /**
   * Create Subscription
   * @param {object} body
   */
  function createSubscription(body) {
    return api.post('/subscriptions', body);
  }

  /**
   * Lookup a subscription's details.
   * @param {string} uuid
   */
  function lookupSubscription(uuid) {
    return api.get('/subscriptions/' + encodeURIComponent(uuid));
  }

  /**
   * Request an update to a subscription that takes place immediately or at renewal.
   *
   * @param {string} uuid
   * @param {object} body
   */
  function updateSubscription(uuid, body) {
    return api.put('/subscriptions/' + encodeURIComponent(uuid), body);
  }

  /**
   * Update a subscription's invoice notes before the next renewal. Updating notes will not trigger the renewal.
   * @param {string} uuid
   * @param {object} body
   */
  function updateSubscriptionNotes(uuid, body) {
    return api.put('/subscriptions/' + encodeURIComponent(uuid) + '/notes', body);
  }

  /**
   * Cancel a subscription so it remains active and then expires at the end of the current bill cycle.
   * @param {string} uuid
   */
  function cancelSubscription(uuid) {
    return api.put('/subscriptions/' + encodeURIComponent(uuid) + '/cancel');
  }

  /**
   * Reactivate a canceled subscription so it renews at the end of the current bill cycle.
   * @param {string} uuid
   */
  function reactivateSubscription(uuid) {
    return api.put('/subscriptions/' + encodeURIComponent(uuid) + '/reactivate');
  }

  /**
   * putTerminate Subscription
   * @param {string} uuid
   * @param {string} refund  refund processed on the subscription charges. One of "partial", "full" or "none"
   * @param {boolean} [charge] Allowed if Usage-Based Billing Beta enabled on your site: If true,
   * current billing cycle unbilled usage is billed on the final invoice.
   * If false, Recurly will create a negative usage record for current billing cycle
   * usage that will zero out the final invoice line items.
   */
  function terminateSubscription(uuid, refund, charge) {
    refund = refund || "none";
    let queryParams = {
      params: {
        "refund": refund
      }
    };

    if (typeof charge !== 'undefined') {
      queryParams.params["charge"] = charge
    }

    return api.put('/subscriptions/' + encodeURIComponent(uuid) + '/terminate', queryParams);
  }

  /**
   * Postpone Subscription or Extend Trial
   * @param {string} uuid
   * @param {string | date} nextRenewalDate ISO 8601 date string.
   * @param {boolean} [bulk]
   */
  function postponeSubscription(uuid, nextRenewalDate, bulk) {
    if (Object.prototype.toString.call(nextRenewalDate) === '[object Date]') {
      nextRenewalDate = nextRenewalDate.toISOString();
    }

    let additionalQueryParams = (typeof bulk === 'boolean') ? {params: { bulk: bulk}} : {}

    return api.put('/subscriptions/' + encodeURIComponent(uuid) + '/postpone?next_renewal_date=' + encodeURIComponent(nextRenewalDate), additionalQueryParams);
  }

  /**
   * Preview Subscription Change
   * @param {string} uuid
   * @param {object} body
   */
  function previewSubscriptionChange(uuid, body) {
    return api.post('/subscriptions/' + encodeURIComponent(uuid) + '/preview', body);
  }

  /**
   * Schedule a pause or update remaining pause cycles for a subscription.
   * @param {string} uuid
   * @param {object} body
   */
  function pauseSubscription(uuid, body) {
    return api.put('/subscriptions/' + encodeURIComponent(uuid) + '/pause', body);
  }

  /**
   * Immediately reactivate a paused subscription, starting a new billing cycle.
   * @param {string} uuid
   */
  function resumeSubscription(uuid) {
    return api.put('/subscriptions/' + encodeURIComponent(uuid) + '/resume');
  }

  return subscriptionApi;
}

module.exports = subscription;
