module.exports = (sequelize, DataTypes) => {
  const patient_personal_details = sequelize.define('patient_personal_details', {
    user_id: DataTypes.INTEGER,
    full_name: DataTypes.STRING,
    gender: DataTypes.TEXT,
    line1: DataTypes.TEXT,
    line2: DataTypes.TEXT,
    line3: DataTypes.TEXT,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    pin_code: DataTypes.INTEGER,
    mobile_no: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    date_of_birth: DataTypes.DATE
  });
  
  return patient_personal_details;
};