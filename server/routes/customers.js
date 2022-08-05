const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
    db.query(`SELECT * FROM show_store.customers ORDER BY id DESC`, (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});

router.get("/count", (req, res) => {
    db.query("SELECT COUNT(*) AS count FROM show_store.customers", (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            res.json(result[0].count);
        }
    });
});

module.exports = router;
