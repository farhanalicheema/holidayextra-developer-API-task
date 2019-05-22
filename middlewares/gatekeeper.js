const auth = require("basic-auth");
let config = require("../configs/config");

module.exports.authenticate = function(req, res, next) {
  let user = auth(req);
  if (
    user &&
    user.name === config.authorizedUsername &&
    user.pass === config.authorizedPassword
  ) {
    next();
  } else {
    res.statusCode = 401;
    res.setHeader("response-description", "Invalid Username or Password");
    res.end();
  }
};
