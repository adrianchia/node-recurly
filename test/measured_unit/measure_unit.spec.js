'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const measuredUnit = require('../../lib/measured_unit');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Measured Unit API', () => {
  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const measuredUnitApi = measuredUnit(API);

  const listResponseXml = fs.readFileSync(path.join(__dirname, 'list-response.xml'));
  const singleResponseXml = fs.readFileSync(path.join(__dirname, 'single-response.xml'));

  it('Should call List Measured Units API', () => {
    mock.onGet('/measured_units').reply(200, listResponseXml);
    return expect(measuredUnitApi.list()).to.be.fulfilled;
  });

  it('Should call Create Measured Units API', () => {
    mock.onPost('/measured_units').reply(200, singleResponseXml);

    const postBody = {
      measured_unit: {
        name: 'Streaming Bandwith',
        display_name: 'GB',
        description: 'Video steaming bandwidth measured in gigabytes'
      }
    };

    return expect(measuredUnitApi.create(postBody)).to.be.fulfilled;
  });

  it('Should call Lookup Measured Unit API', () => {
    mock.onGet('/measured_units/404351234712012650').reply(200, singleResponseXml);
    return expect(measuredUnitApi.get('404351234712012650')).to.be.fulfilled;
  });

  it('Should call Update Measured Units API', () => {
    mock.onPut('/measured_units/404351234712012650').reply(200, singleResponseXml);

    const postBody = {
      measured_unit: {
        name: 'Streaming Bandwith'
      }
    };

    return expect(measuredUnitApi.update('404351234712012650', postBody)).to.be.fulfilled;
  });

  it('Should call Delete Measured Unit API', () => {
    mock.onDelete('/measured_units/404351234712012650').reply(204);
    return expect(measuredUnitApi.delete('404351234712012650')).to.be.fulfilled;
  });
});
