const express = require("express");
const loginService = require("../services/login-service");
const jwt = require("jsonwebtoken");
const JWTSecret = process.env.JWT_SECRET;

require("dotenv").config();

const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.post("/login", async (req, res) => {
  console.log(req.body);
  const userName = req.body.userName;
  const password = req.body.password;
  console.log(userName);
  console.log(password);
  let login = await loginService.login(userName, password);
  if (login.length > 0) {
      login = login[0];
    console.log("IN");
    console.log(login);
    const token = jwt.sign(login, JWTSecret);
    console.log(token);
    res.status(200).send(token);
  } else {
    console.log("Not registered");
    res.status(404).send("Promise.reject(new Error('User doesn´t exists'))");
  }
});

module.exports = router;