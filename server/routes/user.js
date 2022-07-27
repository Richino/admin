const express = require("express");
const router = express.Router();
const db = require("../database");
const s3 = require("../amazon")
let total = 0;

router.post("/id", (req, res) => {
    total = req.body.data;
    return res.sendStatus(201);
});

router.get("/", (req, res) => {
    db.query(
        `SELECT * FROM show_store.team_leaders where id = ${total}`,
        (err, result) => {
            const url = s3.getSignedUrl("getObject", {
                Bucket: "shoe-store-application",
                Key: result[0].location,
                Expires: 500,
            });
            const data = {
                id: result[0].id,
                name: result[0].name,
                position: result[0].position,
                image: url,
                status: result[0].status,
                email: result[0].email,
            };
            res.json(data);
        }
    );
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
                result.map((key, index) => {
                    const url = s3.getSignedUrl("getObject", {
                        Bucket: "shoe-store-application",
                        Key: result[index].location,
                        Expires: 500,
                    });

                    result[index].href = url;
                    delete result[index].location;
                    delete result[index].team_id;
                });

                res.json(result);
            }
        }
    );
});

module.exports = router