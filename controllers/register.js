const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/index");

const registerPost = async (req, res) => {
    try {
        const { user_name, user_email, password } = req.body;

        const checkPW = await db.query("SELECT * FROM users WHERE user_email = $1", [user_email]);
        if (checkPW.rowCount != 0) {
            res.status(400).json({ status: "Failure", msg: "Account already exists" });
        }

        const hashedPW = await bcrypt.hash(password, 11);

        const user = await db.query("INSERT INTO users (user_name, user_email, password) values($1, $2, $3) RETURNING *",
            [user_name, user_email, hashedPW]);

        const token = await jwt.sign({ payload: user.rows.user_id }, process.env.JWTSECRET, { expiresIn: "7d" },
            /* eslint-disable */
            (err, token) => {
                if (err) throw err;

            });

        res.status(201).json({ status: "Success", msg: "User Created", token });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { registerPost };
