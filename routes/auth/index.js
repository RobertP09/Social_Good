const { loginGet, loginPost } = require("../../controllers/auth");
const router = require("express").Router();
const auth = require("../../middleware/auth");

router.get("/", auth, loginGet);

router.post("/", loginPost);

module.exports = router;