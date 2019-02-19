
const express = require("express");
const router = express.Router();

const FacebookLoginController = require('../controllers/facebookLogin');

router.post("/login", FacebookLoginController.user_signup);

module.exports = router;
