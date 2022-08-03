const express = require("express");
const router = express.Router();
const db = require("../database");
let number = 0;
let total = 0;
let data = null;
let aquireData = false;

router.post("/list", (req, res) => {
    number = req.body.data;
    return res.sendStatus(201);
});

router.get("/", (req, res) => {
    if (aquireData) {
        res.json(data);
    } else {
        db.query(`SELECT * FROM show_store.customers ORDER BY id DESC`, (err, result) => {
            if (err) {
                console.log(err);
            }
            data = result;
            res.json(data);
            aquireData = true;
        });
    }
});

router.get("/count", (req, res) => {
    if (total != 0) {
        res.json(total);
    } else {
        db.query("SELECT COUNT(*) AS count FROM show_store.customers", (err, result) => {
            total = result[0].count;
            res.json(total);
        });
    }
});

module.exports = router;
