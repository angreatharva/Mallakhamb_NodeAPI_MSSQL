// authController.js
const authModel = require("../model/loginModel");

async function login(req, res) {
  try {
    const { judgeName, password } = req.body;
    const judgeDetails = await authModel.authenticateUser(judgeName, password);

    if (judgeDetails) {
      res.status(200).json({
        message: "Login successful",
        judgeDetails,
      });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  login,
};
