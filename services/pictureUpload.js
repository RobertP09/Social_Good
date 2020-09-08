const aws = require("aws-sdk");
const multer = require("multer");
const multers3 = require("multer-s3");
const path = require("path");

aws.config.update({
    secretAccessKey: process.env.SECRETACCESSKEY,
    accessKeyId: process.env.ACCESSKEYID,
    region: process.env.AWSREGION
});

const s3 = new aws.S3();

const upload = multer({
    storage: multers3({
        s3: s3,
        acl: "public-read",
        bucket: process.env.BUCKETNAME,
        key: function (req, file, cb) {
            cb(null, file.fieldname + "-" +
                Date.now() +
                path.extname(file.originalname));
        }
    })
}).single("profile_image");

module.exports = upload;