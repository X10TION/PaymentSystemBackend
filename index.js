const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const mongoose = require('mongoose')
const config = require('config')
const morgan = require('morgan')
const dotenv = require('dotenv')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')
const { appendFile } = require('fs')

//  initialized the application
const App = express()

// Middleware application
App.use(express.json())

// loaded enviroment varialble
dotenv.config({path: './config.env'})

// Rendering the server Here
const server = http.createServer(App)
// rendering the sockketio to the server
const io = socketio(server).sockets


// dev logger



// database  configurations
const db = config.get('mongoURI')
//  connection to mongodb
mongoose.connect(db)
.then(() => console.log(`MongoDB Connected SEAMLESSLY`))
.catch((err) => console.log("Could Not connect to Database:"))

// ///////////////////Request center///////
App.get("/", (req, res) => {
    res.send('The Homepage has been Hit.!')
})
App.use('/api/v1/users', users)
App.use('/api/v1/auth', auth)


const port = process.env.PORT || 5000
server.listen(port, () => console.log(`Backend Server Is Running ${port}`))