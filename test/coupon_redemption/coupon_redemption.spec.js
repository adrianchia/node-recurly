'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const redemption = require('../../lib/coupon_redemption');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Coupon Redemption API', () => {

  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const redemptionApi = redemption(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-coupon-redemption-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-coupon-redemption-response.xml'));

  it('Should call Get Coupon Redemption API', () => {
    mock.onGet('/accounts/1/redemptions/374a1c75374bd81493a3f7425db0a2b8').reply(200, singleResponseXml);

    return expect(redemptionApi.get('1','374a1c75374bd81493a3f7425db0a2b8')).to.be.fulfilled;
  });

  it('Should call List Account\'s Coupon Redemptions API', () => {
    mock.onGet('/accounts/1/redemptions').reply(200, listResponseXml);
    mock.onGet('/accounts/1/redemptions?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(redemptionApi.listByAccount('1')).to.be.fulfilled,
      expect(redemptionApi.listByAccount('1', {sort: 'created_at'})).to.be.fulfilled
    ]);
  });

  it('Should call List Invoice\'s Coupon Redemptions API', () => {
    mock.onGet('/invoices/1/redemptions').reply(200, listResponseXml);
    mock.onGet('/invoices/1/redemptions?per_page=50').reply(200, listResponseXml);

    return Promise.all([
      expect(redemptionApi.listByInvoice('1')).to.be.fulfilled,
      expect(redemptionApi.listByInvoice('1', {per_page: 50})).to.be.fulfilled
    ]);
  });

  it('Should call List Subscription\'s Coupon Redemptions API', () => {
    mock.onGet('/subscriptions/376e95a50fd77b5da9a727411bab7c54/redemptions').reply(200, listResponseXml);
    mock.onGet('/subscriptions/376e95a50fd77b5da9a727411bab7c54/redemptions?per_page=50').reply(200, listResponseXml);

    return Promise.all([
      expect(redemptionApi.listBySubscription('376e95a50fd77b5da9a727411bab7c54')).to.be.fulfilled,
      expect(redemptionApi.listBySubscription('376e95a50fd77b5da9a727411bab7c54', {per_page: 50})).to.be.fulfilled
    ]);
  });

  it('Should call Redeem Coupon on Account API', () => {
    mock.onPost('/coupons/special/redeem').reply(201, singleResponseXml);

    const postBody = {
      redemption: {
        account_code: '1',
        currency: 'USD'
      }
    };

    return expect(redemptionApi.redeem('special', postBody)).to.be.fulfilled;
  });

  it('Should call Remove Coupon Redemption from Account API', () => {
    mock.onDelete('/accounts/1/redemptions').reply(204);
    mock.onDelete('/accounts/1/redemptions/376e95a50fd77b5da9a727411bab7c54').reply(204);

    return Promise.all([
      expect(redemptionApi.remove('1')).to.be.fulfilled,
      expect(redemptionApi.remove('1', '376e95a50fd77b5da9a727411bab7c54')).to.be.fulfilled
    ]);
  });

});
