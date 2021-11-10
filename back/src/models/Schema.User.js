const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  profile: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
