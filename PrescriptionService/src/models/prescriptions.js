module.exports = (sequelize, DataTypes) => {
  const prescriptions = sequelize.define("prescriptions", {
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    hcp_id: DataTypes.INTEGER,
  });
  return prescriptions;
};
