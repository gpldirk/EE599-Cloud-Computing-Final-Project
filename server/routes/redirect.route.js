const express = require('express');
const router = express.Router();
const urlService = require("../services/url.service");
const statsService = require("../services/stats.service");

// redirect to longURL
router.get("*", function (req, res) {
    var shortUrl = decodeURIComponent(req.originalUrl.slice(1));
    urlService.getLongUrl(shortUrl, function (url) {
        if (url) {
            res.redirect(url.longUrl);
            statsService.logRequest(shortUrl, req);
        } else {
            res.status(404).send("URL Not Found!");
        }
    });
});

module.exports = router;