var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
    shortUrl: String,
    longUrl: String,
    userId: String,  // change username to userId
    creationTime: Date
});

var urlModel = mongoose.model("UrlModel", UrlSchema);

module.exports = urlModel;