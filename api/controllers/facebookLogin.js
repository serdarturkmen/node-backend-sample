const jwt = require("jsonwebtoken");

exports.user_signup = (req, res, next) => {
    console.log("request came");
    console.log(req.body);
    if (!req.user) {
        return res.status(401).json({
            message: "User Not Authenticated"
        });
    }

    // prepare token for API
    req.auth = {
        id: req.user.id
    };

    next();
};


var createToken = function (auth) {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

var generateToken = function (req, res, next) {
    console.log("generate token");
    req.token = createToken(req.auth);
    next();
};

var sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    res.status(200).send(req.auth);
};
