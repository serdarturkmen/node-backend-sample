const User = require('../models/user')
const Message = require('../models/message')
const Conversation = require('../models/conversation')
const Helper = require('../helpers/helpers')

exports.store = async (req, res, err) => {
    Conversation.find({
        $or: [{
            participants: {
                $elemMatch: {
                    senderId: req.params.senderId,
                    receiverId: req.params.receiverId
                }
            }
        }, {
            participants: {
                $elemMatch: {
                    senderId: req.params.receiverId,
                    receiverId: req.params.senderId
                }
            }
        }]
    }, async (err, result) => {
        if (result.length > 0) {
            const msg = await Message.findOne({
                conversationId: result[0]._id
            })
            Helper.updateChatList(req, msg)
            await Message.updateOne({
                    conversationId: result[0]._id
                }, {
                    $push: {
                        messages: {
                            senderId: req.user._id,
                            receiverId: req.params.receiverId,
                            senderName: req.user.email,
                            receiverName: req.body.receiverName,
                            body: req.body.message
                        }
                    }
                })
                .then(() => {
                    return res.status(201).json({
                        message: 'Message sent.'
                    })
                })
                .catch(() => {
                    return res.statis(422).json({
                        message: 'Could not send message.'
                    })
                })

        } else {
            const convo = new Conversation()
            convo.participants.push({
                senderId: req.user.userId,
                receiverId: req.params.receiverId
            })

            const saveConvo = await convo.save()

            const message = new Message()
            message.conversationId = saveConvo._id
            message.sender = req.user.email
            message.receiver = req.body.receiverName
            message.messages.push({
                senderId: req.user._id,
                receiverId: req.params.receiverId,
                senderName: req.user.email,
                receiverName: req.body.receiverName,
                body: req.body.message
            })

            await User.updateOne({
                _id: req.user.userId
            }, {
                $push: {
                    chats: {
                        $each: [{
                            receiverId: req.params.receiverId,
                            msgId: message._id
                        }],
                        $position: 0
                    }
                }
            })

            await User.updateOne({
                _id: req.params.receiverId
            }, {
                $push: {
                    chats: {
                        $each: [{
                            receiverId: req.user.userId,
                            msgId: message._id
                        }],
                        $position: 0
                    }
                }
            })

            await message.save()
                .then(() => {
                    return res.status(201).json({
                        message: 'Message sent.'
                    })
                })
                .catch(() => {
                    return res.statis(422).json({
                        message: 'Could not send message.'
                    })
                })
        }
    })
}

exports.getAll = async (req, res, err) => {
    const convo = await Conversation.findOne({
        $or: [{
                $and: [{
                        'participants.senderId': req.params.senderId
                    },
                    {
                        'participants.receiverId': req.params.receiverId
                    }
                ]
            },
            {
                $and: [{
                        'participants.receiverId': req.params.senderId
                    },
                    {
                        'participants.senderId': req.params.receiverId
                    }
                ]
            },
        ]
    }).select('_id')

    if (convo) {
        const messages = await Message.findOne({
            conversationId: convo._id
        })
        return res.status(200).json(messages)
    } else {
        return res.status(404).json({
            message: 'Conversation not found.'
        })
    }
}

exports.markReceiverMessage = async (req, res) => {
    const msg = await Message.aggregate([{
        $unwind: '$messages'
    }, {
        $match: {
            $and: [{
                'messages.senderName': req.params.receiver,
                'messages.receiverName': req.params.sender
            }]
        }
    }])

    updateMessage(msg, res)

}

exports.markAll = async (req, res) => {
    const msg = await Message.aggregate([{
        $match: {
            'messages.receiverName': req.user.email
        }
    }, {
        $unwind: '$messages'
    }, {
        $match: {
            'messages.receiverName': req.user.email
        }
    }])

    updateMessage(msg, res)
}

function updateMessage(msg, res) {
    if (msg.length > 0) {
        try {
            msg.forEach(async (value) => {
                await Message.updateOne({
                    'messages._id': value.messages._id
                }, {
                    $set: {
                        'messages.$.isRead': true
                    }
                })
            })
            return res.status(200).json({
                message: 'Messages marked as read.'
            })
        } catch (err) {
            return res.status(422).json({
                message: 'Error occured.'
            })
        }
    }
}
