require('dotenv').config();
const sequelize = require("sequelize")

const db = new sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_USER_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


db.sync({});

module.exports = db;