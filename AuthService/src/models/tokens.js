module.exports = (sequelize, DataTypes) => {
    const tokens = sequelize.define('tokens', {
        userId: DataTypes.INTEGER,
        refreshToken: DataTypes.TEXT,
        expiry: DataTypes.DATE,
        createdByIp: DataTypes.STRING,
    })
    return tokens;
  };