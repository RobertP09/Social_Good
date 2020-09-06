const router = require("express").Router();
const auth = require("../../middleware/auth");
const {
    getProfile,
    postProfile,
    updateProfile,
    deleteFromProfile } = require("../../controllers/profile");


router.get("/", auth, getProfile);
router.post("/", auth, postProfile);
router.put("/", auth, updateProfile);
router.delete("/", auth, deleteFromProfile);

module.exports = router;