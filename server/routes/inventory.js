const express = require("express");
const router = express.Router();
const db = require("../database");
const s3 = require("../amazon");

let number = 0;
let total = 0;
let data = null;
let aquireData = false;

router.get("/", (req, res) => {
    if (aquireData) {
        res.json(data);
    } else {
        db.query(`SELECT * FROM show_store.inventory ORDER BY id DESC`, (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                data = result;
                res.json(data);
                aquireData = true;
            }
        });
    }
});

router.post("/list", (req, res) => {
    number = req.body.data;
    return res.sendStatus(201);
});

router.get("/count", (req, res) => {
    db.query("SELECT COUNT(*) AS count FROM show_store.inventory", (err, result) => {
        total = result[0].count;
        res.json(result[0].count);
    });
});

module.exports = router;
