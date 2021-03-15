const express = require("express");
const companyService = require("../models/company");

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  let respStatus = 0;
  let respMessage = {};
  try {
    const resp = await companyService.getAllCompanies();
    respStatus = 200;
    respMessage = resp;
    console.log(resp);
  } catch (error) {
    respStatus = 401;
    respMessage = resp;
    console.log("ERROR", error);
  }
  res.status(respStatus).json(respMessage);
});

router.post("/", async (req, res) => {
  const reqBody = req.body;
  var responseStatus = 0;
  let respMessage = "";
  try {
    await companyService.createCompany(reqBody);
    responseStatus = 200;
    respMessage = "Company created successfully";
  } catch (error) {
    responseStatus = 400;
    respMessage = `Error: ${error.errors[0].message}`;
  }
  res.status(responseStatus).send(respMessage);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const requestBody = req.body;
  var responseStatus = 0;
  let respMessage = "";
  try {
    const resp = await companyService.modifyCompany(requestBody, id);
    if (resp[1] > 0) {
      responseStatus = 200;
      respMessage = "company modified successfully";
    } else {
      responseStatus = 304;
    }
  } catch (error) {
    responseStatus = 400;
    respMessage = "Error while updating company";
  }
  res.status(responseStatus).send(respMessage);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  var responseStatus = 0;
  let respMessage = "";
  try {
    const request = await companyService.deleteCity(id);
    responseStatus = 200;
    respMessage = "company deleted successfully";
    console.log("req", request);
  } catch (error) {
    responseStatus = 400;
    respMessage = "Error while deleting company";
  }
  res.status(responseStatus).send(respMessage);
});

module.exports = router;
