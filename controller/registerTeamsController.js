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

    await teamModel.registerTeam(
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

    res.status(200).json({
      status: 200,
      message: "Judge added successfully",
      teamName: teamName,
      emailAddress: emailAddress,
      gender: gender,
    });

    // if (result.success) {
    //   res.status(201).json({ message: "Team registered successfully" });
    // } else {
    //   res.status(500).json({ error: "Failed to register team" });
    // }
  } catch (error) {
    console.error("Error registering team:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  registerTeam,
};
