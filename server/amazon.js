const AWS = require("aws-sdk");
const s3 = new AWS.S3({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSID,
    secretAccessKey: process.env.SECRETACCESSKEY,
});

module.exports = s3