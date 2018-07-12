'use strict';
function adjustments(api) {
  const adjustmentsApi = {
    list: listAdjustments,
    create: createChargeOrCredit,
    delete: deleteAdjustment
  };

  function listAdjustments(accountCode, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/accounts/' + encodeURIComponent(accountCode) + '/adjustments', params);
  }

  function createChargeOrCredit(accountCode, body) {
    return api.post('/accounts/' + encodeURIComponent(accountCode) + '/adjustments', body);
  }

  function deleteAdjustment(uuid) {
    return api.delete('/adjustments/' + encodeURIComponent(uuid));
  }

  return adjustmentsApi;
}

module.exports = adjustments;
