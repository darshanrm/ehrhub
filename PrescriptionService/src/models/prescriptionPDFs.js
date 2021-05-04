module.exports = (sequelize, DataTypes) => {
  const prescription_pdf = sequelize.define("prescription_pdf", {
    patient_id: DataTypes.INTEGER,
    hcp_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    prescription: DataTypes.BLOB("long"),
  });
  return prescription_pdf;
};
