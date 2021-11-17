const mongoose = require("mongoose");

const RegionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Region", RegionSchema);
