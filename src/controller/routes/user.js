const express = require("express");
const userService = require("../services/user-service");
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
  let login = await userService.login(userName, password);
  console.log('LOGIN');
  console.log(login);
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

router.post("/", async(req, res) => {

  // Make check if input corresponds to an already registered user
  // If true, abort registration process, else continue

  const signUpRequest = userService.signUp(req.body);
  // console.log(signUpRequest);
  signUpRequest.then(() => {
    console.log('Well done');
    res.status(200).send('User created successfully');
  }).catch(err => {
    console.log('ERROR: ' + err);
  })
  // if (signUpRequest) {
  //   console.log("I´m done!");
  //   res.status(200).send("User successfully created");
  // } else {
  //   // console.log("ERROR: " + err);
  //   res.status(400).send("Bad request");
  // }
});

module.exports = router;
