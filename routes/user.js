require('dotenv').config()
const express = require('express')
const User = require('../schemas/user')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')



//카카오
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

// 구글

router.get('/google', passport.authenticate('google', {scope: ['profile'],
        // access_Type: 'offline',
        // approval_Prompt: 'force',
    })
) 

const googleCallback = (req, res, next) => {
    passport.authenticate(
        'google',
        { failureRedirect: '/' },
        (err, user, info) => {
            if (err) return next(err)
            console.log('콜백~~~')
            const { userId } = user
            const token = jwt.sign({ userId }, process.env.MY_KEY)

            result = {
                token,
                userId,
                nickName,
                userImg
            }
            console.log('구글 콜백 함수 결과', result)
            res.send({ user: result })
        }
    )(req, res, next)
}

router.get('/google/callback', googleCallback)



//사용자인증
router.get("/user/login/me", authMiddleware, async (req, res) => { 

    
    const{ user } =  res.locals;
    
    
    res.send({ token: user.token, userId: user.userId, nickName : user.nickName, userImg:user.userImg });
    
   });


module.exports = router