module.exports = (sequelize, DataTypes) => {
  const user_uploaded_docs = sequelize.define("user_uploaded_docs", {
    patient_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    document_data: DataTypes.BLOB("long"),
    document_name: DataTypes.STRING,
  });
  return user_uploaded_docs;
};
