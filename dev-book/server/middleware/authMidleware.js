const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants/constants');

function verifyToken(req, res, next) {
    const token = req.headers['x-authorization'];
    if (!token) {
        return next();
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = verifyToken;
