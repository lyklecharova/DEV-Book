function isLogUser(req, res, next) {
    if (req.userId) {
        next();
    } else {
        return res.status(401).json({
            error: 'Access denied'
        })
    }
};

function isGuest(req, res, next) {
    if (req.user) {
        return res.status(401).json({ message: 'Unauthorized', statusCode: 401 });
    } else {
        next();
    }
};

module.exports = {
    isLogUser,
    isGuest,
}