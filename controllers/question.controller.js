const Question = require('../models/question.model');

exports.createQuestion = async (req, res) => {
    try {
        const question = new Question({
            question: req.body.question,
            topic: req.body.topic,
            postedBy: req.body.username,
            approvedBy: '', 
            isApproved: false,
            postedAt: req.body.date
        });
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// exports.getAllQuestions = async (req, res) => {
//     try {
//         const questions = await Question.find(req.query.status ? { isApproved: req.query.status === 'approved' } : {});
//         res.status(200).json(questions);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

exports.getAllQuestions = async (req, res) => {
    try {
        const { search, topic, status } = req.query;

        // Construct the filter query object
        let filter = {};

        // Filter by search string (in `postedBy`, `question`, or `topic`)
        if (search) {
            filter.$or = [
                { postedBy: { $regex: search, $options: 'i' } }, // Case-insensitive search by username
                { question: { $regex: search, $options: 'i' } }, // Case-insensitive search by question
                { topic: { $regex: search, $options: 'i' } }     // Case-insensitive search by topic
            ];
        }

        // Filter by a specific topic
        if (topic) {
            filter.topic = topic;
        }
        // Apply status filter (if status is 'pending', filter where isApproved is false)
        if (status === 'unapproved') {
            filter.isApproved = false;
        }

        // Execute the query with the constructed filter
        const questions = await Question.find(filter).populate('userId', 'name'); // Populating user's name if needed
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.updateQuestionStatus = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        question.status = req.body.status || question.status;
        question.isApproved = req.body.isApproved !== undefined ? req.body.isApproved : question.isApproved;
        await question.save();

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the question by its id
        const question = await Question.findById(id).populate('userId', 'name');

        // If question not found, return a 404 response
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Return the found question
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
