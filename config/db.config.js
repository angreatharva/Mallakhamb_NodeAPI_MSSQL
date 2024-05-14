const sql = require("mssql/msnodesqlv8");

var config = {
  authenticationType: "WindowsAuthentication",
  server: "ATHANEE\\SQLEXPRESS",
  database: "Mallakhamb",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

async function testConnection() {
  try {
    // Create a connection pool
    const pool = await new sql.ConnectionPool(config).connect();

    // Execute a sample query
    const result = await pool.request().query("SELECT * FROM Judges");
    if (result.recordset != "") {
      console.log("Connection & data recieved");
    } else {
      console.log("Connection & data not recieved");
    }

    // Close the connection pool
    await pool.close();
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
}

// Call the function to test the connection and execute a query
testConnection();

module.exports = config;
