const express = require("express");
const bodyParser = require("body-parser");
const expressJWT = require("express-jwt");
const user = require("./controllers/user.controller");
const location = require("./controllers/location.controller");
const company = require("./controllers/company.controller");

require("dotenv").config();

const app = express();

const JWTSecret = process.env.JWT_SECRET;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// app.use(expressJWT({secret: JWTSecret, algorithms: ['HS256']}).unless({path: ['/user']}));

app.use("/user", user);
app.use("/location", location);
app.use("/company", company);
const PORT = process.env.PORT || 3080;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
