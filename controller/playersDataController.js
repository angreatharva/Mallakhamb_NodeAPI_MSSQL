// playerController.js
const playerModel = require("../model/playersDataModel");

async function getPlayersData(req, res) {
  try {
    const { teamId, ageGroup, gender } = req.query;

    if (!teamId || !ageGroup || !gender) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    const result = await playerModel.getPlayersData(teamId, ageGroup, gender);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No players found" });
    }
  } catch (error) {
    console.error("Error fetching players data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getPlayersData,
};
