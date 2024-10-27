require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
require('./config/db.config');
const cors = require('cors'); // Import cors

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const questionRoutes = require('./routes/question.routes');
const answerRoutes = require('./routes/answer.routes');
const chatRoutes = require('./routes/chat.routes');

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
