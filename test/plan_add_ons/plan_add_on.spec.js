'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const planAddOns = require('../../lib/plan_add_ons');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Plan Add-Ons API', () => {
  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const planAddOnsApi = planAddOns(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-response.xml'));

  it('Should call List Plan\'s Add-Ons API', () => {
    mock.onGet('/plans/gold/add_ons').reply(200, listResponseXml);
    mock.onGet('/plans/gold/add_ons?created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(planAddOnsApi.list('gold')).to.be.fulfilled,
      expect(planAddOnsApi.list('gold', {sort: 'created_at'})).to.be.fulfilled
    ]);

  });

  it('Should Call Create Plan Add-On API', () => {
    mock.onPost('/plans/gold/add_ons').reply(201, singleResponseXml);

    const postBody = {
      add_on: {
        add_on_code: 'ipaddresses',
        name: 'Extra IP Addresses',
        unit_amount_in_cents: {
          USD: 200,
          EUR: 180
        },
        revenue_schedule_type: 'evenly'
      }
    };

    return expect(planAddOnsApi.create('gold', postBody)).to.be.fulfilled;
  });

  it('Should Call Lookup Plan Add-On API', () => {
    mock.onGet('/plans/gold/add_ons/ipaddresses').reply(200, singleResponseXml);
    return expect(planAddOnsApi.get('gold', 'ipaddresses')).to.be.fulfilled;
  });

  it('Should Call Update Plan Add-On API', () => {
    mock.onPut('/plans/gold/add_ons/ipaddresses').reply(200, singleResponseXml);

    const postBody = {
      add_on: {
        unit_amount_in_cents: {
          USD: 200,
          EUR: 180
        }
      }
    };

    return expect(planAddOnsApi.update('gold', 'ipaddresses', postBody)).to.be.fulfilled;
  });

  it('Should Call Delete Plan Add-On API', () => {
    mock.onDelete('/plans/gold/add_ons/ipaddresses').reply(204);
    return expect(planAddOnsApi.delete('gold', 'ipaddresses')).to.be.fulfilled;
  });
});
