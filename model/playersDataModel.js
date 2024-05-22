// playerModel.js
const sql = require("mssql/msnodesqlv8");
const config = require("../config/db.config");

async function getPlayersData(teamId, ageGroup, gender) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();

    const query = `
      SELECT playerId, playerName, teamId, teamName, ageGroup, gender, totalMarks, avgMarks
      FROM PlayerData
      WHERE teamId = @teamId
        AND ageGroup = @ageGroup
        AND gender = @gender
    `;

    const request = pool.request();
    request.input("teamId", sql.Int, teamId);
    request.input("ageGroup", sql.NVarChar(100), ageGroup);
    request.input("gender", sql.NVarChar(100), gender);

    const result = await request.query(query);
    await pool.close();

    return result.recordset;
  } catch (error) {
    console.error("Error fetching players data:", error.message);
    throw error;
  }
}

module.exports = {
  getPlayersData,
};
