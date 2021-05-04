module.exports = (sequelize, DataTypes) => {
  const doctor_personal_details = sequelize.define('doctor_personal_details', {
    user_id: DataTypes.INTEGER,
    doctor_name: DataTypes.STRING,
    line1: DataTypes.TEXT,
    line2: DataTypes.TEXT,
    line3: DataTypes.TEXT,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    pin_code: DataTypes.INTEGER,
    contact_no: DataTypes.INTEGER
  })
 
  return doctor_personal_details;
};