const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    topic: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    approvedBy: { type: String, default: 'Open' }, // 'Open', 'Resolved'
    isApproved: { type: Boolean, default: false },
    postedAt: { type: Date, default: Date.now },
    postedBy: {type:String, required: true}
});

module.exports = mongoose.model('Question', questionSchema);
