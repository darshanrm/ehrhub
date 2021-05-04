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

models.lab_uploaded_docs = require('./lab_uploaded_docs')(sequelize, Sequelize);
models.lab_visits = require('./lab_visits')(sequelize, Sequelize);

Object.keys(models).forEach((modelName) => {
  if('associate' in models[modelName]){
    models[modelName].associate(models);
  }
})

module.exports = models;