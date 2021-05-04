module.exports = (sequelize, DataTypes) => {
  const pharmacist_details = sequelize.define('pharmacist_details', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    line1: DataTypes.TEXT,
    line2: DataTypes.TEXT,
    line3: DataTypes.TEXT,
    contact_no: DataTypes.INTEGER,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    pin_code: DataTypes.INTEGER
  })
  
  return pharmacist_details;
};