const express = require('express')
const exphbs = require('express-handlebars')
const cookieParser = require("cookie-parser")
const session = require('express-session')
const MongoStore = require('connect-mongo')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

//  settint cookie parser
//app.use(cookieParser("123456789"))

// setting session
app.use(session({
  name: 'uuid',
  secret: '123456789',
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 1000 } //  1分鐘
}))

app.use(routes)

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})
