require('dotenv').config()
const express = require('express');
const { users, sequelize, Sequelize } = require("../models");
const router = express.Router()
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth-middleware');
const userController = require('../controller/userController');



//카카오 로그인
router.get('/kakao', passport.authenticate('kakao'))

const kakaoCallback = (req, res, next) => {
    passport.authenticate(
        'kakao',
        { failureRedirect: '/' },
        (err, users, info) => {
            if (err) return next(err)
            //----------------------------------------------------------------
            console.log('콜백')
            const { userId, nickname, userImage } = users;
            const token = jwt.sign({ userId }, process.env.MY_KEY)

            result = {
                userId,
                token,
                nickname,
                userImage
            }
            console.log('카카오 콜백 함수 결과', result)
            res.send({ users: result })
        }
    )(req, res, next)
}

router.get('/kakao/callback', kakaoCallback)

// 구글 로그인

router.get('/google', passport.authenticate('google', {scope: ['profile'],})) 
 // access_Type: 'offline',
        // approval_Prompt: 'force',
const googleCallback = (req, res, next) => {
    passport.authenticate(
        'google',
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
            console.log('구글 콜백 함수 결과', result)
            res.send({ users: result })
        }
    )(req, res, next)
}

router.get('/google/callback', googleCallback)

// 네이버 로그인

//* 네이버로 로그인하기 라우터 


router.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }))
router.get('/naver/callback', userController.naverCallback)




//사용자인증
router.get("/user/login/me", authMiddleware, async (req, res) => { 

    
    const{ users } =  res.locals;
    
    
    res.send({ token: users.token, userId: users.userId, nickName : users.nickName, userImg:users.userImg });
    
   });


module.exports = router