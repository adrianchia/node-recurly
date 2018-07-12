'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const account = require('../../lib/account');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Account API', () => {
  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const accountAPI = account(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-account-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-account-response.xml'));

  it('should call List Accounts API', () => {
    mock.onGet('/accounts').reply(200, listResponseXml);
    mock.onGet('/accounts?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(accountAPI.list()).to.be.fulfilled,
      expect(accountAPI.list({sort: "created_at"})).to.be.fulfilled
    ]);
  });

  it('should call Create Account API', () => {
    mock.onPost('/accounts').reply(201, singleResponseXml);

    const newAccount = {
      account: {
        account_code: 1
      }
    };

    return expect(accountAPI.create(newAccount)).to.be.fulfilled;
  });

  it('should call Lookup Account API', () => {
    mock.onGet('/accounts/1').reply(200, singleResponseXml);
    return expect(accountAPI.get("1")).to.be.fulfilled;
  });

  it('should call Update Account API', () => {
    mock.onPut('/accounts/1').reply(200, singleResponseXml);

    const accountUpdate = {
      account: {
        company_name: "New Company Name"
      }
    };

    return expect(accountAPI.update("1", accountUpdate)).to.be.fulfilled;
  });

  it('should call Close Account API', () => {
    mock.onDelete('/accounts/1').reply(204);

    return expect(accountAPI.close("1")).to.be.fulfilled;
  });

  it('should call Reopen Account API', () => {
    mock.onPut('/accounts/1/reopen').reply(200, singleResponseXml);

    return expect(accountAPI.reopen("1")).to.be.fulfilled;
  });

  it('should call Lookup Account Balance API', () => {
    const accountBalanceResponseXml = fs.readFileSync(path.join(__dirname, 'account-balance-response.xml'));
    mock.onGet('/accounts/1/balance').reply(200, accountBalanceResponseXml);

    return expect(accountAPI.balance("1")).to.be.fulfilled;
  });

  it('should call List Account Notes API', () => {
    const responseXml = fs.readFileSync(path.join(__dirname, 'list-account-notes-response.xml'));
    mock.onGet('/accounts/1/notes').reply(200, responseXml);
    mock.onGet('/accounts/1/notes?sort=created_at').reply(200, responseXml);

    return Promise.all([
      expect(accountAPI.notes(1)).to.be.fulfilled,
      expect(accountAPI.notes(1, {sort: 'created_at'})).to.be.fulfilled
    ]);
  });

});
