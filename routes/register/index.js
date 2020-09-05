const { registerPost } = require("../../controllers/register");
const router = require("express").Router();
const { validate } = require("../../services/validate");

router.post("/", validate("registerPost"), registerPost);

module.exports = router;