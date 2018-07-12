'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const transactions = require('../../lib/transaction');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Transactions API', () => {

  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const transactionsApi = transactions(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-response.xml'));

  it('Should call List Transactions API', () => {
    mock.onGet('/transactions').reply(200, listResponseXml);
    mock.onGet('/transactions?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(transactionsApi.list()).to.be.fulfilled,
      expect(transactionsApi.list({sort: 'created_at'})).to.be.fulfilled
    ]);
  });

  it('Should call List Account\'s Transactions API', () => {
    mock.onGet('/accounts/1/transactions').reply(200, listResponseXml);
    mock.onGet('/accounts/1/transactions?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(transactionsApi.listByAccount('1')).to.be.fulfilled,
      expect(transactionsApi.listByAccount('1', {sort: 'created_at'})).to.be.fulfilled
    ]);
  });

  it('Should call Create Transaction API', () => {
    mock.onPost('/transactions').reply(201, singleResponseXml);

    const postBody = {
      transaction: {
        amount_in_cents: 100,
        currency: 'USD',
        account: {
          account_code: 1
        }
      }
    };

    return expect(transactionsApi.create(postBody)).to.be.fulfilled;
  });

  it('Should call Lookup Transaction API', () => {
    mock.onGet('/transactions/a13acd8fe4294916b79aec87b7ea441f').reply(200, singleResponseXml);
    return expect(transactionsApi.get('a13acd8fe4294916b79aec87b7ea441f')).to.be.fulfilled;
  });

  it('Should call Refund Transaction API', () => {
    mock.onDelete('/transactions/a13acd8fe4294916b79aec87b7ea441f').reply(204);

    const postBody = {
      amount_in_cents: 1000
    };

    return Promise.all([
      expect(transactionsApi.refund('a13acd8fe4294916b79aec87b7ea441f')).to.be.fulfilled,
      expect(transactionsApi.refund('a13acd8fe4294916b79aec87b7ea441f', postBody)).to.be.fulfilled,
    ]);
  });

});
