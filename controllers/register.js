const bcrypt = require("bcryptjs");
const generateToken = require("../services/generateToken");
const db = require("../db/index");

// Created register account flow
const registerPost = async (req, res) => {
    try {
        // Destructure the request body
        const { user_name, user_email, password } = req.body;

        // check for user email existing
        const checkUser = await db.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        // If it exists aka more than 0 rows exist, then return a failure
        if (checkUser.rowCount !== 0) {
            return res.status(400).json({ status: "Failure", msg: "Account already exists" });
        }

        // If account doesnt exist continue with hashing the password
        const hashedPW = await bcrypt.hash(password, 11);

        // Insert into DB once hashed
        const user = await db.query("INSERT INTO users (user_name, user_email, password) values($1, $2, $3) RETURNING *",
            [user_name, user_email, hashedPW]);

        // Generate jwt token from user id
        const token = await generateToken(user.rows.user_id);

        return res.status(201).json({ status: "Success", msg: "User Created", token });

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

module.exports = { registerPost };
