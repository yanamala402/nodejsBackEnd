const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.verifyToken, questionController.createQuestion);
router.get('/', authMiddleware.verifyToken, questionController.getAllQuestions);
router.put('/:id', authMiddleware.verifyToken, questionController.updateQuestionStatus);
router.delete('/:id', authMiddleware.verifyToken, questionController.deleteQuestion);
router.get('/:id', authMiddleware.verifyToken, questionController.getQuestionById);


module.exports = router;
