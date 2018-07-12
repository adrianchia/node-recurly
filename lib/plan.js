'use strict';
function plan(api) {
  const planApi = {
    list: listPlans,
    create: createPlan,
    get: lookupPlan,
    update: updatePlan,
    delete: deletePlan
  };

  function listPlans(queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/plans', params);

  }

  function createPlan(body) {
    return api.post('/plans', body);
  }

  function lookupPlan(planCode) {
    return api.get('/plans/' + encodeURIComponent(planCode));
  }

  function updatePlan(planCode, body) {
    return api.put('/plans/' + encodeURIComponent(planCode), body);
  }

  function deletePlan(planCode) {
    return api.delete('/plans/' + encodeURIComponent(planCode));
  }

  return planApi;
}

module.exports = plan;
