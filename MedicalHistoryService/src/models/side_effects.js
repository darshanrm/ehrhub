module.exports = (sequelize, DataTypes) => {
  const side_effects = sequelize.define('side_effects', {
    patient_id: DataTypes.INTEGER,
    medication_id: DataTypes.INTEGER,
    medicine_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  })

  return side_effects;
}