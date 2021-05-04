module.exports = (sequelize, DataTypes) => {
  const genetic_diseases = sequelize.define('genetic_diseases', {
    patient_id: DataTypes.INTEGER,
    relation: DataTypes.STRING,
    disease_id: DataTypes.INTEGER,
    since_when: DataTypes.DATE,
    till: DataTypes.DATE,
    isCured: DataTypes.BOOLEAN
  })
  
  return genetic_diseases;
};