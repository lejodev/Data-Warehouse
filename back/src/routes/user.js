const express = require("express");
const jwt = require("jsonwebtoken");
const JWTSecret = process.env.JWT_SECRET;
const mongoose = require("mongoose");
const userSchema = require("../models/Schema.User");

require("dotenv").config();

const router = express.Router();
router.use(express.json());

router.post("/signUp", (req, res) => {
  const { userName, lastName, email, profile, password } = req.body;

  var signUpDoc = new userSchema({
    userName,
    lastName,
    email,
    profile,
    password,
  });

  console.log(signUpDoc)

  signUpDoc.save((err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log(doc);
    }
  });
  res.send("CORRECT");
});

module.exports = router;
