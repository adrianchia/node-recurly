'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const subscriptions = require('../../lib/subscription');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Subscriptions API', () => {
  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const subscriptionsApi = subscriptions(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-response.xml'));

  it('Should call List Subscriptions API', () => {
    mock.onGet('/subscriptions').reply(200, listResponseXml);
    mock.onGet('/subscriptions?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(subscriptionsApi.list()).to.be.fulfilled,
      expect(subscriptionsApi.list({sort: 'created_at'})).to.be.fulfilled
    ]);
  });

  it('Should call List Account\'s Subscriptions API', () => {
    mock.onGet('/accounts/1/subscriptions').reply(200, listResponseXml);
    mock.onGet('/accounts/1/subscriptions?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(subscriptionsApi.listByAccount('1')).to.be.fulfilled,
      expect(subscriptionsApi.listByAccount('1',{sort: 'created_at'})).to.be.fulfilled
    ]);
  });

  it('Should call Preview Subscription API', () => {
    mock.onPost('/subscriptions/preview').reply(200, singleResponseXml);

    const postBody = {
      subscription: {
        plan_code: 'gold',
        currency: 'USD',
        collection_method: 'manual',
        account: {
          account_code: 1
        }
      }
    };

    return expect(subscriptionsApi.preview(postBody)).to.be.fulfilled;
  });

  it('Should call Create Subscription API', () => {
    mock.onPost('/subscriptions').reply(201, singleResponseXml);

    const postBody = {
      subscription: {
        plan_code: 'gold',
        currency: 'USD',
        collection_method: 'manual',
        account: {
          account_code: 1
        }
      }
    };

    return expect(subscriptionsApi.create(postBody)).to.be.fulfilled;
  });

  it('Should call Lookup Subscription API', () => {
    mock.onGet('/subscriptions/44f83d7cba354d5b84812419f923ea96').reply(200, singleResponseXml);

    return expect(subscriptionsApi.get('44f83d7cba354d5b84812419f923ea96')).to.be.fulfilled;
  });

  it('Should call Update Subscription API', () => {
    mock.onPut('/subscriptions/44f83d7cba354d5b84812419f923ea96').reply(200, singleResponseXml);

    const postBody = {
      subscription: {
        timeframe: 'now'
      }
    };

    return expect(subscriptionsApi.update('44f83d7cba354d5b84812419f923ea96', postBody)).to.be.fulfilled;
  });

  it('Should call Update Subscription Notes API', () => {
    mock.onPut('/subscriptions/44f83d7cba354d5b84812419f923ea96/notes').reply(200, singleResponseXml);

    const postBody = {
      subscription: {
        terms_and_conditions: 'Payment can be sent to Acme Cloud, Inc',
        customer_notes: 'Thanks for your business!',
        vat_reverse_charge_notes: 'No VAT was applied on this invoice. Please reference this legislation.'
      }
    };

    return expect(subscriptionsApi.updateNotes('44f83d7cba354d5b84812419f923ea96', postBody)).to.be.fulfilled;
  });

  it('Should call Cancel Subscription API', () => {
    mock.onPut('/subscriptions/44f83d7cba354d5b84812419f923ea96/cancel').reply(200, singleResponseXml);

    return expect(subscriptionsApi.cancel('44f83d7cba354d5b84812419f923ea96')).to.be.fulfilled;
  });

  it('Should call Reactivate Cancelled Subscription API', () => {
    mock.onPut('/subscriptions/44f83d7cba354d5b84812419f923ea96/reactivate').reply(200, singleResponseXml);

    return expect(subscriptionsApi.reactivate('44f83d7cba354d5b84812419f923ea96')).to.be.fulfilled;
  });

  it('Should call Terminate Subscription API', () => {
    mock.onPut('/subscriptions/44f83d7cba354d5b84812419f923ea96/terminate').reply(200, singleResponseXml);
    mock.onPut('/subscriptions/44f83d7cba354d5b84812419f923ea96/terminate?refund=none').reply(200, singleResponseXml);
    mock.onPut('/subscriptions/44f83d7cba354d5b84812419f923ea96/terminate?refund=none&charge=true').reply(200, singleResponseXml);

    return Promise.all([
      expect(subscriptionsApi.terminate('44f83d7cba354d5b84812419f923ea96')).to.be.fulfilled,
      expect(subscriptionsApi.terminate('44f83d7cba354d5b84812419f923ea96', 'none')).to.be.fulfilled,
      expect(subscriptionsApi.terminate('44f83d7cba354d5b84812419f923ea96', 'none', true)).to.be.fulfilled,
    ]);
  });

  it('Should call Postpone Subscription API', () => {
    mock.onPut('/subscriptions/44f83d7cba354d5b84812419f923ea96/postpone?next_renewal_date=2016-07-14T13%3A09%3A15Z').reply(200, singleResponseXml);
    mock.onPut('/subscriptions/44f83d7cba354d5b84812419f923ea96/postpone?next_renewal_date=2016-07-14T13%3A09%3A15.000Z').reply(200, singleResponseXml);
    mock.onPut('/subscriptions/44f83d7cba354d5b84812419f923ea96/postpone?next_renewal_date=2016-07-14T13%3A09%3A15.000Z&bulk=true').reply(200, singleResponseXml);
    mock.onPut('/subscriptions/44f83d7cba354d5b84812419f923ea96/postpone?next_renewal_date=2016-07-14T13%3A09%3A15Z&bulk=true').reply(200, singleResponseXml);

    return Promise.all([
      expect(subscriptionsApi.postpone('44f83d7cba354d5b84812419f923ea96')).to.be.rejected,
      expect(subscriptionsApi.postpone('44f83d7cba354d5b84812419f923ea96', new Date('2016-07-14T13:09:15Z'))).to.be.fulfilled,
      expect(subscriptionsApi.postpone('44f83d7cba354d5b84812419f923ea96', '2016-07-14T13:09:15Z')).to.be.fulfilled,
      expect(subscriptionsApi.postpone('44f83d7cba354d5b84812419f923ea96', new Date('2016-07-14T13:09:15Z'), true)).to.be.fulfilled,
      expect(subscriptionsApi.postpone('44f83d7cba354d5b84812419f923ea96', '2016-07-14T13:09:15Z', true)).to.be.fulfilled,
    ]);
  });

  it('Should call Preview Subscription Change API', () => {
    mock.onPost('/subscriptions/43ae00fadf77887688fe9c4041b7af19/preview').reply(200, singleResponseXml);

    const postBody = {
      subscription: {
        unit_amount_in_cents: 100,
        shipping_address: {
          nickname: 'Work'
        }
      }
    };

    return expect(subscriptionsApi.previewChange('43ae00fadf77887688fe9c4041b7af19',postBody)).to.be.fulfilled;
  });

  it('Should call Pause Subscription API', () => {
    mock.onPut('/subscriptions/43ae00fadf77887688fe9c4041b7af19/pause').reply(200, singleResponseXml);

    const postBody = {
      subscription: {
        remaining_pause_cycles: 1,
      }
    };

    return expect(subscriptionsApi.pause('43ae00fadf77887688fe9c4041b7af19',postBody)).to.be.fulfilled;
  });

  it('Should call Resume Subscription API', () => {
    mock.onPut('/subscriptions/43ae00fadf77887688fe9c4041b7af19/resume').reply(200, singleResponseXml);

    return expect(subscriptionsApi.resume('43ae00fadf77887688fe9c4041b7af19')).to.be.fulfilled;
  });
});
