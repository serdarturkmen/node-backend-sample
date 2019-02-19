const express = require("express");
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');

const FacebookLoginController = require('../controllers/facebookLogin');


passportConfig();

router.post(passport.authenticate('facebook-token', {session: false}), FacebookLoginController.user_signup);

module.exports = router;
