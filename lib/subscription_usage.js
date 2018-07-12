'use strict';
function subscriptionUsage(api) {
  const subscriptionUsageApi = {
    list: listUsage,
    log: logUsage,
    get: lookupUsage,
    update: updateUsage,
    delete: deleteUsage
  };

  /**
   * List Subscription Add-On's Usage
   * @param {string} subscription_uuid Subscription's unique identifier.
   * @param {string} add_on_code The unique add-on code.
   * @param {object} [queryParams]
   */
  function listUsage(subscription_uuid, add_on_code, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/subscriptions/' + encodeURIComponent(subscription_uuid) + '/add_ons/' + encodeURIComponent(add_on_code) + "/usage", params);
  }

  /**
   * List Subscription Add-On's Usage
   * @param {string} subscription_uuid Subscription's unique identifier.
   * @param {string} add_on_code The unique add-on code.
   * @param {object} body
   */
  function logUsage(subscription_uuid, add_on_code, body) {
    return api.post('/subscriptions/' + encodeURIComponent(subscription_uuid) + '/add_ons/' + encodeURIComponent(add_on_code) + "/usage", body);
  }

  /**
   * Lookup a specific usage record.
   * @param {string} subscription_uuid Subscription's unique identifier.
   * @param {string} add_on_code The unique add-on code.
   * @param {string} usage_id Unique id for the usage record.
   */
  function lookupUsage(subscription_uuid, add_on_code, usage_id) {
    return api.get('/subscriptions/' + encodeURIComponent(subscription_uuid) + '/add_ons/' + encodeURIComponent(add_on_code) + "/usage/" + encodeURI(usage_id));
  }

  /**
   * Update a specific usage record.
   * @param {string} subscription_uuid Subscription's unique identifier.
   * @param {string} add_on_code The unique add-on code.
   * @param {string} usage_id Unique id for the usage record.
   * @param {object} body
   */
  function updateUsage(subscription_uuid, add_on_code, usage_id, body) {
    return api.put('/subscriptions/' + encodeURIComponent(subscription_uuid) + '/add_ons/' + encodeURIComponent(add_on_code) + "/usage/" + encodeURI(usage_id), body);
  }

  /**
   * Delete usage record.
   * @param {string} subscription_uuid Subscription's unique identifier.
   * @param {string} add_on_code The unique add-on code.
   * @param {string} usage_id Unique id for the usage record.
   */
  function deleteUsage(subscription_uuid, add_on_code, usage_id) {
    return api.delete('/subscriptions/' + encodeURIComponent(subscription_uuid) + '/add_ons/' + encodeURIComponent(add_on_code) + "/usage/" + encodeURI(usage_id));
  }

  return subscriptionUsageApi;
}

module.exports = subscriptionUsage;
