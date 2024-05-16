const teamModel = require("../model/getTeamListModel");

async function getTeamList(req, res) {
  try {
    const { ageGroup } = req.query;
    const teams = await teamModel.getTeamList(ageGroup);
    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching team list:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getTeamList,
};
