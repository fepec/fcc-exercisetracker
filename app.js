const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

require('dotenv').config()

// set up routers
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')


// set up mongoose connection
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const mongoDB = process.env.DATABASE

main().catch((err) => console.log(err))

async function main() {
  await mongoose.connect(mongoDB)
}


////  Set up global middleware ////
// Set up request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip} : ${req.body}`)
  next()
})
app.use(cors())
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



// Set up views and routes 
app.set("views", path.join(__dirname, "views") )

app.use('/', indexRouter);
app.use('/api/users', usersRouter);



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
