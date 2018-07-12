'use strict';
function shippingAddress(api) {
  const shippingAddressApi = {
    list: listShippingAddress,
    create: createShippingAddress,
    update: updateShippingAddress,
    delete: deleteShippingAddress
  };

  function listShippingAddress(accountCode, queryParams) {
    const params = queryParams ? { params: queryParams } : {};
    return api.get('/accounts/' + encodeURIComponent(accountCode) + '/shipping_addresses', params);
  }

  function createShippingAddress(accountCode, shippingAddressBody) {
    return api.post('/accounts/' + encodeURIComponent(accountCode) + '/shipping_addresses', shippingAddressBody);
  }

  function updateShippingAddress(accountCode, shippingAddressId, shippingAddressBody) {
    return api.put('/accounts/' + encodeURIComponent(accountCode) + '/shipping_addresses/' +  encodeURIComponent(shippingAddressId), shippingAddressBody);
  }

  function deleteShippingAddress(accountCode, shippingAddressId) {
    return api.delete('/accounts/' + encodeURIComponent(accountCode) + '/shipping_addresses/' +  encodeURIComponent(shippingAddressId));
  }

  return shippingAddressApi;
}

module.exports = shippingAddress
