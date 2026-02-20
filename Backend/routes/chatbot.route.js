const express = require("express");
const { handleChatbot } = require("../controllers/chatbot.controller");

const router = express.Router();

// POST route to handle chatbot messages
router.post("/", handleChatbot);

module.exports = router;
