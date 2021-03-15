const sequelize = require("../config/sequelize-connection");

const login = (email, password) => {
  return sequelize.query(
    "select email, password from tbl_user where email = :email and password = :password",
    {
      replacements: {
        email: email,
        password: password,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  ).catch((err) => {
    console.log(err);
  });
};

const createUser = (user) => {
  console.log("===============");
  console.log(user.name);
  console.log(user);
  
  return sequelize.query(
    "INSERT INTO tbl_user(name, lastName, email, profile, password) VALUES(:name, :lastName, :email, :profile, :password)",
    {
      type: sequelize.QueryTypes,
      replacements: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        profile: user.profile,
        password: user.password,
      },
    }
  );
};

const users = [
  {"id": 1, "name": "Julian"},
  {"id": 2, "name": "Alejandro"},
  {"id": 3, "name": "Daniela"},
];

// new user model implementation
function getUsers() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

function getUserById(id) {
  const user = users.find(user => user.id == id);
  return new Promise((resolve, reject) => {
    resolve(user);
  });
}

module.exports = {
  login,
  createUser,
  getUsers,
  getUserById
};
