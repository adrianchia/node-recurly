'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const accountAcquisition = require('../../lib/account_acquisition');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Account Acquisition API', () => {
  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const accountAcquisitionApi = accountAcquisition(API);

  const responseXml = fs.readFileSync(path.join(__dirname, 'response.xml'));

  it('Should call Create Account Acquisition API', () => {
    mock.onPost('/accounts/1/acquisition').reply(200, responseXml);

    const postBody = {
      account_acquisition: {
        cost_in_cents: 199,
        currency: 'USD'
      }
    };

    return expect(accountAcquisitionApi.create('1', postBody)).to.be.fulfilled;
  });

  it('Should call Lookup Account Acquisition API', () => {
    mock.onGet('/accounts/1/acquisition').reply(200, responseXml);

    return expect(accountAcquisitionApi.get('1')).to.be.fulfilled;
  });

  it('Should call Update Account Acquisition API', () => {
    mock.onPut('/accounts/1/acquisition').reply(200, responseXml);

    const postBody = {
      account_acquisition: {
        cost_in_cents: 150,
        currency: 'USD'
      }
    };

    return expect(accountAcquisitionApi.update('1', postBody)).to.be.fulfilled;
  });

  it('Should call Clear Account Acquisition API', () => {
    mock.onDelete('/accounts/1/acquisition').reply(204);

    return expect(accountAcquisitionApi.clear('1')).to.be.fulfilled;
  });
});
