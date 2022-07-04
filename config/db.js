const sequelize = require("sequelize")

const db = new sequelize('jejudo', 'root', '1q2w3e4r!', {
        host : "13.125.112.232",
        dialect: "mysql"
});

db.sync({});

module.exports = db;