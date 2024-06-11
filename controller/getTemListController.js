const teamModel = require("../model/getTeamListModel");

async function getTeamList(req, res) {
  try {
    const { ageGroup } = req.query;
    const teams = await teamModel.getTeamList(ageGroup);

    const teamMap = teams.reduce((acc, team) => {
      const {
        teamId,
        teamName,
        coachName,
        contactNo,
        emailAddress,
        gender,
        playerName,
        playerDob,
        playerAge,
        totalMarks,
        avgMarks,
      } = team;

      if (!acc[teamId]) {
        acc[teamId] = {
          teamId,
          teamName,
          coachName,
          contactNo,
          emailAddress,
          gender,
          playerList: [],
        };
      }

      acc[teamId].playerList.push({
        playerName,
        playerDob,
        playerAge,
        totalMarks,
        avgMarks,
      });

      return acc;
    }, {});

    const transformedTeams = Object.values(teamMap);

    res.status(200).json(transformedTeams);
  } catch (error) {
    console.error("Error fetching team list:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getTeamList,
};
