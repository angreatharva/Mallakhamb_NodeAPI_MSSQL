// teamModel.js
const sql = require("mssql/msnodesqlv8");
const config = require("../config/db.config");

async function teamExists(teamName) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    const result = await pool
      .request()
      .input("teamName", sql.VarChar, teamName)
      .query("SELECT COUNT(*) AS count FROM Teams WHERE teamName = @teamName");

    await pool.close();
    return result.recordset[0].count > 0;
  } catch (error) {
    console.error("Error checking team existence:", error.message);
    throw error;
  }
}

async function registerTeam(
  teamName,
  coachName,
  contactNo,
  emailAddress,
  gender,
  under12,
  under14,
  under18,
  above18
) {
  try {
    if (await teamExists(teamName)) {
      throw new Error(`Team with the name '${teamName}' already exists.`);
    }

    const pool = await new sql.ConnectionPool(config).connect();

    const query = `INSERT INTO Teams (teamName, coachName, contactNo, emailAddress, gender, under12, under14, under18, above18) 
                   VALUES (@teamName, @coachName, @contactNo, @emailAddress, @gender, 
                           @under12, @under14, @under18, @above18)`;

    const request = pool.request();
    request.input("teamName", sql.VarChar, teamName);
    request.input("coachName", sql.VarChar, coachName);
    request.input("contactNo", sql.VarChar, contactNo);
    request.input("emailAddress", sql.VarChar, emailAddress);
    request.input("gender", sql.VarChar, gender);
    request.input("under12", sql.NVarChar(sql.MAX), handleEmptyValue(under12));
    request.input("under14", sql.NVarChar(sql.MAX), handleEmptyValue(under14));
    request.input("under18", sql.NVarChar(sql.MAX), handleEmptyValue(under18));
    request.input("above18", sql.NVarChar(sql.MAX), handleEmptyValue(above18));
    await request.query(query);
    await pool.close();

    return { success: true };
  } catch (error) {
    console.error("Error registering team:", error.message);
    throw error;
  }
}

function handleEmptyValue(value) {
  if (
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return null;
  } else {
    return JSON.stringify(value);
  }
}

module.exports = {
  registerTeam,
};
