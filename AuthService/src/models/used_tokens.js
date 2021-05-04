module.exports = (sequelize, DataTypes) => {
    const used_tokens = sequelize.define('used_tokens', {
        tokenId: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
        userIp: DataTypes.STRING,
        userBan: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
    })

    return used_tokens;
}