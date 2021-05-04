module.exports = (sequelize, DataTypes) => {
  const facilities = sequelize.define('facilities', {
    f_name: DataTypes.STRING,
    line1: DataTypes.TEXT,
    line2: DataTypes.TEXT,
    line3: DataTypes.TEXT,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    pin_code: DataTypes.INTEGER,
    contact_no: DataTypes.INTEGER,
    timing: DataTypes.STRING
  });
  
  return facilities;
};