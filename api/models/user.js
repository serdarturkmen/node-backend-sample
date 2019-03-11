const mongoose = require('mongoose');
const Message = require('../models/message')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    eyeColor: { type: mongoose.Schema.Types.ObjectId,
        ref: 'EyeColor'
    },
    chats: [{
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        msgId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    }]

});

module.exports = mongoose.model('User', userSchema);
