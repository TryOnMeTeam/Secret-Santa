const express = require('express');
const messageController = require('../controller/messageController');

const router = express.Router();

router.post("/api/chat/getMessages", messageController.getMessagesForUserInGame);

module.exports = router;
