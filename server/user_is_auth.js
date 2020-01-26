const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.userIsAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        req.userIsAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETKEY);
    } catch (err) {
        req.userIsAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.userIsAuth = false;
        return next();
    }
    req.userIsAuth = true;
    req.ownerId = decodedToken.id;
    next();
};