const express = require("express");
const router = express.Router();
const db = require("../database");
let number = 0;
let total = 0;

router.post("/list", (req, res) => {
    number = req.body.data;
    return res.sendStatus(201);
});

router.get("/", (req, res) => {
    db.query(
        `SELECT * FROM show_store.customers ORDER BY id DESC LIMIT ${
            number[0] - 1
        },10`,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.json(result);
        }
    );
});

router.get("/count", (req, res) => {
    db.query(
        "SELECT COUNT(*) AS count FROM show_store.customers",
        (err, result) => {
            total = result[0].count;
            res.json(total);
        }
    );
});

module.exports = router;
