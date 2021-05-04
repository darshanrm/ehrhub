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

models.allergies = require('./allergies')(sequelize, Sequelize);
models.genetic_diseases = require('./genetic_diseases')(sequelize, Sequelize);
models.immunizations = require('./immunizations')(sequelize, Sequelize);
models.major_diseases = require('./major_diseases')(sequelize, Sequelize);
models.major_medications = require('./major_medications')(sequelize, Sequelize);
models.side_effects = require('./side_effects')(sequelize, Sequelize);


Object.keys(models).forEach((modelName) => {
  if('associate' in models[modelName]){
    models[modelName].associate(models);
  }
})

module.exports = models;