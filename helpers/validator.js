const validator = require("validator");

module.exports.validateUserBody = function(user) {
  if (validator.isEmpty(user.email)) {
    return "Email is required";
  } else if (!validator.isEmail(user.email)) {
    return "Invalid email address";
  } else if (validator.isEmpty(user.givenName)) {
    return "Given name is required";
  } else if (user.givenName.length > 50) {
    return "Max 50 characters allowed for given name";
  } else if (validator.isEmpty(user.familyName)) {
    return "Family name is required";
  } else if (user.familyName.length > 50) {
    return "Max 50 characters allowed for family name";
  } else {
    return false;
  }
};
