const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
    db.query(`SELECT * FROM show_store.inventory ORDER BY id DESC`, (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});

router.post("/list", (req, res) => {
    number = req.body.data;
    return res.sendStatus(201);
});

router.get("/count", (req, res) => {
    db.query("SELECT COUNT(*) AS count FROM show_store.inventory", (err, result) => {
        if (err) {
            res.json(err.message);
        } else {
            res.json(result[0].count);
        }
    });
});

module.exports = router;
