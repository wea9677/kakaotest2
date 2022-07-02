const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User, sequelize, Sequelize } = require("../models");
require('dotenv').config()



const naverCallback = (req, res, next) => {
    passport.authenticate(
        'naver',
        { failureRedirect: '/' },
        (err, user, info) => {
            if (err) return next(err)
            console.log('콜백')
            const { snsId, nickname, userImage } = user
            const token = jwt.sign({ snsId }, process.env.MY_KEY)

            result = {
                token,
                snsId,
                nickname,
                userImage
            }
            console.log('네이버 콜백 함수 결과', result)
            res.send({ user: result })
        }
    )(req, res, next)
}


module.exports = {
    naverCallback
}