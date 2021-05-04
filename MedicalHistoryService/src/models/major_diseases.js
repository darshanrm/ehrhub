module.exports = (sequelize, DataTypes) => {
  const major_diseases = sequelize.define('major_diseases', {
    patient_id: DataTypes.INTEGER,
    disease_id: DataTypes.INTEGER,
    since_when: DataTypes.DATE,
    till: DataTypes.DATE,
    doctor_id: DataTypes.INTEGER,
    facility_id: DataTypes.INTEGER,
    isCured: DataTypes.BOOLEAN
  })
  
  return major_diseases;
};