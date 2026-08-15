const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/chatController');

// Langsung tembak ke controller tanpa middleware tambahan
router.post('/chat', chat);

module.exports = router;