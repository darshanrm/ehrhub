module.exports = (sequelize, DataTypes) => {
  const prescribed_medicines = sequelize.define("prescribed_medicines", {
    prescription_id: DataTypes.INTEGER,
    medicine_id: DataTypes.INTEGER,
    medicine_name: DataTypes.TEXT,
    morning_count: DataTypes.INTEGER,
    afternoon_count: DataTypes.INTEGER,
    evening_count: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    no_of_days: DataTypes.INTEGER,
    note: DataTypes.TEXT,
  });
  return prescribed_medicines;
};
