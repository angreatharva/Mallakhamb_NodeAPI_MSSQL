// authModel.js
const sql = require("mssql/msnodesqlv8");
const config = require("../config/db.config");

async function authenticateUser(judgeName, password) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    const query = `SELECT * FROM Judges WHERE judgeName = @judgeName AND password = @password`;
    const result = await pool
      .request()
      .input("judgeName", sql.VarChar, judgeName)
      .input("password", sql.VarChar, password)
      .query(query);

    await pool.close();

    return result.recordset[0]; // Return the first record if authentication is successful
  } catch (error) {
    console.error("Error authenticating user:", error.message);
    throw error;
  }
}

module.exports = {
  authenticateUser,
};
