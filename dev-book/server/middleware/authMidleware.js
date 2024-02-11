const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants/constants');

function verifyToken(req, res, next) {
    const token = req.headers['x-authorization'];
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    throw new Error('Invalid token');
                }
                return decodedToken;
            });
            req.userId = decoded.userId;
        } catch (error) {
            res.status(401).json({ error: error.message });
            return;
        }
    }
    next();
};

module.exports = verifyToken;
