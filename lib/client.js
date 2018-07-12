const axios = require('axios');
const xml2js = require('xml2js');
const parser = xml2js.Parser({
  explicitArray: false
});
const builder = new xml2js.Builder();

function createInstance(subdomain, apiKey) {
  const baseUrl = 'https://' + subdomain + '.recurly.com/v2';
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      'X-Api-Version': '2.13',
      'Accept': 'application/xml',
      'Content-Type': 'application/xml; charset=utf-8',
    },
    auth: {
      username: apiKey,
      password: ''
    },
    responseType: 'text',
    transformRequest: [
      /* eslint-disable no-unused-vars */
      function(data, headers) {
        var xml = data ? builder.buildObject(data) : null;
        return xml;
      }
  ],
    transformResponse: [function(data) {
      if (data) {
        var x = null;
        parser.parseString(data, (err, result) => {
          if (err) {
            throw err;
          }

          x = result;
        });
        return x;
      }
    }]
  });

  return instance;
}

module.exports.createInstance = createInstance;
