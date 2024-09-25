const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("../models/usedModel");
const Token = sequelize.define(
    "Token",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true,
        },
        token: DataTypes.TEXT,
        type: DataTypes.TEXT,
        expires: DataTypes.DATE,
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
    },
    {
        underscored: true,
        timestamps: true,
        tableName: "token",
    }
);

Token.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

module.exports = Token;
