const sql = require("mssql/msnodesqlv8");
const config = require("../config/db.config");

async function getTeamList(ageGroup) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();

    if (ageGroup === null || ageGroup === "" || ageGroup === "[]") {
      ageGroup = null;
    }

    request.input("ageGroup", sql.NVarChar(10), ageGroup);
    const result = await request.execute("GetTeamList");
    await pool.close();
    return result.recordset;
  } catch (error) {
    console.error("Error fetching team list:", error.message);
    throw error;
  }
}

module.exports = {
  getTeamList,
};
