module.exports = (sequelize, DataTypes) => {
  const visit_uploaded_docs = sequelize.define("visit_uploaded_docs", {
    patient_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    document_data: DataTypes.BLOB("long"),
    document_name: DataTypes.STRING,
    uploaded_by: DataTypes.INTEGER,
  });
  return visit_uploaded_docs;
};
