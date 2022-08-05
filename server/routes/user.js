const express = require("express");
const router = express.Router();
const db = require("../database");
let total = 0;
let user = {};

router.post("/id", (req, res) => {
    total = req.body.data;
    return res.sendStatus(201);
});

router.get("/", (req, res) => {
    db.query(`SELECT * FROM show_store.team_leaders where id = ${total}`, (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            const data = {
                id: result[0].id,
                name: result[0].name,
                position: result[0].position,
                image: result[0].location,
                status: result[0].status,
                email: result[0].email,
            };
            user = data;
            res.json(user);
        }
    });
});

router.get("/list", (req, res) => {
    db.query(
        `SELECT t.name ,t.position,e.name,e.position, e.team_id , e.location, e.href, e.email From show_store.team_leaders as t 
        INNER JOIN  show_store.employees as e
        ON t.id = e.team_id WHERE t.id = ${total}`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        }
    );
});

module.exports = router;
