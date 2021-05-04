module.exports = (sequelize, DataTypes) => {
  const lab_visits = sequelize.define("lab_visits", {
    patient_id: DataTypes.INTEGER,
    hcp_id: DataTypes.INTEGER,
  });
  return lab_visits;
};
