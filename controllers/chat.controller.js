const ChatMessage = require('../models/chatMessage.model');

// Get all chat messages
exports.getChatMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.find().sort({ postedAt: -1 }).exec();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new chat message
exports.createChatMessage = async (req, res) => {
    try {
        const { message, postedBy } = req.body;

        if (!message || !postedBy) {
            return res.status(400).json({ message: 'Message and postedBy are required' });
        }

        const newMessage = new ChatMessage({ message, postedBy });
        await newMessage.save();

        const messages = await ChatMessage.find().sort({ postedAt: -1 }).exec();
        res.status(201).json(messages);
    } catch (error) {
        console.error('Error creating chat message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
