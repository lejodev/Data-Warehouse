const express = require("express");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

// load enviroment
require('dotenv').config();
const JWTSecret = process.env.JWT_SECRET;

router.get("/", async (req, res) => {
  // Gett all users
  const users = await userModel.getUsers();
  res.status(200).send(users);
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.getUserById(userId);
  res.status(200).send(user);
});

router.post("/login", async (req, res) => {
  console.log(JWTSecret);
  const email = req.body.email;
  const password = req.body.password;
  let login = await userModel.login(email, password);
  if (login.length > 0) {
    login = login[0];
    const token = jwt.sign(login, JWTSecret);
    res.status(200).send(token);
  } else {
    res.status(404).send("Promise.reject(new Error('User doesn´t exists'))");
  }
});

router.post("/", (req, res) => {

  userModel.createUser(req.body)
    .then(() => {
      res.status(200).send({"message": "User created successfully"});
    })
    .catch((err) => {
      console.log("===ERR===");
      console.log(err.errors);
      // const errorMessage = err.errors[0].message;
      res.status(400).send(err);
    });
});

module.exports = router;
