const userSchema = require("../models/Schema.User");

async function userExists(userName) {
  var request = await userSchema.find({ userName: userName });
  return request.length > 0;
}

module.exports = { userExists };
