const passport = require('passport');
const jwt = require('jsonwebtoken');
const { users, sequelize, Sequelize } = require("../models");
require('dotenv').config()



const naverCallback = (req, res, next) => {
    passport.authenticate(
        'naver',
        { failureRedirect: '/' },
        (err, user, info) => {
            if (err) return next(err)
            console.log('콜백')
            const { userId, nickname, userImage } = users;
            const token = jwt.sign({ userId }, process.env.MY_KEY)

            result = {
                token,
                nickname,
                userImage
            }
            console.log('네이버 콜백 함수 결과', result)
            res.send({ users: result })
        }
    )(req, res, next)
}


module.exports = {
    naverCallback
}