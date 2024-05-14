// judgeModel.js
const sql = require("mssql/msnodesqlv8");
const config = require("../config/db.config");

async function addJudge(judgeName, password, judge, ageGroup, gender) {
  try {
    // Create a connection pool
    const pool = await new sql.ConnectionPool(config).connect();

    // Insert data into Judges table
    await pool
      .request()
      .query(
        `INSERT INTO Judges (judgeName, password, judge, ageGroup, gender) VALUES ('${judgeName}', '${password}', '${judge}', '${ageGroup}', '${gender}')`
      );

    // Close the connection pool
    await pool.close();

    return { success: true };
  } catch (err) {
    console.error("Error adding data to the database:", err.message);
    throw err;
  }
}

module.exports = {
  addJudge,
};
