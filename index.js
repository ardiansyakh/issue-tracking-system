const express = require('express')
const app = express()
const port = 3000
const router = require('./routers/router')
const path = require('path')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(router)


app.listen(port, () => {
    console.log(`listening to port ${port} ...`);
})