const express = require("express");
const countrySchema = require("../../models/Schema.Country");
const countryExists = require("../../utils/utils.common.queries").countryExists;
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, regionId } = req.body;
  const country = new countrySchema({ name: name, regionId: regionId });
  const exists = await countryExists(name);

  if (!exists) {
    country.save((err, doc) => {
      if (err) {
        res.status(400).json({ Error: err });
      } else {
        res.status(200).json({ Success: "Country successfully added" });
      }
    });
  } else {
    res.status(400).json({ Error: "This country already exists" });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  countrySchema.findByIdAndUpdate(id, { name: name }, (err, doc) => {
    if (err) {
      res.status(400).json({ Eroor: err });
    } else {
      res.status(200).json({ Success: "Country updated successfully" });
    }
  });
});

// Cascade delete (pending)
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  countrySchema
    .findByIdAndDelete(id)
    .then((_) => {
      res.status(200).json({ Success: "Country sucessfully deleted" });
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});

module.exports = router;
