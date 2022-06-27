require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
// const connect = require('./schemas')
const path = require('path')
const passportConfig = require('./passport')
const cors = require('cors');
const PORT = 8080
// const fs = require('fs')
// const https = require('https')

// const privateKey = fs.readFileSync(__dirname + '/private.key', 'utf8')
// const certificate = fs.readFileSync(__dirname + '/certificate.crt', 'utf8')
// const ca = fs.readFileSync(__dirname + '/ca_bundle.crt', 'utf8')
// const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca,
// }
// const app_low = express()


mongoose.connect("mongodb://0.0.0.0/kakaotest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

const app = express()

// const httpsPort = process.env.HTTPS_PORT

// app_low.use((req, res, next) => {
//     if (req.secure) {
//         next()
//     } else {
//         const to = `https://${req.hostname}:${httpsPort}${req.url}`
//         res.redirect(to)
//     }
// })

// connect()
passportConfig()
//마지막에 cors 수정해야함

const usersRouter = require('./routes/user')


const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date())
    next()
}

//프론트에서 오는 데이터들을 body에 넣어주는 역할
app.use(express.json())
app.use(cors({ // CORS 모듈 실행
    origin : "http://localhost:3000",  
   // origin : "*", // 출처 허용 옵션 (전부 허용)
   credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(requestMiddleware)

app.use('/oauth', express.urlencoded({ extended: false }), usersRouter)

app.get('/', (req, res) => {
    res.status(200).render('index');
})



app.listen(PORT, function(){
    console.log('server on! http://localhost:'+ PORT);
  });