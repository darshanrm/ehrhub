module.exports = (sequelize, DataTypes) => {
  const hcp_professional_details = sequelize.define('hcp_professional_details', {
    user_id: DataTypes.INTEGER,
    facility_id: DataTypes.INTEGER,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    university: DataTypes.STRING,
    degree: DataTypes.STRING,
    specialization: DataTypes.STRING,
    registration_no: DataTypes.INTEGER
  })

  hcp_professional_details.associate = (models) => {
    hcp_professional_details.belongsTo(models.facilities, {
      foreignKey: 'facility_id'
    })
  }
  
  return hcp_professional_details;
};