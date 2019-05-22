const http = require("http");
const validator = require("validator");
const config = require("../configs/config");

module.exports.makeGenericApiCall = function(data, method, path, callback) {
  const postData = JSON.stringify(data);
  const options = {
    host: config.host,
    port: config.port,
    path: path,
    method: method,
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          config.authorizedUsername + ":" + config.authorizedPassword
        ).toString("base64"),
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
      if (validator.isJSON(responseString))
        responseString = JSON.parse(responseString);
      callback(
        apiResponse.statusCode,
        apiResponse.headers["response-description"],
        responseString
      );
    });

    apiResponse.on("error", e => {
      console.error(e);
      callback(500, "Oops, Something went wrong UIERR1", null);
    });
  });

  apiRequest.write(postData);
  apiRequest.end();
};
