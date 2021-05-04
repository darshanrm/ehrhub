module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      full_name: DataTypes.STRING,
      role: { 
        type: DataTypes.STRING,
        defaultValue: 'patient'
      },
      isOnline: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    })
    return users;
  };