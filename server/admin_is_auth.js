const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.adminIsAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        req.adminIsAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRETKEY);
    } catch (err) {
        req.adminIsAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.adminIsAuth = false;
        return next();
    }
    req.adminIsAuth = true;
    req.ownerId = decodedToken.id;
    next();
};