require('dotenv').config()
const express = require('express');
const { User } = require('../models/index');
const router = express.Router()
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth-middleware');
const userController = require('../controller/userController');
const { users, sequelize, Sequelize } = require("../models");


//카카오 로그인
router.get('/kakao', passport.authenticate('kakao'))

const kakaoCallback = (req, res, next) => {
    passport.authenticate(
        'kakao',
        { failureRedirect: '/' },
        (err, user, info) => {
            if (err) return next(err)
            //----------------------------------------------------------------
            console.log('콜백')
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

// 구글 로그인

router.get('/google', passport.authenticate('google', {scope: ['profile'],})) 
 // access_Type: 'offline',
        // approval_Prompt: 'force',
const googleCallback = (req, res, next) => {
    passport.authenticate(
        'google',
        { failureRedirect: '/' },
        (err, user, info) => {
            if (err) return next(err)
            console.log('콜백')
            const { userId, nickName, userImg } = user
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

// 네이버 로그인

//* 네이버로 로그인하기 라우터 


router.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }))
router.get('/naver/callback', userController.naverCallback)


// 테스트용 라우터
router.post('/testSignup', async (req, res) => {
    const { nickname, password } = req.body
    await users.create({ nickname, profileUrl: 'aaa', social: password })
    res.status(200).send({
        success: true,
        message: '테스트 계정 완료',
    })
})



//사용자인증
router.get("/user/login/me", authMiddleware, async (req, res) => { 

    
    const{ user } =  res.locals;
    
    
    res.send({ token: user.token, userId: user.userId, nickName : user.nickName, userImg:user.userImg });
    
   });


module.exports = router