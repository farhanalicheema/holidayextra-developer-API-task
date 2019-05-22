const http = require("http");
const validator = require("validator");
const config = require("../configs/config");

module.exports.makeGenericApiCall = function(req, method, path, callback) {
  const postData = JSON.stringify(req.body);
  const options = {
    host: config.host,
    port: config.port,
    path: path,
    method: method,
    headers: {
      "Authorization": "Basic " + new Buffer(config.authorizedUsername + ":" + config.authorizedPassword).toString("base64"),
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData)
    }
  };
  const apiRequest = http.request(options, apiResponse => {
    console.log(`Status Code: ${apiResponse.statusCode}`);
    console.log(`Headers: ${JSON.stringify(apiResponse.headers)}`);
    let responseString = "";
    apiResponse.setEncoding("utf8");
    apiResponse.on("data", chunk => {
      responseString += chunk;
    });
    apiResponse.on("end", () => {
      if (apiResponse.statusCode >= 200 && apiResponse.statusCode < 300) {
        if (validator.isJSON(responseString)) {
          callback(null, JSON.parse(responseString));
        } else {
          callback(null, responseString);
        }
      } else {
        callback(apiResponse.headers["response-description"], null);
      }
    });

    req.on("error", e => {
      console.error(e);
      callback("Oops, Something went wrong UIERR1", null);
    });
  });

  apiRequest.write(postData);
  apiRequest.end();
};
