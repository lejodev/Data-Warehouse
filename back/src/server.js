const express = require("express");
const bodyParser = require("body-parser");
const expressJWT = require("express-jwt");
const user = require("./routes/user");
const location = require("./routes/location");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGO_CONNECTION, (err) => {
  if (err) {
    console.log("Mongoose connection error");
  }
  console.log("Connected to database");
});

const app = express();

const JWTSecret = process.env.JWT_SECRET;

app.use(express.json());
// app.use(
//   expressJWT({ secret: JWTSecret, algorithms: ["HS256"] }).unless({
//     path: ["/user"],
//   })
// );

app.use("/user", user);
app.use("/location", location);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} `);
});
