const userSchema = require("../models/Schema.User");
const regionSchema = require("../models/Schema.Region");

async function userExists(userName) {
  var request = await userSchema.find({ userName: userName });
  return request.length > 0;
}

async function regionExists(region) {
  var request = await regionSchema.find({ name: region });
  console.log(request, "=============");
}

module.exports = { userExists, regionExists };
