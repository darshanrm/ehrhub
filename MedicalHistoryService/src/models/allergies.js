module.exports = (sequelize, DataTypes) => {
  const allergies = sequelize.define('allergies', {
    patient_id: DataTypes.INTEGER,
    allergic_to: DataTypes.STRING,
    severity: DataTypes.ENUM({
      values: ['mild','medium','serious'],
      defaultValue: 'mild'
    }),
    since_when: DataTypes.DATE,
    till: DataTypes.DATE,
  })

  return allergies;
};