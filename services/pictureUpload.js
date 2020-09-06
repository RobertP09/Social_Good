const aws = require("aws-sdk");
const multer = require("multer");
const multers3 = require("multer-s3");

const s3 = new aws.S3();

const upload = multer({
    storage: multers3({
        s3,
        acl: "public-read",
        bucket: "social-good",
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        }
    })
});

module.exports = upload;