'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const shippingAddress = require('../../lib/shipping_address');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Shipping Address API', () => {
  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const shippingAddressApi = shippingAddress(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-response.xml'));

  it('Should call List Account\'s Shipping Address API', () => {
    mock.onGet('/accounts/1/shipping_addresses').reply(200, listResponseXml);
    mock.onGet('/accounts/1/shipping_addresses?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(shippingAddressApi.list('1')).to.be.fulfilled,
      expect(shippingAddressApi.list('1', {sort: 'created_at'})).to.be.fulfilled
    ]);
  });

  it('Should call Create Shipping Address API', () => {
    mock.onPost('/accounts/1/shipping_addresses').reply(201, singleResponseXml);

    const postBody = {
      shipping_address: {
        nickname: 'Work',
        first_name: 'Verena',
        last_name: 'Example',
        company: 'Recurly Inc',
        phone: '555-222-1212',
        email: 'verena@example.com',
        address1: '123 Main St.',
        address2: 'Suite 101',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'US'
      }
    };

    return expect(shippingAddressApi.create('1', postBody)).to.be.fulfilled;
  });

  it('Should call Update Shipping Address API', () => {
    mock.onPut('/accounts/1/shipping_addresses/2438622711411416831').reply(201, singleResponseXml);

    const postBody = {
      shipping_address: {
        nickname: 'Work',
        first_name: 'Verena',
        last_name: 'Example',
        company: 'Recurly Inc',
        phone: '555-222-1212',
        email: 'verena@example.com',
        address1: '123 Main St.',
        address2: 'Suite 101',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'US'
      }
    };

    return expect(shippingAddressApi.update('1', '2438622711411416831', postBody)).to.be.fulfilled;
  });

  it('Should call Delete Shipping Address API', () => {
    mock.onDelete('/accounts/1/shipping_addresses/2438622711411416831').reply(204);

    return expect(shippingAddressApi.delete('1', '2438622711411416831')).to.be.fulfilled;
  });
});
