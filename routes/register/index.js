const { registerPost } = require("../../controllers/register");
const router = require("express").Router();

router.post("/", registerPost);

module.exports = router;