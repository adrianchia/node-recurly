'use strict';
const expect = require('chai').expect;
const Recurly = require('../');

describe('Recurly initialization', () => {

  it('should throw error when no config is passed', () => {
    expect(Recurly).to.throw();
  });

  it('should throw error when no config is passed', () => {
    expect(() => new Recurly({})).to.throw();
  });

  it('should throw error when no api key is passed', () => {
    expect(() => new Recurly({subdomain: 'test'})).to.throw();
  });

  it('should throw error when no subdomain is passed', () => {
    expect(() => new Recurly({apiKey: 'test'})).to.throw();
  });

  it('initialize successfully', () => {
    expect(() => new Recurly({apiKey: 'myApiKey', subdomain: 'mySubdomain'})).to.not.throw();
  });

});
