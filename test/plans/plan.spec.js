'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const plans = require('../../lib/plan');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Plans API', () => {
  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const plansApi = plans(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-response.xml'));

  it('Should call List Plans API', () => {
    mock.onGet('/plans').reply(200, listResponseXml);
    mock.onGet('/plans?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(plansApi.list()).to.be.fulfilled,
      expect(plansApi.list({sort: 'created_at'})).to.be.fulfilled
    ]);
  });

  it('Should call List Plans API', () => {
    mock.onPost('/plans').reply(201, singleResponseXml);

    const postBody = {
      plan: {
        plan_code: 'gold',
        name: 'Gold Plan',
        unit_amount_in_cents: {
          USD: 6000,
          EUR: 4500
        }
      }
    };

    return expect(plansApi.create(postBody)).to.be.fulfilled;
  });

  it('Should call Lookup Plan API', () => {
    mock.onGet('/plans/gold').reply(200, singleResponseXml);

    return expect(plansApi.get('gold')).to.be.fulfilled;
  });

  it('Should call Update Plan API', () => {
    mock.onPut('/plans/gold').reply(200, singleResponseXml);

    const postBody = {
      plan: {
        unit_amount_in_cents: {
          USD: 6000,
          EUR: 4500
        }
      }
    };

    return expect(plansApi.update('gold', postBody)).to.be.fulfilled;
  });

  it('Should call Delete Plan API', () => {
    mock.onDelete('/plans/gold').reply(204);

    return expect(plansApi.delete('gold')).to.be.fulfilled;
  });
});
