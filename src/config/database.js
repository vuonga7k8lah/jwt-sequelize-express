const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectOptions: {
            connectTimeout: 100000,
        },
        logging: function (str) {
            console.log(str);
        },
        pool: {
            max: 25,
            min: 0,
            idle: 10000,
        },
    }
);

// Sử dụng async/await để đồng bộ hóa cơ sở dữ liệu
const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        // Đồng bộ hóa cơ sở dữ liệu (xóa và tạo lại bảng nếu có { force: true })
        await sequelize.sync();
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
};

connectDatabase();

module.exports = sequelize;
