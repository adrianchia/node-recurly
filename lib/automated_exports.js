'use strict';
function automatedExport(api) {
  const automatedExportApi = {
    list: listExportDates,
    listDateExportFiles: listDateExportFiles,
    get: downloadExportFile
  };

  /**
   * List Export Dates
   */
  function listExportDates() {
    return api.get('/export_dates');
  }

  /**
   * List Date's Export Files
   * @param {string} date The date [yyyy-mm-dd] the export file was generated.
   */
  function listDateExportFiles(date) {
    return api.get('/export_dates/' + encodeURI(date) + '/export_files');
  }

  /**
   * Download Export File
   *
   * This endpoints returns a temporary URL where you can download the requested export file for the indicated date.
   * Automated Exports must first be configured with Recurly support before data is available through this endpoint.
   *
   * @param {string} date The date [yyyy-mm-dd] of the export file was generated.
   * @param {string} fileName The name of the export file.
   */
  function downloadExportFile(date, fileName) {
    return api.get('/export_dates/' + encodeURIComponent(date) + '/export_files/' + encodeURIComponent(fileName));
  }

  return automatedExportApi;
}

module.exports = automatedExport;
