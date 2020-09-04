const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header("x-auth-token");

    // Check if no token sent
    if (!token) {
        return res.status(401).json({ status: "Failure", msg: "No Token, authorization denied " });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);

        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ status: "Failure", msg: "Token Invalid", error: err.message });
    }
};