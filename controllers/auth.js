//const db = require("../db");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

const loginGet = async (req, res) => {
    try {
        res.status(200).json({ token: "token" });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

const loginPost = async (req, res) => {
    res.status(200).json({ msg: "Login get" });
};

module.exports = { loginGet, loginPost };