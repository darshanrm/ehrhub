module.exports = (sequelize, DataTypes) => {
  const major_medications = sequelize.define('major_medications', {
    patient_id: DataTypes.INTEGER,
    medicine_id: DataTypes.INTEGER,
    since_when: DataTypes.DATE,
    till: DataTypes.DATE,
    dosage: DataTypes.STRING,
    side_effects: DataTypes.TEXT
  })

  return major_medications;
};