const getProfile = async (req, res) => {
    res.status(200).json({ msg: "Welcome to your profile" });
};

module.exports = { getProfile };