const express = require("express");
const regionsSchema = require("../../models/Schema.Region");
const router = express.Router();
const regionExists = require("../../utils/utils.common.queries").regionExists;

router.get("/", async (req, res) => {
  const request = await regionsSchema
    .find()
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const region = new regionsSchema({
    name: name,
  });

  const exists = await regionExists(name);

  if (!exists) {
    region.save((err, doc) => {
      if (err) {
        res.status(400).json({ Error: err });
      } else {
        res.status(200).json({ Success: "Region added successfully" });
      }
    });
  } else {
    res.status(400).json({ Warinig: "Region already exists" });
  }
});

router.patch("/:regionId", async (req, res) => {
  const id = req.params.regionId;
  const name = req.body.name;
  regionsSchema.findByIdAndUpdate(id, { name: name }, (err, doc) => {
    if (err) {
      res.status(400).json({ Error: err });
    } else {
      res.status(200).json({ Success: "Region updated successfully" });
    }
  });
});

//Cascade delete (pending)
router.delete("/:regionId", async (req, res) => {
  const id = req.params.regionId;
  regionsSchema
    .findByIdAndDelete(id)
    .then((resp) => {
      res.status(200).json({ Success: "Region deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});

module.exports = router;
