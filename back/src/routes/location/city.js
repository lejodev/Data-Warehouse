const express = require("express");
const citySchema = require("../../models/Schema.City");
const cityExists = require("../../utils/utils.common.queries").cityExists;

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, countryId } = req.body;
  const exists = await cityExists(name);
  console.log(exists)
  if (!exists) {
    const city = new citySchema({ name: name, countryId: countryId });
    city.save((err, doc) => {
      if (err) {
        res.status(400).json({ Error: err });
      } else {
        res.status(200).json({ Success: "City successfully added" });
      }
    });
  } else {
    res.status(400).json({ Error: "City already exists" });
  }
});

module.exports = router;
