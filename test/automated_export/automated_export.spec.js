'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MockAdapter = require('axios-mock-adapter');
const autoExport = require('../../lib/automated_exports');
const client = require('../../lib/client');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Automated Export API', () => {

  const API = client.createInstance("dummy", "dummy");
  const mock = new MockAdapter(API);
  const autoExportApi = autoExport(API);

  it('Should call List Export Dates API', () => {
    const listExportDatesResponseXml = fs.readFileSync(path.join(__dirname, 'list-export-dates-response.xml'));
    mock.onGet('/export_dates').reply(200, listExportDatesResponseXml);

    return expect(autoExportApi.list()).to.be.fulfilled;
  });

  it('Should call List Date\'s Export Files API', () => {
    const listExportFilesResponseXml = fs.readFileSync(path.join(__dirname, 'list-export-files-response.xml'));
    mock.onGet('/export_dates/2016-08-01/export_files').reply(200, listExportFilesResponseXml);

    return expect(autoExportApi.listDateExportFiles('2016-08-01')).to.be.fulfilled;
  });

  it('Should call List Date\'s Export Files API', () => {
    const downloadExportFileResponseXml = fs.readFileSync(path.join(__dirname, 'download-export-file-response.xml'));
    mock.onGet('/export_dates/2016-08-01/export_files/revenue_schedules_full.csv').reply(200, downloadExportFileResponseXml);

    return expect(autoExportApi.get('2016-08-01', 'revenue_schedules_full.csv')).to.be.fulfilled;
  });

});
