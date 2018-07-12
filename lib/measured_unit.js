'use strict';
function measuredUnit(api) {
  const measuredUnitApi = {
    list: listMeasuredUnits,
    create: createMeasuredUnit,
    get: lookupMeasuredUnit,
    update: updateMeasuredUnit,
    delete: deleteMeasuredUnit
  };

  /**
   * List Measured Units
   */
  function listMeasuredUnits() {
    return api.get('/measured_units');
  }

  /**
   * Create Measured Unit
   * @param {object} body
   * @param {string} body.name Unique internal name of the measured unit on your site.
   * @param {string} body.display_name Display name for the measured unit. We recommend the singular version. (e.g. - GB, API Call, Email).
   * @param {string} [body.description] Optional internal description.
   */
  function createMeasuredUnit(body) {
    return api.post('/measured_units', body);
  }

  /**
   * Lookup a specific measured unit for your site. A customer's usage-based add-on and usage records will
   * reference the associated measured unit where you can grab the display name for pricing and usage displays.
   * @param {string} measured_unit_id Unique id of the measured unit on your site.
   */
  function lookupMeasuredUnit(measured_unit_id) {
    return api.get('/measured_units/' + encodeURIComponent(measured_unit_id));
  }

  /**
   * Update a measured unit on your site.
   * Updates immediately change the measured unit for any associated plan and subscription usage-based add-ons.
   * @param {string} measured_unit_id Unique id of the measured unit on your site.
   * @param {object} body
   * @param {string} [body.name] Unique internal name of the measured unit on your site.
   * @param {string} [body.display_name] Display name for the measured unit. We recommend the singular version. (e.g. - GB, API Call, Email).
   * @param {string} [body.description] Optional internal description.
   */
  function updateMeasuredUnit(measured_unit_id, body) {
    return api.put('/measured_units/' + encodeURIComponent(measured_unit_id), body);
  }

  /**
   * Delete a measured unit on your site.
   * The measured unit must be removed from all plans before it can be deleted.
   * @param {string} measured_unit_id Unique id of the measured unit on your site.
   */
  function deleteMeasuredUnit(measured_unit_id) {
    return api.delete('/measured_units/' + encodeURIComponent(measured_unit_id));
  }

  return measuredUnitApi;
}

module.exports = measuredUnit;
