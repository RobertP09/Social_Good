const { loginGet, loginPost } = require("../../controllers/auth");
const router = require("express").Router();

router.get("/", loginGet);

router.post("/", loginPost);

module.exports = router;