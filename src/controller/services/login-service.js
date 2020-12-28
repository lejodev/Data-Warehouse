const sequelize = require("../../model/connection/sequelize-connection");
const login = async (userName, password) => {
  return sequelize.query(
    "select name, password from user where name = :userName and password = :password",
    {
      replacements: {
        userName: userName,
        password: password
      },
      type: sequelize.QueryTypes.SELECT
    }
  );
};

module.exports = {
  login,
};
