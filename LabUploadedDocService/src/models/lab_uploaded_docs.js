module.exports = (sequelize, DataTypes) => {
  const lab_uploaded_docs = sequelize.define("lab_uploaded_docs", {
    visit_id: DataTypes.INTEGER,
    document_data: DataTypes.BLOB("long"),
    document_name: DataTypes.STRING,
  });
  return lab_uploaded_docs;
};
