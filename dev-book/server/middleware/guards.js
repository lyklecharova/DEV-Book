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
};
