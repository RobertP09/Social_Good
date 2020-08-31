const register = require("./register");
const auth = require("./auth");

module.exports = app => {
    app.use("/auth", auth);
    app.use("/register", register);
};