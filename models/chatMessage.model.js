const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    postedBy: { type: String, required: true },
    postedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
