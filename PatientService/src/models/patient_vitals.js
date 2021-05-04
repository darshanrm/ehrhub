module.exports = (sequelize, DataTypes) => {
  const patient_vitals = sequelize.define('patient_vitals', {
    patient_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    oxygen: DataTypes.INTEGER,
    temperature: DataTypes.INTEGER,
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    bmi: DataTypes.FLOAT,
    blood_pressure: DataTypes.STRING,
    blood_group: DataTypes.STRING
  })
  
  patient_vitals.associate = (models) => {
    patient_vitals.belongsTo(models.patient_personal_details, {
      foreignKey: 'patient_id'
    })
  }

  return patient_vitals;
};