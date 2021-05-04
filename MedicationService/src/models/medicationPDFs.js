module.exports = (sequelize, DataTypes) => {
  const medication_pdf = sequelize.define("medication_pdf", {
    patient_id: DataTypes.INTEGER,
    hcp_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    medication: DataTypes.BLOB("long"),
  });
  return medication_pdf;
};
