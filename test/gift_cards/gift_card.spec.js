'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const giftCard = require('../../lib/gift_card');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Gift Card API', () => {
  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const giftCardAPi = giftCard(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-response.xml'));

  it('Should call List Gift Cards API', () => {
    mock.onGet('/gift_cards').reply(200, listResponseXml);
    mock.onGet('/gift_cards?sort=created_at').reply(200, listResponseXml);

    return Promise.all([
      expect(giftCardAPi.list()).to.be.fulfilled,
      expect(giftCardAPi.list({sort: 'created_at'})).to.be.fulfilled
    ]);
  });

  it('Should call Preview Gift Card API', () => {
    mock.onPost('/gift_cards/preview').reply(200, singleResponseXml);

    const postBody = {
      gift_card: {
        product_code: 'gift_card',
        unit_amount_in_cents: 2000,
        currency: 'USD'
      }
    };

    return expect(giftCardAPi.preview(postBody)).to.be.fulfilled;
  });

  it('Should call Create Gift Card API', () => {
    mock.onPost('/gift_cards').reply(201, singleResponseXml);

    const postBody = {
      gift_card: {
        product_code: 'gift_card',
        unit_amount_in_cents: 2000,
        currency: 'USD'
      }
    };

    return expect(giftCardAPi.create(postBody)).to.be.fulfilled;
  });

  it('Should call Lookup Gift Card API', () => {
    mock.onGet('/gift_cards/2003020297591186183').reply(200, singleResponseXml);

    return expect(giftCardAPi.get('2003020297591186183')).to.be.fulfilled;
  });

  it('Should call Redeem Gift Card on Account API', () => {
    mock.onPost('/gift_cards/2003020297591186183/redeem').reply(200, singleResponseXml);

    const postBody = {
      recipient_account: {
        account_code: '1'
      }
    };

    return expect(giftCardAPi.redeem('2003020297591186183', postBody)).to.be.fulfilled;
  });

  it('Should call Preview Subscription with Gift Card Redemption API', () => {
    const subscriptionPreviewResponseXml = fs.readFileSync(path.join(__dirname, 'subscription-preview-response.xml'));
    mock.onPost('/subscriptions/preview').reply(200, subscriptionPreviewResponseXml);

    const postBody = {
      subscription: {
        plan_code: 'gold',
        currency: 'EUR',
        account: {
          account_code: '1',
          email: 'verena@example.com',
          first_name: 'Verena',
          last_name: 'Example',
          billing_info: {
            number: '4111-1111-1111-1111',
            month: 12,
            year: 2019
          }
        },
        coupon_code: 'subscription_special',
        gift_card: {
          redemption_code: 'JHD776JENN99E6DD'
        }
      }
    };

    return expect(giftCardAPi.previewSubscription(postBody)).to.be.fulfilled;
  });

  it('Should call Create Subscription with Gift Card Redemption API', () => {
    const subscriptionPreviewResponseXml = fs.readFileSync(path.join(__dirname, 'subscription-preview-response.xml'));
    mock.onPost('/subscriptions').reply(200, subscriptionPreviewResponseXml);

    const postBody = {
      subscription: {
        plan_code: 'gold',
        currency: 'EUR',
        account: {
          account_code: '1',
          email: 'verena@example.com',
          first_name: 'Verena',
          last_name: 'Example',
          billing_info: {
            number: '4111-1111-1111-1111',
            month: 12,
            year: 2019
          }
        },
        coupon_code: 'subscription_special',
        gift_card: {
          redemption_code: 'JHD776JENN99E6DD'
        }
      }
    };

    return expect(giftCardAPi.createSubscription(postBody)).to.be.fulfilled;
  });
});
