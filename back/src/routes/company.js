const express = require("express");
const router = express.Router();
const companySquema = require("../models/Schema.Company");
const comapnyExists = require("../utils/utils.common.queries").companyExists;

router.get("/", async (req, res) => {
  const rawCompanies = await companySquema.find().limit(10).populate("city");

  const resp = rawCompanies.map((rawCompany) => {
    return {
      name: rawCompany.name,
      city: rawCompany.city.name,
    };
  });
  console.log(resp);
});

router.post("/:cityId", async (req, res) => {
  const { name, address, email, phone } = req.body;
  const cityId = req.params.cityId;
  const exists = await comapnyExists(name);
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

module.exports = router;
