const express = require("express");
const citySchema = require("../../models/Schema.City");
const cityExists = require("../../utils/utils.common.queries").cityExists;

const router = express.Router();

router.get("/:cityId", async (req, res) => {
  const id = req.params.cityId;
  citySchema.findById(id, (err, doc) => {
    if (err && null) {
      res.status(400).json({ Error: err });
    } else if (doc != null) {
      doc.lenght == 0
        ? res.status(404).json({ Message: "No cuntry" })
        : res.status(200).json(doc);
    } else {
      res.status(400).json({ Error: "Null response" });
    }
  });
});

router.get("/:countryId", async (req, res) => {
  const countryId = req.params.countryId;
  citySchema.find({ countryId: countryId }, (err, doc) => {
    if (err) {
      res.status(400).json({ Error: err });
    } else {
      res.status(200).json(doc);
    }
  });
});

router.post("/", async (req, res) => {
  const { name, countryId } = req.body;
  const exists = await cityExists(name);
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

router.patch("/:cityId", async (req, res) => {
  const { name } = req.body;
  const id = req.params.cityId;
  citySchema.findByIdAndUpdate(id, { name: name }, async (err, doc) => {
    if (err) {
      res.status(400).json({ Error: err });
    } else {
      res.status(200).json({ Success: "City updated successfully" });
    }
  });
});

router.delete("/:cityId", async (req, res) => {
  const id = req.params.cityId;
  citySchema
    .findByIdAndDelete(id)
    .then((resp) => {
      res.status(200).json({ Success: "City succcessfully deleted" });
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});

module.exports = router;