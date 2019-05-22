module.exports.randomIdOfLength10 = function() {
  let randomString = require("random-string");
  return randomString({ length: 10 });
};
