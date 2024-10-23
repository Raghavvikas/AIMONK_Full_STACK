// models/tree.js
module.exports = (sequelize, DataTypes) => {
    const Tree = sequelize.define('Tree', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
    });
    return Tree;
};
