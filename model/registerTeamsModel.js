// teamModel.js
const sql = require("mssql/msnodesqlv8");
const config = require("../config/db.config");

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
    request.input("under12", sql.NVarChar(sql.MAX), JSON.stringify(under12));
    request.input("under14", sql.NVarChar(sql.MAX), JSON.stringify(under14));
    request.input("under18", sql.NVarChar(sql.MAX), JSON.stringify(under18));
    request.input("above18", sql.NVarChar(sql.MAX), JSON.stringify(above18));

    await request.query(query);
    await pool.close();

    return { success: true };
  } catch (error) {
    console.error("Error registering team:", error.message);
    throw error;
  }
}

module.exports = {
  registerTeam,
};
