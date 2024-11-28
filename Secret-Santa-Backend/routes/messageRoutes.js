const express = require('express');
const messageController = require('../controller/messageController');

const router = express.Router();

router.post("/api/chat/getMessages", messageController.getMessagesForUserInGame);

router.post("/api/chat/getPendingMessages", messageController.getPendingMessagesForUserInGame);

router.post("/api/chat/markEmailAsNotSent", messageController.markEmailAsNotSent);

module.exports = router;
