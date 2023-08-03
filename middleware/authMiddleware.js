const authService = require('../services/AuthService');

module.exports = (req, res, next) => {
    const publicPaths = ['/user/login', '/user/'];

    if (publicPaths.includes(req.path)) {
        return next();
    }

    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        req.user = authService.getDataFromToken(token);
        if (!req.user) {
            res.status(401).json({
                status: 'error',
                message: 'Invalid token',
            });
            return;
        }
    }
    next();
};
