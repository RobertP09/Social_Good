const { loginGet, loginPost } = require("../../controllers/auth");
const router = require("express").Router();
const auth = require("../../middleware/auth");
const { validate } = require("../../services/validate");

router.get("/", auth, loginGet);

router.post("/", validate("loginPost"), loginPost);

module.exports = router;