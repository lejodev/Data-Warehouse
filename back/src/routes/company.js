const express = require("express");
const router = express.Router();
const companySquema = require("../models/Schema.Company");
const companyExists = require("../utils/utils.common.queries").companyExists;

router.get("/", async (req, res) => {
  const rawCompanies = await companySquema
    .find()
    .limit(10)
    .populate("city")
    .then((companies) => {
      const resp = companies.map((rawCompany) => {
        console.log(rawCompany);
        return {
          id: rawCompany._id,
          name: rawCompany.name,
          city: rawCompany.city.name,
          address: rawCompany.address,
          phone: rawCompany.phone,
          email: rawCompany.email,
        };
      });
      res.status(200).json(resp);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ Error: err });
    });
});

router.post("/:cityId", async (req, res) => {
  const { name, address, email, phone } = req.body;
  const cityId = req.params.cityId;
  const exists = await companyExists(name);
  console.log(exists);
  if (!exists) {
    const company = new companySquema({
      name: name,
      address: address,
      email: email,
      phone: phone,
      city: cityId,
    });

    company.save((err, doc) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json({ Success: "Company successfully added" });
      }
    });
  } else {
    res.status(400).json({ Message: "Comapny elready exists" });
  }
});

router.patch("/:companyId", async (req, res) => {
  const id = req.params.companyId;
  const update = req.body;
  await companySquema
    .findByIdAndUpdate(id, update)
    .then((resp) => {
      res.status(200).json({ Success: "Company successfully updated" });
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});

router.delete("/:companyId", async (req, res) => {
  const id = req.params.companyId;
  await companySquema
    .findByIdAndDelete(id)
    .then((_) => {
      res.status(200).json({ Success: "Company successfully deleted" });
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});
module.exports = router;
