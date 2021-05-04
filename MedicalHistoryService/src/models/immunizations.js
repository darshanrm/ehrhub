module.exports = (sequelize, DataTypes) => {
  const immunizations = sequelize.define('immunizations', {
    patient_id: DataTypes.INTEGER,
    vaccine_id: DataTypes.INTEGER,
    doctor_id: DataTypes.INTEGER,
    facility_id: DataTypes.INTEGER,
    age: DataTypes.DECIMAL,
    reactions: DataTypes.TEXT,
    vaccination_date: DataTypes.DATE
  })

  return immunizations;
};