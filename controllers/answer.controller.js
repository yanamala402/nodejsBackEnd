const Answer = require('../models/answer.model');
const Question = require('../models/question.model');
const emailService = require('../services/email.service');

exports.createAnswer = async (req, res) => {
    try {
        const question = await Question.findById(req.body.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        const answer = new Answer({
            questionId: req.body.id,
            answerText: req.body.answer,
            createdBy: req.body.username,
            isApproved: question.isApproved,
            question: question.question
        });
        await answer.save();

        // Send email notification
        const recipientEmail = "yanamala402@gmail.com";
        await emailService.sendApprovalNotification(question.questionText, recipientEmail);


        res.status(201).json(answer);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAnswersByQuestionId = async (req, res) => {
    try {
        const answers = await Answer.find({
            questionId: req.params.questionId,
            isApproved: req.query.status === 'approved'
        });
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAnswers = async (req, res) => {
    try {
        const { status } = req.query;

        // Construct filter based on status query parameter
        let filter = {};
        if (status === 'approved') {
            filter.isApproved = true;
        } else if (status === 'unapproved') {
            filter.isApproved = false;
        }

        const answers = await Answer.find(filter);
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateAnswerStatus = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);

        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        answer.isApproved = req.body.isApproved !== undefined ? req.body.isApproved : answer.isApproved;
        await answer.save();

        res.status(200).json(answer);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteAnswer = async (req, res) => {
    try {
        await Answer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Answer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
