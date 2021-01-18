const connectionParams = require('./connection-parameters');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(connectionParams.db_conf_dbName,
    connectionParams.db_conf_user,
    connectionParams.db_conf_password,
    {
        host: connectionParams.db_conf_host,
        dialect: 'mysql',
        port: connectionParams.db_conf_port,
        dialectOptions: {
            multipleStatements: true
        }
    })

sequelize.authenticate().then(() => {
    console.log('Signed');
}).catch((err) => {
    console.log(`Database authentication error: ${err}`);
})

module.exports = sequelize;