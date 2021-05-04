const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: __dirname + '/../../.env'});

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: '+05:30'
});


const models = {};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

models.doctor_personal_details = require('./doctor_personal_details')(sequelize, Sequelize);
models.facilities = require('./facilities')(sequelize, Sequelize);
models.hcp_professional_details = require('./hcp_professional_details')(sequelize, Sequelize);
models.lab_practitioner_details = require('./lab_practitioner_details')(sequelize, Sequelize);
models.pharmacist_details = require('./pharmacist_details')(sequelize, Sequelize);

Object.keys(models).forEach((modelName) => {
  if('associate' in models[modelName]){
    models[modelName].associate(models);
  }
})

module.exports = models;