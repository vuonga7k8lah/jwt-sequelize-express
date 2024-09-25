const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("../models/usedModel");
const Media = sequelize.define(
    "Media",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: { tableName: "users" },
                key: "id",
            },
            allowNull: false,
            onUpdate: "cascade",
            onDelete: "cascade",
        },
        file_name: DataTypes.TEXT,
        url: DataTypes.TEXT,
        content_type: DataTypes.TEXT,
        size: DataTypes.INTEGER,
        width: DataTypes.INTEGER,
        height: DataTypes.INTEGER,
    },
    {
        underscored: true,
        timestamps: true,
        tableName: "media",
    }
);
Media.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});
module.exports = Media;
