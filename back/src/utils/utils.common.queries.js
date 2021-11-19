const userSchema = require("../models/Schema.User");
const regionSchema = require("../models/Schema.Region");
const countrySchema = require("../models/Schema.Country");
const citySchema = require("../models/Schema.City");

async function userExists(userName) {
  var request = await userSchema.find({ userName: userName });
  return request.length > 0;
}

async function regionExists(region) {
  var request = await regionSchema.find({ name: region });
  return request.length >= 1;
}

async function countryExists(country) {
  var request = await countrySchema.find({ name: country });
  return request.length >= 1;
}

async function cityExists(city) {
  var request = await citySchema.find();
  console.log(request)
  return request.length >= 1;
}

module.exports = { userExists, regionExists, countryExists, cityExists };
