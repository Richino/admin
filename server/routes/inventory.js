const express = require("express");
const router = express.Router();
const db = require("../database");
const s3 = require("../amazon")

let number = 0;
let total = 0;


router.get("/", (req, res) => {
    db.query(
        `SELECT * FROM show_store.inventory ORDER BY id DESC LIMIT ${
            number[0] - 1
        },5`,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            result.map((item, index) => {
                const url = s3.getSignedUrl("getObject", {
                    Bucket: "shoe-store-application",
                    Key: result[index].location,
                    Expires: 500,
                });

                result[index].href = url;
            });

            res.json(result);
        }
    );
});

router.post("/list", (req, res) => {
    number = req.body.data;
    return res.sendStatus(201);
});

router.get("/count", (req, res) => {
    db.query(
        "SELECT COUNT(*) AS count FROM show_store.inventory",
        (err, result) => {
            total = result[0].count;
            res.json(total);
        }
    );
});


module.exports = router;