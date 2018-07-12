'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const invoice = require('../../lib/invoice');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Invoice API', () => {
  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const invoiceApi = invoice(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-response.xml'));
  const previewResponseXml = fs.readFileSync(path.join(__dirname, 'invoice-preview-response.xml'));

  it('Should call List Invoices API', () => {
    mock.onGet('/invoices').reply(200, listResponseXml);
    mock.onGet('/invoices?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(invoiceApi.list()).to.be.fulfilled,
      expect(invoiceApi.list({sort: 'created_at'})).to.be.fulfilled
    ]);
  });

  it('Should call List Invoices by Account API', () => {
    mock.onGet('/accounts/1/invoices').reply(200, listResponseXml);
    mock.onGet('/accounts/1/invoices?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(invoiceApi.listByAccount('1')).to.be.fulfilled,
      expect(invoiceApi.listByAccount('1', {sort: 'created_at'})).to.be.fulfilled
    ]);
  });

  it('Should call Preview Invoice API', () => {
    mock.onPost('/accounts/1/invoices/preview').reply(200, previewResponseXml);

    const postBody = {
      invoice: {
        collection_method: 'manual'
      }
    };

    return expect(invoiceApi.preview('1', postBody)).to.be.fulfilled;
  });

  it('Should call Post Invoice API', () => {
    mock.onPost('/accounts/1/invoices').reply(200, previewResponseXml);

    const postBody = {
      invoice: {
        collection_method: 'manual'
      }
    };

    return expect(invoiceApi.create('1', postBody)).to.be.fulfilled;
  });

  it('Should call Lookup Invoice API', () => {
    mock.onGet('/invoices/1001').reply(200, singleResponseXml);

    return expect(invoiceApi.get('1001')).to.be.fulfilled;
  });

  it('Should call Mark Invoice as Paid Successfully API', () => {
    mock.onPut('/invoices/1001/mark_successful').reply(200, singleResponseXml);
    return expect(invoiceApi.markSuccessful('1001')).to.be.fulfilled;
  });

  it('Should call Mark Invoice as Failed Collection API', () => {
    mock.onPut('/invoices/1001/mark_failed').reply(200, singleResponseXml);
    return expect(invoiceApi.markFailed('1001')).to.be.fulfilled;
  });

  it('Should call Refund API', () => {
    mock.onPost('/invoices/1001/refund').reply(201, singleResponseXml);

    const postBody = {
      invoice: {
        line_items: [
          {
            adjustment:  {
              uuid: '2bc33a7469dc1458f455634212acdcd6',
              quantity: 1,
              prorate: true
            },
          },
          {
            adjustment: {
              uuid: '2bc33a746a89d867df47024fd6b261b6',
              quantity: 1,
              prorate: true
            }
          }
        ]
      }
    };

    return expect(invoiceApi.refund('1001', postBody)).to.be.fulfilled;
  });

  it('Should call Enter Offline Payment for Manual Invoice', () => {
    const manualInvoiceTxnResponseXml = fs.readFileSync(path.join(__dirname, 'manual-invoice-txn-response.xml'));
    mock.onPost('/invoices/1001/transactions').reply(201,manualInvoiceTxnResponseXml);

    const postBody = {
      transaction: {
        payment_method: 'check',
        collected_at: '2018-03-19T10:33:16-06:00',
        amount_in_cents: 50,
        description: 'Paid with a check'
      }
    };

    return expect(invoiceApi.enterOfflinePayment('1001', postBody)).to.be.fulfilled;
  });

  it('Should call Collect an Invoice API', () => {
    mock.onPut('/invoices/1001/collect').reply(200, singleResponseXml);
    return expect(invoiceApi.collect('1001')).to.be.fulfilled;
  });

  it('Should call Void an Invoice API', () => {
    mock.onPut('/invoices/1001/void').reply(200, singleResponseXml);
    return expect(invoiceApi.void('1001')).to.be.fulfilled;
  });

});
