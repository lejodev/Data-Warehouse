const express = require("express");
const jwt = require("jsonwebtoken");
const locationService = require("../models/location");

const router = express.Router();
router.use(express.json());

router.get("/region", (req, res) => {
  locationService
    .getAllRegions()
    .then((resp) => {
      console.log(resp);
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

router.get("/all", (req, res) => {
  const query = locationService.composeQuery();
  query
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/region", (req, res) => {
  const region = req.body.region;
  console.log(req.body);
  const dbRequest = locationService.createRegion(region);
  dbRequest
    .then((result) => {
      const lastId = result[0].lastId;
      console.log("result", lastId);
      res.status(200).json({ lastId: lastId });
    })
    .catch((err) => {
      console.log(err);
      // let errMessage = err.errors[0].message;
      res.status(400).send("Error while creating region" + errMessage);
    });
});

router.delete("/region/:id", (req, res) => {
  const id = req.params.id;
  const request = locationService.deleteRegion(id);
  request.then(() => {
    res.status(200).send("Region deleted successfully");
  }).catch(err => {
    res.send("Error")
  })
});

router.get("/country/:regionId", async (req, res) => {
  const regionId = req.params.regionId;
  const dbRequest = locationService.getCountries(regionId);
  dbRequest.then((resp) => {
    if (resp.length > 0) {
      console.log(resp);
      res.status(200).json(resp);
    } else {
      res.status(204).json({ message: "Empty response" });
    }
  });
});

router.post("/country", (req, res) => {
  const requestBody = req.body;
  console.log(req.body);
  if (requestBody.name && requestBody.regionid) {
    if (requestBody.name !== "" && requestBody.regionid !== "") {
      const createCountry = locationService.createCountry(req.body);
      createCountry
        .then((result) => {
          console.log("result", result);
          const lastId = result[0];
          res.status(200).json(lastId);
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .send(`Error while creating your country ${err.errors[0].message}`);
        });
    }
  } else {
    res.status(400).send("Failed due to invalid syntax");
  }
});

router.delete("/country/:id", (req, res) => {
  let countryId = req.params.id;
  const request = locationService.deleteCountry(countryId);
  request
    .then(() => {
      console.log("Country deleted");
      res.status(200).send("Country deleted successfully");
    })
    .catch((err) => {
      console.log("ERR: ", err);
      res.status(400).send("Error");
    });
  // res.send(`Country: ${countryId} deleted`);
});

router.put("/country", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  console.log(id);
  console.log(name);
  const request = locationService.modifyCountry(id, name);
  request
    .then(() => {
      res.status(200).send("Country modified successfullly");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Error while modifying country");
    });
});

router.get("/city/:countryId", (req, res) => {
  const countryId = req.params.countryId;
  locationService.getCities(countryId).then((resp) => {
    if (resp.length > 0) {
      console.log("RESP========================", resp);
      res.status(200).json(resp);
    } else {
      res.status(204).json({ message: "Empty response" });
    }
  });
});

router.post("/city", (req, res) => {
  const requestBody = req.body;
  if (requestBody.name && requestBody.countryId) {
    if (requestBody.name !== "" && requestBody.countryId !== "") {
      const createCity = locationService.createCity(req.body);
      createCity
        .then((result) => {
          const lastId = result[0];
          res.status(200).json(lastId);
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .send(`Error while creating your city ${err.errors[0].message}`);
        });
    }
  } else {
    res.status(400).send("Failed due to invalid syntax");
  }
});

router.put("/city", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  console.log(id);
  console.log(name);
  const request = locationService.modifyCity(id, name);
  request
    .then(() => {
      res.status(200).send("City modified successfullly");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Error while modifying city");
    });
});

router.delete("/city/:id", (req, res) => {
  let cityId = req.params.id;
  const request = locationService.deleteCity(cityId);
  request
    .then(() => {
      console.log("City deleted");
      res.status(200).send("City deleted successfully");
    })
    .catch((err) => {
      console.log("ERR: ", err);
      res.status(400).send("Error");
    });
});

module.exports = router;
