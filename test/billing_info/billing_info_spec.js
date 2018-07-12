'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const billingInfo = require('../../lib/billing_info');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Billing Info API', () => {
  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const billingInfoApi = billingInfo(API);

  const responseXml = fs.readFileSync(path.join(__dirname, 'billing_info_response.xml'));

  it('Should call Create Account\'s Billing Info API', () => {
    mock.onPost('/accounts/1/billing_info').reply(201, responseXml);

    const postBody = {
      billing_info: {
        token_id: 'token-generated'
      }
    }

    return expect(billingInfoApi.create('1', postBody)).to.be.fulfilled;
  });

  it('Should call Lookup Account\'s Billing Info API', () => {
    mock.onGet('/accounts/1/billing_info').reply(200, responseXml);

    return expect(billingInfoApi.get('1')).to.be.fulfilled;
  });

  it('Should call Update Account\'s Billing Info API', () => {
    mock.onPut('/accounts/1/billing_info').reply(201, responseXml);

    const postBody = {
      billing_info: {
        token_id: 'token-generated'
      }
    };

    return expect(billingInfoApi.update('1', postBody)).to.be.fulfilled;
  });

  it('Should call Clear Account\'s Billing Info API', () => {
    mock.onDelete('/accounts/1/billing_info').reply(204);

    return expect(billingInfoApi.clear('1')).to.be.fulfilled;
  });
});
