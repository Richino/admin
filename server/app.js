require("dotenv").config();
const port = process.env.PORT || 3000;
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const db = require("./database");
const customers = require("./routes/customers");
const orders = require("./routes/orders");
const inventory = require("./routes/inventory");
const team = require("./routes/team");
const user = require("./routes/user");
const overview = require("./routes/overview");

app.use("/team", team);
app.use("/customers", customers);
app.use("/order", orders);
app.use("/inventory", inventory);
app.use("/user", user);
app.use("/overview", overview);

app.get("/", (req, res) => {
    res.json({ message: "it worked" });
});

app.listen(port, () => {
    console.log("server running on port 3001");
});
