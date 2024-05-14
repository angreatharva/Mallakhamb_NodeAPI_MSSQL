// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const judgeController = require("./controller/judgeController");
const authController = require("./controller/loginController");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());

// Define routes
app.post("/registerJudge", judgeController.addJudge);
app.post("/login", authController.login);

app.listen(port, () => console.log(`The app is running on Port : ${port}.`));
