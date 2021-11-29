const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  Email: {
    type: String,
  },
  phone: {
    type: String,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
});

module.exports = mongoose.model("Company", CompanySchema);
