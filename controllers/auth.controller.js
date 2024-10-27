const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password, name, isAdmin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({ username, email, password: hashedPassword, name, isAdmin });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ email:username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ sub: user.name,isAdmin: user.isAdmin}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({ token, isAdmin: user.isAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.logout = (req, res) => {
    // Invalidate token (handled by client by clearing token from storage)
    res.status(200).json({ message: 'User logged out successfully' });
};
