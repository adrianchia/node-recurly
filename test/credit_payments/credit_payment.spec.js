'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const creditPayment = require('../../lib/credit_payment');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Credit Payments API', () => {

  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const creditPaymentAPi = creditPayment(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-response.xml'));

  it('Should call List Credit Payment API', () => {
    mock.onGet('/credit_payments').reply(200, listResponseXml);
    mock.onGet('/credit_payments?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(creditPaymentAPi.list()).to.be.fulfilled,
      expect(creditPaymentAPi.list({sort: 'created_at'})).to.be.fulfilled
    ]);
  });

  it('Should call Lookup Credit Payment API', () => {
    mock.onGet('/credit_payments/3e8764beb04add789fb3b54778838e17').reply(200, singleResponseXml);

    return expect(creditPaymentAPi.get('3e8764beb04add789fb3b54778838e17')).to.be.fulfilled;
  });

  it('Should call List Credit Payment on Account API', () => {
    mock.onGet('/accounts/1/credit_payments').reply(200, listResponseXml);
    mock.onGet('/accunts/1/credit_payments?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(creditPaymentAPi.listByAccount('1')).to.be.fulfilled,
      expect(creditPaymentAPi.listByAccount('1', {sort: 'created_at'})).to.be.fulfilled
    ]);
  });
});
