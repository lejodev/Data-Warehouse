const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  occupation: {
    type: String,
  },
  email: {
    type: String,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
  address: {
    type: String,
  },
  interest: {
    type: Number,
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
