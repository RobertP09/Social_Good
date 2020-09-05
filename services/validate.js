const { body } = require("express-validator");

const validate = (method) => {
    switch (method) {
        case "registerPost": {
            return [
                body("user_name", "Please enter a name").notEmpty(),
                body("user_email", "Please enter a valid email, xxx@xxx.com").notEmpty().isEmail(),
                body("password", "Must be at least 8 characters long").notEmpty().isLength(8),
            ];
        }
        case "loginPost": {
            return [
                body("user_email", "Please enter a valid email, xxx@xxx.com").notEmpty().isEmail(),
                body("password", "Must be at least 8 characters long").notEmpty().isLength(8),
            ];
        }
    }
};

module.exports = { validate };