'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const purchase = require('../../lib/purchase');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Purchase API', () => {

  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const purchaseApi = purchase(API);

  const responseXml = fs.readFileSync(path.join(__dirname, 'purchase-response.xml'));

  it('should call Create Purchase API', () => {
    mock.onPost('/purchases').reply(200, responseXml);

    const postBody = {
      purchase: {
        collection_method: "automatic",
        account: {
          account_code: "1",
          email: "foo@example.com"
        },
        subscriptions: {
          subscription: {
            plan_code: "plan1"
          }
        }
      }
    };

    return expect(purchaseApi.create(postBody)).to.be.fulfilled;
  });

  it('should call Preview Purchase API', () => {
    mock.onPost('/purchases/preview').reply(200, responseXml);

    const postBody = {
      purchase: {
        collection_method: "automatic",
        account: {
          account_code: "1",
          email: "foo@example.com"
        },
        subscriptions: {
          subscription: {
            plan_code: "plan1"
          }
        }
      }
    };

    return expect(purchaseApi.preview(postBody)).to.be.fulfilled;
  });

  it('should call Authorize Purchase API', () => {
    mock.onPost('/purchases/authorize').reply(200, responseXml);

    const postBody = {
      purchase: {
        collection_method: "automatic",
        account: {
          account_code: "1",
          email: "foo@example.com"
        },
        subscriptions: {
          subscription: {
            plan_code: "plan1"
          }
        }
      }
    };

    return expect(purchaseApi.authorize(postBody)).to.be.fulfilled;
  });

  it('should call Pending Purchase API', () => {
    mock.onPost('/purchases/pending').reply(200, responseXml);

    const postBody = {
      purchase: {
        collection_method: "automatic",
        account: {
          account_code: "1",
          email: "foo@example.com"
        },
        subscriptions: {
          subscription: {
            plan_code: "plan1"
          }
        }
      }
    };

    return expect(purchaseApi.pending(postBody)).to.be.fulfilled;
  });

});
