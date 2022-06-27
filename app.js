require('dotenv').config()
const express = require('express')
// const connect = require('./schemas')

const passportConfig = require('./passport')

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
app.use(requestMiddleware)

app.use('/oauth', express.urlencoded({ extended: false }), usersRouter)

app.get('/', (req, res) => {
    res.send('hello')
})



app.listen(PORT, function(){
    console.log('server on! http://localhost:'+ PORT);
  });