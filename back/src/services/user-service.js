const sequelize = require("../config/sequelize-connection");
const login = async (userName, password) => {
  return sequelize.query(
    "select name, password from user where name = :userName and password = :password",
    {
      replacements: {
        userName: userName,
        password: password,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );
};

const signUp = async (registrationObj) => {
  return await sequelize.query(
    "INSERT INTO user(name, lastName, email, profile, password) VALUES(:name, :lastName, :email, :profile, :password)",
    {
      type: sequelize.QueryTypes,
      replacements: {
        name: registrationObj._name,
        lastName: registrationObj.lastName,
        email: registrationObj.email,
        profile: registrationObj.profile,
        password: registrationObj.password,
      },
    }
  );
  // .then(() => {
  //   console.log("WELL");
  //   return true;
  // })
  // .catch((err) => {
  //   console.log("BAD");
  //   return false;
  // });
};
module.exports = {
  login,
  signUp,
};
