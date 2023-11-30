const express = require('express')
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

// Set up global middleware
app.use(cors())
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Set up routes
app.use('/', indexRouter);
app.use('/users', usersRouter);



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
