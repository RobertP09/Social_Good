const router = require("express").Router();
const auth = require("../../middleware/auth");
const { getProfile } = require("../../controllers/profile");


router.get("/", auth, getProfile);
router.post("/");
router.put("/");
router.delete("/");

module.exports = router;