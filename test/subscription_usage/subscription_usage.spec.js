'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const subscriptionUsage = require('../../lib/subscription_usage');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Subscription Usage Record API', () => {
  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const subscriptionUsageApi = subscriptionUsage(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-response.xml'));

  it('Should call List Subscription Usage API', () => {
    mock.onGet('/subscriptions/374ae5e848adcfd332fdd3469d89c888/add_ons/video_streaming/usage').reply(200, listResponseXml);
    mock.onGet('/subscriptions/374ae5e848adcfd332fdd3469d89c888/add_ons/video_streaming/usage?billing_status=unbilled').reply(200, listResponseXml);

    return Promise.all([
      expect(subscriptionUsageApi.list('374ae5e848adcfd332fdd3469d89c888','video_streaming')).to.be.fulfilled,
      expect(subscriptionUsageApi.list('374ae5e848adcfd332fdd3469d89c888','video_streaming', {billing_status: 'unbilled'})).to.be.fulfilled
    ]);
  });

  it('Should call Log Usage API', () => {
    mock.onPost('/subscriptions/374ae5e848adcfd332fdd3469d89c888/add_ons/video_streaming/usage').reply(201, singleResponseXml);

    const postBody = {
      usage: {
        amount: 1,
        merchant_tag: 'Order ID: 4939853977878713',
        recording_timestamp: '2016-07-14T13:09:15Z',
        usage_timestamp: '2016-07-14T22:30:15Z'
      }
    };

    return expect(subscriptionUsageApi.log('374ae5e848adcfd332fdd3469d89c888','video_streaming', postBody)).to.be.fulfilled;
  });

  it('Should call Lookup Usage Record API', () => {
    mock.onGet('/subscriptions/374ae5e848adcfd332fdd3469d89c888/add_ons/video_streaming/usage/450646065398417338').reply(200, singleResponseXml);

    return expect(subscriptionUsageApi.get('374ae5e848adcfd332fdd3469d89c888', 'video_streaming', '450646065398417338')).to.be.fulfilled;
  });

  it('Should call Update Usage Record API', () => {
    mock.onPut('/subscriptions/374ae5e848adcfd332fdd3469d89c888/add_ons/video_streaming/usage/450646065398417338').reply(200, singleResponseXml);

    const postBody = {
      usage: {
        amount: 1,
      }
    };

    return expect(subscriptionUsageApi.update('374ae5e848adcfd332fdd3469d89c888', 'video_streaming', '450646065398417338', postBody)).to.be.fulfilled;
  });

  it('Should call Delete Usage Record API', () => {
    mock.onDelete('/subscriptions/374ae5e848adcfd332fdd3469d89c888/add_ons/video_streaming/usage/450646065398417338').reply(204);

    return expect(subscriptionUsageApi.delete('374ae5e848adcfd332fdd3469d89c888', 'video_streaming', '450646065398417338')).to.be.fulfilled;
  });
});
