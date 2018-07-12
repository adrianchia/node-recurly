'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const adjustment = require('../../lib/adjustment');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Adjustments API', () => {
  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const adjustmentApi = adjustment(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-adjustment-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-adjustment-response.xml'));

  it('Should call List Account\'s Adjustments API', () => {
    mock.onGet('/accounts/1/adjustments').reply(200, listResponseXml);
    mock.onGet('/accounts/1/adjustments?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(adjustmentApi.list('1')).to.be.fulfilled,
      expect(adjustmentApi.list('1', {sort: 'created_at'})).to.be.fulfilled,
    ]);
  });

  it('Should call Create Charge API', () => {
    mock.onPost('/accounts/1/adjustments').reply(201, singleResponseXml);

    const postbody = {
      adjustment: {
        description: 'Charge for extra bandwith',
        unit_amount_in_cents: 5000,
        currency: 'USD',
        quantity: 1
      }
    };

    return expect(adjustmentApi.create('1', postbody)).to.be.fulfilled;
  });

  it('Should call Delete Adjustment API', () => {
    mock.onDelete('/adjustments/626db120a84102b1809909071c701c60').reply(204);

    return expect(adjustmentApi.delete('626db120a84102b1809909071c701c60')).to.be.fulfilled;
  });
});
