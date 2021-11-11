const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = require("../models/Schema.User");
var { userExists } = require("../utils/utils.common.queries");
const JWTSecret = process.env.JWT_SECRET;

require("dotenv").config();

const router = express.Router();
router.use(express.json());

router.post("/signUp", async (req, res) => {
  let { userName, lastName, email, profile, password } = req.body;

  const user = await userExists(userName);
  password = await bcrypt.hash(password, 10);

  if (!user) {
    var signUpDoc = new userSchema({
      userName,
      lastName,
      email,
      profile,
      password,
    });

    signUpDoc.save((err, doc) => {
      if (err) {
        res.status(400).json({ Error: "Error saving data" });
      } else {
        res.status(200).json({ "Success!": "User created successfully" });
      }
    });
  } else {
    res.status(409).json({ Conflict: "User already exists" });
  }
});

router.post("/signIn", async (req, res) => {
  const { userName, password } = req.body;
  const user = await userExists(userName);
  if (user) {
    const userInfo = await userSchema.findOne({ userName });
    console.log(userInfo.password);
  } else {
    res.status(400).json({ Message: "User does not exist" });
  }
});

module.exports = router;
