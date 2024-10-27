const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answer.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.verifyToken, answerController.createAnswer);
router.get('/:questionId', authMiddleware.verifyToken, answerController.getAnswersByQuestionId);
router.get('/', authMiddleware.verifyToken, answerController.getAnswers);
router.put('/:id', authMiddleware.verifyToken, answerController.updateAnswerStatus);
router.delete('/:id', authMiddleware.verifyToken, answerController.deleteAnswer);
module.exports = router;
