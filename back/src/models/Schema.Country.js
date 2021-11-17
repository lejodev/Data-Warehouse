const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  regionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  },
});

module.exports = mongoose.model("Country", CountrySchema);
