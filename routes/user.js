require('dotenv').config()
const express = require('express')
const User = require('../schemas/user')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')



//카카오 로그인
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

// 구글 로그인

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
router.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));


//? 위에서 네이버 서버 로그인이 되면, 네이버 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
router.get('/naver/callback',
    //? 그리고 passport 로그인 전략에 의해 naverStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
    passport.authenticate('naver', 
    { failureRedirect: '/' }),
    (req, res) => {
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
        console.log('네이버 콜백 함수 결과', result)
        res.send({ user: result })
    },
 );


//사용자인증
router.get("/user/login/me", authMiddleware, async (req, res) => { 

    
    const{ user } =  res.locals;
    
    
    res.send({ token: user.token, userId: user.userId, nickName : user.nickName, userImg:user.userImg });
    
   });


module.exports = router