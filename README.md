Node Recurly
============
[![Build Status](https://travis-ci.org/adrianchia/node-recurly.svg?branch=master)](https://travis-ci.org/adrianchia/node-recurly)
[![David Dependency Status](https://david-dm.org/adrianchia/node-recurly.svg)](https://david-dm.org/adrianchia/node-recurly)
[![Known Vulnerabilities](https://snyk.io/test/github/adrianchia/node-recurly/badge.svg)](https://snyk.io/test/github/adrianchia/node-recurly)
[![codecov](https://codecov.io/gh/adrianchia/node-recurly/branch/master/graph/badge.svg)](https://codecov.io/gh/adrianchia/node-recurly)

An unofficial Node.js client for [Recurly](https://www.recurly.com).

Refer to https://dev.recurly.com/docs for more information.

## Installation

To use node recurly in your Node.js app, run the following. The Node.js environment should support basic ES2015 syntax such as const and arrow function. 

    npm install --save @adrianchia/recurly

## Getting started

Initialize recurly via 

```javascript
const Recurly = require('@adrianchia/recurly');
const recurly = new Recurly({
  apiKey: '<Your Recurly private key>',
  subdomain: '<Your recurly subdomain>' // for example, if your Recurly url is https://acme.recurly.com, enter 'acme'
});

// Do the rest of Recurly operations such as list account
recurly.accounts.list()
  .then(response => console.log(JSON.stringify(response.data)))
  .catch(err => console.error(JSON.stringify(err)));

// or create an account
let newAccount = {
  account: {
    account_code: 'foo@example.com',
    email: 'foo@example.com',
    first_name: 'Foo',
    last_name: 'Example',
    address: {
      address1: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'US'
    }
  }
};

recurly.accounts.create(newAccount)
  .then(response => console.log(JSON.stringify(response.data)))
  .catch(err => console.error(JSON.stringify(err)));
```
