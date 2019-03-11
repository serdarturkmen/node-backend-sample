const User = require('../models/user')

module.exports = {
    firstUppercase: (string) => {
        const name = string.toLowerCase()
        return name.charAt(0).toUpperCase() + name.slice(1)
    },

    lowerCase: (string) => {
        return string.toLowerCase()
    },

    updateChatList: async (req, message) => {
        await User.updateOne({
            _id: req.user._id
        }, {
            $pull: {
                chats: {
                    receiverId: req.params.receiverId
                }
            }
        })

        await User.updateOne({
            _id: req.params.receiverId
        }, {
            $pull: {
                chats: {
                    receiverId: req.user._id
                }
            }
        })

        await User.updateOne({
            _id: req.user._id
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
                        receiverId: req.user._id,
                        msgId: message._id
                    }],
                    $position: 0
                }
            }
        })
    }
}