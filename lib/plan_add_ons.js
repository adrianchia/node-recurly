'use strict';
function planAddOns(api) {
  const planAddOnsApi = {
    list: listPlanAddOns,
    create: createPlanAddOn,
    get: lookupPlanAddOn,
    update: updatePlanAddOn,
    delete: deletePlanAddOn
  };

  function listPlanAddOns(planCode, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/plans/' + encodeURIComponent(planCode) + '/add_ons', params);
  }

  function createPlanAddOn(planCode, body) {
    return api.post('/plans/' + encodeURIComponent(planCode) + '/add_ons', body);
  }

  function lookupPlanAddOn(planCode, addonCode) {
    return api.get('/plans/' + encodeURIComponent(planCode) + '/add_ons/' + encodeURIComponent(addonCode));
  }

  function updatePlanAddOn(planCode, addonCode, body) {
    return api.put('/plans/' + encodeURIComponent(planCode) + '/add_ons/' + encodeURIComponent(addonCode), body);
  }

  function deletePlanAddOn(planCode, addonCode) {
    return api.delete('/plans/' + encodeURIComponent(planCode) + '/add_ons/' + encodeURIComponent(addonCode));
  }

  return planAddOnsApi;
}

module.exports = planAddOns;
