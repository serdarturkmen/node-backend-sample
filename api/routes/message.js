const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth');

const MessagesController = require('../controllers/messages')

router.get('/chat/:senderId/:receiverId', checkAuth, MessagesController.getAll)
router.get('/mark-message/:sender/:receiver', checkAuth, MessagesController.markReceiverMessage)
router.get('/mark-all-messages',  checkAuth, MessagesController.markAll)
router.post('/chat/:senderId/:receiverId', checkAuth, MessagesController.store)

module.exports = router
