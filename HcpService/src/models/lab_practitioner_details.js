module.exports = (sequelize, DataTypes) => {
  const lab_practitioner_details = sequelize.define('lab_practitioner_details', {
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
  
  return lab_practitioner_details;
};