const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

// Get chat messages
router.get('/', chatController.getChatMessages);

// Create a new chat message
router.post('/', chatController.createChatMessage);

module.exports = router;
