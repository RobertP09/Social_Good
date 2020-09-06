const db = require("../db");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const generateToken = require("../services/generateToken");

const loginGet = async (req, res) => {
    try {
        // eslint-disable-next-line
        const query = await db.query("SELECT user_id, user_name, user_email, user_is_admin FROM users WHERE user_id = $1",
            [req.user.id]);

        return res.status(200).json({ status: "Success" });
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
};

const loginPost = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Destructure the request
        const { user_email, password } = req.body;
        // Check db and see if the user exists
        const checkUserExists = await db.query(
            `SELECT  user_id, user_email, password FROM users 
            WHERE user_email = $1`,
            [user_email]);
        //If exists, return error
        if (checkUserExists.rowCount === 0) {
            return res.status(400).json({
                status: "Failure",
                msg: "Account does not exists"
            });
        }
        // Compare passwords
        const matchPassword = await bcrypt.compare(
            password, checkUserExists.rows[0].password
        );
        // Based on match
        if (matchPassword === false) {
            return res.status(401).json({ msg: "Incorrect login information" });
        }
        // Generate token payload so we can use for lookup later
        const payload = {
            user: {
                id: checkUserExists.rows[0].user_id,
            }
        };

        const token = await generateToken(payload);

        return res.status(200).json({
            status: "Success",
            msg: "Login successful",
            token
        });

    } catch (err) {
        console.log(err);
        return res.status(200).json({
            status: "Failure",
            msg: "Login error",
            error: err
        });
    }
};

module.exports = { loginGet, loginPost };