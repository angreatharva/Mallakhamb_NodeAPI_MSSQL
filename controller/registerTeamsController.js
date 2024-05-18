// teamController.js
const teamModel = require("../model/registerTeamsModel");

async function registerTeam(req, res) {
  try {
    const {
      teamName,
      coachName,
      contactNo,
      emailAddress,
      gender,
      under12,
      under14,
      under18,
      above18,
    } = req.body;

    const result = await teamModel.registerTeam(
      teamName,
      coachName,
      contactNo,
      emailAddress,
      gender,
      under12,
      under14,
      under18,
      above18
    );

    if (result.success) {
      res.status(200).json({ message: "Team registered successfully" });
    } else {
      res.status(500).json({ error: "Failed to register team" });
    }
  } catch (error) {
    if (error.message.includes("already exists")) {
      res.status(409).json({ error: error.message });
    } else {
      console.error("Error registering team:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = {
  registerTeam,
};
