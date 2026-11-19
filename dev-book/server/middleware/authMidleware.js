const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants/constants');

function verifyToken(req, res, next) {
    const token = req.headers['x-authorization'];
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.userId = decoded.userId;
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
    }
    next();
};

module.exports = verifyToken;
