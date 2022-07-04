const sequelize = require("sequelize")

const db = new sequelize('jejudo', 'root', '1q2w3e4r!', {
        host : "127.0.0.1",
        dialect: "mysql"
});

db.sync({});

module.exports = db;