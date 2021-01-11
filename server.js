const express = require("express");
const bodyParser = require("body-parser");
const expressJWT = require("express-jwt");

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

const user = require("./src/controller/routes/user");
const indexRouter = require("./src/controller/routes/index");

app.use("/", indexRouter);
app.use("/user", user);

const PORT = process.env.PORT || 3000;

let counter = 0;
app.listen(PORT, () => {
  counter++;
  console.log(`Listening on ${PORT} ${counter}`);
});
