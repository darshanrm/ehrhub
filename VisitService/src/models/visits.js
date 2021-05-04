module.exports = (sequelize, DataTypes) => {
  const visits = sequelize.define("visits", {
    patient_id: DataTypes.INTEGER,
    doctor_id: DataTypes.INTEGER,
    facility_id: DataTypes.INTEGER,
    vitals_id: DataTypes.INTEGER,
    follow_up_visit: DataTypes.INTEGER,
    summary: DataTypes.STRING,
  });
  return visits;
};
