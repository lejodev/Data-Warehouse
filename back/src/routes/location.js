const express = require("express");
const regionsSchema = require("../models/Schema.Region");
const router = express.Router();
const regionExists = require("../utils/utils.common.queries").regionExists;

router.post("/region", async (req, res) => {
  const { name } = req.body;
  const region = new regionsSchema({
    name: name,
  });
  // Previously check if region already exists
  regionExists(name);
  region.save((err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log(doc);
    }
  });
});

module.exports = router;
