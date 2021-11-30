const express = require("express");
const bodyParser = require("body-parser");
const expressJWT = require("express-jwt");
const user = require("./routes/user");
const region = require("./routes/location/region");
const country = require("./routes/location/country");
const city = require("./routes/location/city");
const company = require("./routes/company");
const contact = require("./routes/contact");
const mongoose = require("mongoose");
const cors = require("cors");

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

app.use(cors());
app.use("/user", user);
app.use("/location/region", region);
app.use("/location/country", country);
app.use("/location/city", city);
app.use("/company", company);
app.use("/contact", contact);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} `);
});
