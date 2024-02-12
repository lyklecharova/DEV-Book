// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');
const { JWT_SECRET } = require('../constants/constants');
const { isGuest, isLogUser } = require('../middleware/guards');


// User registration - - Not logged in
router.post('/register', isGuest, async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
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

// User logout - Logged in
router.get('/logout', isLogUser, async (req, res, next) => {
    try {

        const userToken = req.userToken;
        await userLogout(userToken)

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;