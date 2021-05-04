module.exports = (sequelize, DataTypes) => {
  const medications = sequelize.define("medications", {
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    hcp_id: DataTypes.INTEGER,
  });
  return medications;
};
