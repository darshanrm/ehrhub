module.exports = (sequelize, DataTypes) => {
  const issued_medicines = sequelize.define("issued_medicines", {
    medication_id: DataTypes.INTEGER,
    medicine_id: DataTypes.INTEGER,
    medicine_name: DataTypes.TEXT,
    total: DataTypes.INTEGER,
  });
  return issued_medicines;
};
