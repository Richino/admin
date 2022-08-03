const express = require("express");
const router = express.Router();
const db = require("../database");

let data = null;
let sales = null;
let aquireData = false;
let aquireSales = false;

router.get("/transactions", (req, res) => {
    if (aquireData) {
        res.json(data);
    } else {
        db.query("SELECT * FROM show_store.transactions ORDER BY id DESC LIMIT 0,10 ", (err, result) => {
            data = result;
            res.json(data);
            aquireData = true;
        });
    }
});

router.get("/sales", (req, res) => {
    if (aquireSales) {
        res.json(sales);
    } else {
        db.query("SELECT * FROM show_store.sales", (err, result) => {
            sales = result;
            res.json(sales);
        });
    }
});

module.exports = router;
