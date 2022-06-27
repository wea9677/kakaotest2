require('dotenv').config()
const express = require('express')
const User = require('../schemas/user')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')




router.get('/kakao', passport.authenticate('kakao'))

const kakaoCallback = (req, res, next) => {
    passport.authenticate(
        'kakao',
        { failureRedirect: '/' },
        (err, user, info) => {
            if (err) return next(err)
            console.log('콜백~~~')
            const { userId, nickName, userImg } = user;
            const token = jwt.sign({ userId }, process.env.MY_KEY)

            result = {
                token,
                userId,
                nickName,
                userImg
            }
            console.log('카카오 콜백 함수 결과', result)
            res.send({ user: result })
        }
    )(req, res, next)
}

router.get('/kakao/callback', kakaoCallback)




module.exports = router