// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');
const { JWT_SECRET } = require('../constants/constants');
const { isGuest } = require('../middleware/guards');
// User registration - Not logged in
router.post('/register', isGuest, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email
        if (
            typeof email !== 'string' ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            return res.status(400).json({
                error: 'Valid email is required',
            });
        }

        // Validate password
        if (typeof password !== 'string' || password.length < 8) {
            return res.status(400).json({
                error: 'Password must be at least 8 characters',
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                error: 'Email already registered',
            });
        }

        console.error(error);

        res.status(500).json({
            error: 'Registration failed',
        });
    }
});

// User login - Not logged in
router.post('/login', isGuest, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1d',
        });
        res.status(200).json({ token, userId: user._id, email: email });
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
    }
});

module.exports = router;
