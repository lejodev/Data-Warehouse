const express = require("express");
const bodyParser = require("body-parser");
const expressJWT = require("express-jwt");
const user = require("./controllers/user");
const indexRouter = require("./controllers/index");


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


app.use("/", indexRouter);
app.use("/user", user);

const PORT = process.env.PORT || 3080;

let counter = 0;
app.listen(PORT, () => {
  counter++;
  console.log(`Listening on ${PORT} ${counter}`);
});
