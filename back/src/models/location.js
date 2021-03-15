const sequelize = require("../config/sequelize-connection");

const getAllRegions = () => {
  return sequelize.query("select * from tbl_region", {
    type: sequelize.QueryTypes.SELECT,
  });
};

const createRegion = async (region) => {
  await sequelize.query("insert into tbl_region (name) values (:region)", {
    type: sequelize.QueryTypes.INSERT,
    replacements: {
      region: region,
    },
  });
  const lastId = await sequelize.query(
    "SELECT MAX (id) as lastId from tbl_region",
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );

  return lastId;
};

const deleteRegion = function(id) {
  return sequelize.query("DELETE FROM tbl_region WHERE id = :id", {
    replacements: {
      id: id,
    },
    type: sequelize.QueryTypes.DELETE,
  });
};

const createCountry = async (requestBody) => {
  await sequelize.query(
    "insert into tbl_country (name, regionid) values (:name, :regionid)",
    {
      type: sequelize.QueryTypes.INSERT,
      replacements: {
        name: requestBody.name,
        regionid: requestBody.regionid,
      },
    }
  );

  console.log("req body", requestBody);

  const lastId = await sequelize.query(
    "select max(id) as lastId from tbl_country tc where regionid = :id",
    {
      replacements: {
        id: requestBody.regionid,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  console.log("LastId", lastId);

  return lastId;
};

const deleteCountry = (id) => {
  return sequelize.query("delete from tbl_country where id = :id", {
    replacements: {
      id: id,
    },
    type: sequelize.QueryTypes.DELETE,
  });
};

const getCountries = async (id) => {
  return await sequelize.query(
    "select * from tbl_country tc where regionid = :id",
    {
      replacements: {
        id: id,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );
};

const modifyCountry = (id, newValue) => {
  return sequelize.query(
    "update tbl_country set name = :newValue where id = :id",
    {
      type: sequelize.QueryTypes.UPDATE,
      replacements: {
        id: id,
        newValue: newValue,
      },
    }
  );
};

const getCities = (id) => {
  return sequelize.query("select * from tbl_city where countryid = :id", {
    replacements: {
      id: id,
    },
    type: sequelize.QueryTypes.SELECT,
  });
};

const createCity = async (requestBody) => {
  await sequelize.query(
    "insert into tbl_city (name, countryid) values (:name, :countryid)",
    {
      type: sequelize.QueryTypes.INSERT,
      replacements: {
        name: requestBody.name,
        countryid: requestBody.countryId,
      },
    }
  );
  console.log("requestBody", requestBody);
  const lastId = await sequelize.query(
    "select max(id) as lastId from tbl_city where countryId = :countryId",
    {
      replacements: {
        countryId: requestBody.countryId,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return lastId;
};

const deleteCity = (id) => {
  return sequelize.query("delete from tbl_city where id = :id", {
    replacements: {
      id: id,
    },
    type: sequelize.QueryTypes.DELETE,
  });
};

const modifyCity = (id, newValue) => {
  return sequelize.query(
    "update tbl_city set name = :newValue where id = :id",
    {
      type: sequelize.QueryTypes.UPDATE,
      replacements: {
        id: id,
        newValue: newValue,
      },
    }
  );
};

const composeQuery = () => {
  return sequelize.query(
    "select tbl_region.name as region, tbl_region.id as regionId, tbl_country.name as country, tbl_country.id as countryId, tbl_city.name as city, tbl_city.id as cityId from tbl_region left join tbl_country on tbl_region.id = tbl_country.regionid left join tbl_city on tbl_country.id = tbl_city.countryid",
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
};

module.exports = {
  getAllRegions,
  createRegion,
  deleteRegion,
  getCountries,
  createCountry,
  deleteCountry,
  modifyCountry,
  getCities,
  createCity,
  deleteCity,
  modifyCity,
  composeQuery,
};
