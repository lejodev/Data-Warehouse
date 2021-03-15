const sequelize = require("../config/sequelize-connection");

const getAllCompanies = () => {
  return sequelize.query("select * from tbl_company", {
    type: sequelize.QueryTypes.SELECT,
  });
};

const createCompany = async (requestBody) => {
  return await sequelize.query(
    "insert into tbl_company (name, address, email, phone, city) values (:name, :address, :email, :phone, :city)",
    {
      replacements: {
        name: requestBody.name,
        address: requestBody.address,
        email: requestBody.email,
        phone: requestBody.phone,
        city: requestBody.city,
      },
      type: sequelize.QueryTypes.INSERT,
    }
  );
};

const modifyCompany = (requestBody, id) => {
  return sequelize.query(
    `update tbl_company set name = :name, address = :address, email = :email, phone = :phone where id = ${id}`,
    {
      replacements: {
        name: requestBody.name,
        address: requestBody.address,
        email: requestBody.email,
        phone: requestBody.phone,
      },
      type: sequelize.QueryTypes.UPDATE,
    }
  );
};

const deleteCity = (id) => {
  return sequelize.query("delete from tbl_company where id = :id", {
    replacements: {
      id: id,
    },
    type: sequelize.QueryTypes.DELETE,
  });
};

module.exports = {
  getAllCompanies,
  createCompany,
  modifyCompany,
  deleteCity
};
