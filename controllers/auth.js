require("dotenv").config();
const db = require("../db");
const bcrypt = require("bcryptjs");
const generateToken = require("../services/generateToken");

const loginGet = async (req, res) => {
    try {
        return res.status(200).json({ token: "token" });
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
};

const loginPost = async (req, res) => {
    try {
        // Destructure the request
        const { user_email, password } = req.body;
        // Check db and see if the user exists
        const checkUserExists = await db.query("SELECT  user_id, user_email, password FROM users WHERE user_email = $1", [user_email]);
        //If exists, return error
        if (checkUserExists.rowCount === 0) {
            return res.status(400).json({ status: "Failure", msg: "Account does not exists" });
        }
        console.log(checkUserExists.rows[0].user_id);
        // Compare passwords
        const matchPassword = await bcrypt.compare(password, checkUserExists.rows[0].password);
        // Based on match
        if (matchPassword === false) {
            return res.status(401).json({ msg: "Incorrect login information" });
        }

        const token = await generateToken(checkUserExists.rows[0].user_id);

        return res.status(200).json({ status: "Success", msg: "Login successful", token });

    } catch (err) {
        console.log(err);
        return res.status(200).json({ msg: "Login error", err });
    }
};

module.exports = { loginGet, loginPost };