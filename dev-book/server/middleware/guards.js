const User = require('../models/User');

async function isAdmin(req, res, next) {
    if (!req.userId) {
        return res.status(401).json({
            error: 'Authentication required',
        });
    }

    try {
        const user = await User.findById(req.userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({
                error: 'Admin access required',
            });
        }

        next();
    } catch (error) {
        console.error('Admin authorization failed:', error);

        return res.status(500).json({
            error: 'Authorization failed',
        });
    }
}

function isLogUser(req, res, next) {
    if (req.userId) {
        next();
    } else {
        return res.status(401).json({
            error: 'Access denied',
        });
    }
}

function isGuest(req, res, next) {
    if (req.userId) {
        return res.status(403).json({
            error: 'Already authenticated',
        });
    }

    next();
}

module.exports = {
    isLogUser,
    isGuest,
    isAdmin,
};
