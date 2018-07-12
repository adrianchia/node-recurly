'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const coupon = require('../../lib/coupon');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Coupons API', () => {

  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const couponApi = coupon(API);

  const listCouponsResponseXml = fs.readFileSync(path.join(__dirname, 'list-coupon-response.xml'));
  const singleCouponResponseXml = fs.readFileSync(path.join(__dirname, 'single-coupon-response.xml'));

  it('should call List Coupons API', () => {
    mock.onGet('/coupons').reply(200, listCouponsResponseXml);
    mock.onGet('/coupons?sort=created_at').reply(200, listCouponsResponseXml);

    return Promise.all([
      expect(couponApi.list()).to.be.fulfilled,
      expect(couponApi.list({sort: 'created-at'})).to.be.fulfilled
    ]);
  });

  it('Should call Create Coupon API', () => {
    mock.onPost('/coupons').reply(201, singleCouponResponseXml);

    const postBody = {
      coupon: {
        coupon_code: 'special',
        name: 'Special $2 off coupon'
      }
    };

    return expect(couponApi.create(postBody)).to.be.fulfilled;

  });

  it('Should call Lookup Coupon API', () => {
    mock.onGet('/coupons/special').reply(200, singleCouponResponseXml);

    return expect(couponApi.get('special')).to.be.fulfilled;
  });

  it('Should call Generate Unique Codes API', () => {
    mock.onPost('/coupons/special/generate').reply(201);

    const postBody = {
      coupon: {
        number_of_unique_codes: 200
      }
    };

    return expect(couponApi.generateUniqueCodes('special', postBody)).to.be.fulfilled;
  });

  it('Should call Expire Coupon API', () => {
    mock.onDelete('/coupons/special').reply(204);

    return expect(couponApi.expire('special')).to.be.fulfilled;
  });

  it('Should call Edit Coupon API', () => {
    mock.onPut('/coupons/special').reply(200, singleCouponResponseXml);

    const postBody = {
      coupon: {
        name: 'Special $2 off coupon'
      }
    };

    return expect(couponApi.update('special', postBody)).to.be.fulfilled;
  });

  it('Should call Restore Coupon API', () => {
    mock.onPut('/coupons/special/restore').reply(200, singleCouponResponseXml);

    const postBody = {
      coupon: {
        name: 'Special $2 off coupon'
      }
    };

    return expect(couponApi.restore('special', postBody)).to.be.fulfilled;
  });

  it('Should call List Unique Coupon Codes API', () => {
    const responseXml = fs.readFileSync(path.join(__dirname, 'list-unique-coupon-response.xml'));
    mock.onGet('/coupons/special/unique_coupon_codes').reply(200, responseXml);
    mock.onGet('/coupons/special/unique_coupon_codes?sort=created_at').reply(200, responseXml);

    return Promise.all([
      expect(couponApi.listUniqueCodes('special')).to.be.fulfilled,
      expect(couponApi.listUniqueCodes('special', {sort: 'created_at'})).to.be.fulfilled
    ]);
  });

});
