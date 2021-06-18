const express = require('express')
const app = express()
const port = 3000
const router = require('./routers/router')
const path = require('path')
<<<<<<< HEAD
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'ITS',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))
=======
const multer = require("multer");

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
>>>>>>> 8fa312c01f5b50fdaa4b5ac34fa28071155873ee
app.use(router)

app.listen(port, () => {
    console.log(`listening to port ${port} ...`);
})