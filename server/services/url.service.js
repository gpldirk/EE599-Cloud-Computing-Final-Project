var UrlModel = require("../models/url.model");
var User = require("../models/auth.model");
var lexicon = require("emoji-lexicon");

var redis = require("redis");
var host = process.env.REDIS_PORT_6379_TCP_ADDR;
var port = process.env.REDIS_PORT_6379_TCP_PORT;
var redisClient = redis.createClient(port, host);

var encode = [];
var genCharArray = function (charA, charZ) {
    var arr = [];
    var i = charA.charCodeAt(0);
    var j = charZ.charCodeAt(0);

    for (; i <= j; i++) {
        arr.push(String.fromCharCode(i));
    }
    return arr;
};

encode = encode.concat(genCharArray("A", "Z"));
encode = encode.concat(genCharArray("a", "z"));
encode = encode.concat(genCharArray("0", "9"));

// generate shortURL and save to redis and db
var getShortUrl = function (userId, longUrl, callback) {
    console.log(longUrl, userId);
    if (longUrl.indexOf("http") === -1) {
        longUrl = "http://" + longUrl;
    }

    redisClient.get(userId + ":" + longUrl, function (err, shortUrl) {
        // if longUrl in redis
        if (shortUrl) {
            console.log("Byebye mongo!");
            callback({
                shortUrl: shortUrl,
                longUrl: longUrl,
                userId: userId
            });
        } else {
            
            UrlModel.findOne({userId: userId, longUrl: longUrl}, function (err, data) {
                // if longUrl in db
                if (data) {
                    callback(data);
                    // save to redis
                    redisClient.set(data.shortUrl, data.longUrl);
                    redisClient.set(userId + ":" + data.longUrl, data.shortUrl);
                } else {
                    
                    // if no longUrl match, generate shortUrl, save to db and cache
                    generateShortUrl(userId, function (shortUrl) {
                        var url = new UrlModel({
                            shortUrl: shortUrl,
                            longUrl: longUrl,
                            userId: userId,
                            creationTime: new Date()
                        });
                        console.log(url);
                        // save to db and redis
                        url.save();
                        redisClient.set(shortUrl, longUrl);
                        redisClient.set(userId + ":" + longUrl, shortUrl);
                        callback(url);
                    });
                }
            });
        }
    });
};

// get emoji shortURL
var generateShortUrl = function (userId, callback) {
    if (userId === "") {
        callback(convertToChar());
    } else {
        // check if user has plan and not at end phrase
        User.findById(userId, (err, user) => {
            if (user.plan == 'none' || user.endDate == null || user.endDate < new Date().toISOString()) {
                callback(convertToChar());
            } else {
                callback(convertToEmoji());
            }
        })
    }
};

// randomly generate shortURL using emoji
var convertToEmoji = function () {
    do {
        var result = "";
        for (var x = 0; x < 6; x++) {
            result += lexicon[Math.floor(Math.random() * lexicon.length)];
        }

        // UrlModel.findOne({shortUrl: result}, (err, data) => {
        //     if (data) {

        //     } else {}
        // })
    } while (false);

    return result;
};

// randomly generate shortURL using 62 characters
var convertToChar = function () {
    do {
        var result = "";
        for (var x = 0; x < 6; x++) {
            result += encode[Math.floor(Math.random() * encode.length)];
        }
    } while (false); 

    return result;
};

// get longURL from LRU or db
var getLongUrl = function (shortUrl, callback) {
    console.log("need a longUrl from shortUrl " + shortUrl);

    redisClient.get(shortUrl, function (err, longUrl) {
        // if shortUrl in redis
        if (shortUrl) {
            console.log("Byebye mongo!");
            callback({
                shortUrl: shortUrl,
                longUrl: longUrl,
            });

        } else {
            // if shortUrl in db
            console.log('Mongo is called');
            UrlModel.findOne({shortUrl: shortUrl}, function (err, data) {
                callback(data);
                if (data) {
                    // save to redis
                    redisClient.set(shortUrl, longUrl);
                }
            });
        }
    })
};

// get all url for user
var getMyUrls = function (userId, callback) {
    UrlModel.find({ userId: userId}, function (err, urls) {
        callback(urls);
    });
};

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl,
    getMyUrls: getMyUrls
};