const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

router.post("/send", (req, res) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: 'caglarturkurka@gmail.com',
            pass: 'Robin0913@'
        }
    });

    let mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) console.log(error);
        else console.log("Message sent successfully: " + info.response);
    });
});

module.exports = router;
