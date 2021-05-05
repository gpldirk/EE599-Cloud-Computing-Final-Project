const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    transports: ['websocket', 'polling']
});

const morgan = require('morgan')
const cors = require("cors");
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const useragent = require("express-useragent")
const path = require("path")

const redis = require("redis");
var host = process.env.REDIS_PORT_6379_TCP_ADDR;
var port = process.env.REDIS_PORT_6379_TCP_PORT;
var redisClient = redis.createClient(port, host);

// Config dotev
require('dotenv').config({
    path: './config/config.env'
})

// Connect to database
connectDB();


// body parser
app.use(bodyParser.json())
app.use(useragent.express());

// Load routes
const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')
const urlsRouter = require('./routes/urls.route')
const redirectRouter = require('./routes/redirect.route');

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL
}))


// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
} else if (process.env.NODE_ENV === 'production') {
    app.use("/", express.static(path.join(__dirname, "../client", "build")));
}

// Use Routes
app.use('/api/v1', authRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', urlsRouter)
app.use("/:shortUrl", redirectRouter)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


io.on('connection', function (socket) {    
    socket.on('registerShortUrl', function (shortUrl) {
        redisClient.subscribe(shortUrl, function () {
            socket.shortUrl = shortUrl;
            console.log("Subscribed to " + shortUrl + " channel via redis");
        });

        redisClient.on('message', function (channel, message) {
            if (message === socket.shortUrl) {
                socket.emit('shortUrlUpdated');
            }
        });
    });

    socket.on('disconnect', function () {
        if (socket.shortUrl == null) return;
        redisClient.unsubscribe(socket.shortUrl, function () {
            console.log("Unsubscribed channel " + socket.shortUrl + " from redis");
        })
    });
});