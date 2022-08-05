const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/transactions", (req, res) => {
    db.query("SELECT * FROM show_store.transactions ORDER BY id DESC LIMIT 0,10 ", (err, result) => {
        res.json(result);
    });
});

router.get("/sales", (req, res) => {
    db.query("SELECT * FROM show_store.sales", (err, result) => {
        res.json(result);
    });
});

module.exports = router;
