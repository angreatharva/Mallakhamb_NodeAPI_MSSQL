// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const judgeController = require("./controller/registerJudgeController");
const authController = require("./controller/loginController");
const teamController = require("./controller/registerTeamsController");
const getTeamListController = require("./controller/getTemListController");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());

// Define routes
app.post("/registerJudge", judgeController.addJudge);
app.post("/registerTeam", teamController.registerTeam);
app.post("/login", authController.login);
app.get("/getTeamList", getTeamListController.getTeamList);

app.listen(port, () => console.log(`The app is running on Port : ${port}.`));
