const mysql = require("mysql");

const db = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    port: 0,
});

module.exports = db;
