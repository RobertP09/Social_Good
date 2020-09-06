const jwt = require("jsonwebtoken");

// Remember to change token duration before prod
const generateToken = async (payload) => {
    const generatedToken = await jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: "7d" }
    );

    return generatedToken;
};

module.exports = generateToken;