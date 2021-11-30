const userSchema = require("../models/Schema.User");
const regionSchema = require("../models/Schema.Region");
const countrySchema = require("../models/Schema.Country");
const citySchema = require("../models/Schema.City");
const comapnySchema = require("../models/Schema.Company");
const contactSchema = require("../models/Schema.Contact");

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
  var request = await citySchema.find({ name: city });
  return request.length >= 1;
}

async function cascadeDeleteRegion(regionId) {
  const countries = await countrySchema.find({ regionId: regionId });

  try {
    await Promise.all(
      countries.map((country) => {
        deleteCity(country._id);
      })
    );
    await deleteCountry(regionId);
    await deleteRegion(regionId);
  } catch (error) {
    throw `Error while deleting region ${error}`;
  }
}

async function deleteRegion(id) {
  return await regionSchema.findByIdAndDelete(id);
}

async function deleteCountry(id) {
  return await countrySchema.deleteMany({ regionId: id });
}

async function deleteCity(id) {
  return await citySchema.deleteMany({ countryId: id });
}

async function companyExists(name) {
  const company = await comapnySchema.find({ name: name });
  return company.length >= 1;
}

async function contactExists(contactObject) {
  const contact = await contactSchema.find(contactObject);
  return contact.length >= 1;
}

module.exports = {
  userExists,
  regionExists,
  countryExists,
  cityExists,
  cascadeDeleteRegion,
  deleteRegion,
  deleteCountry,
  deleteCity,
  companyExists,
  contactExists,
};
