const passport = require('passport');
const jwt = require('jsonwebtoken');
const { users } = require('../models/index');
require('dotenv').config()



const naverCallback = (req, res, next) => {
    passport.authenticate(
        'naver',
        { failureRedirect: '/' },
        (err, users, info) => {
            if (err) return next(err)
            console.log('콜백')
            const { userId, nickname, userImage } = users;
            const token = jwt.sign({ userId }, process.env.MY_KEY)

            result = {
                userId,
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