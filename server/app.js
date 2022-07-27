require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const s3 = require("./amazon");
const db = require("./database");
const customers = require("./routes/customers");
const orders = require("./routes/orders");
const inventory = require("./routes/inventory");
const team = require("./routes/team");
const user = require("./routes/user");
const overview = require("./routes/overview");

db.connect();
app.use(express.json());
app.use(cors());
app.use("/customers", customers);
app.use("/order", orders);
app.use("/inventory", inventory);
app.use("/team", team);
app.use("/user", user);
app.use("/overview", overview);



app.listen(3001, () => {
    console.log("server running on port 3001");
});
