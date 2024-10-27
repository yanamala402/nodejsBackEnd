const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answerText: { type: String, required: true },
    createdBy: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    isApproved: { type: String, required: true },
    question: { type: String, required: true },
});

module.exports = mongoose.model('Answer', answerSchema);
