const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
    db.query(`SELECT * FROM show_store.team_leaders ORDER BY name`, (err, result) => {
        if (err) {
            res.json(err.message);
        } else {
            res.json(result);
        }
    });
});

router.get("/count", (req, res) => {
    db.query("SELECT COUNT(*) AS count FROM show_store.team_leaders", (err, result) => {
        if (err) {
            res.json(err.message);
        } else {
            res.json(result[0].count);
        }
    });
});

module.exports = router;
