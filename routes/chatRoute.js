const express = require("express");
const Chat = require("../models/Chat");
const router = express.Router();

// GET all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Chat.find().sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// POST a new message
router.post("/", async (req, res) => {
  try {
    const { username, message } = req.body;
    const newChat = new Chat({ username, message });
    const saved = await newChat.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to save message" });
  }
});

module.exports = router;
