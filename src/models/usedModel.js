const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true,
        },
        username: DataTypes.TEXT,
        full_name: DataTypes.TEXT,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: DataTypes.TEXT,
        role: DataTypes.TEXT,
    },
    {
        underscored: true,
        timestamps: true,
        tableName: "users",
    }
);

module.exports = User;
