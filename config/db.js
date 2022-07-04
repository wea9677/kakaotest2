const sequelize = require("sequelize")

const db = new sequelize('jejudo', 'root', '1q2w3e4r!', {
        host : "localhost",
        port : 3306,
        dialect: "mysql"
});

db.sync({});

module.exports = db;