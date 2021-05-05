const express = require('express');
const router = express.Router();

const { requireSignin } = require('../controllers/auth.controller');
const { 
    getShortUrlController, getLongUrlController, 
    getRequestInfoController, getMyUrlsController } = require('../controllers/urls.controller');


// get shortURL
router.post("/urls", getShortUrlController);

// get longURL
router.get("/urls/:shortUrl", getLongUrlController);

// get shortURL request info
router.get("/urls/:shortUrl/:info", getRequestInfoController); /// signin test

// get url records table for user
router.get("/myUrls", requireSignin, getMyUrlsController);

module.exports = router;