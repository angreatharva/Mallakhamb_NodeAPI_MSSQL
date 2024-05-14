// judgeController.js
const judgeModel = require("../model/judgeModel");

async function addJudge(req, res) {
  try {
    const { judgeName, password, judge, ageGroup, gender } = req.body;
    await judgeModel.addJudge(judgeName, password, judge, ageGroup, gender);
    res.status(200).json({
      status: 200,
      message: "Judge added successfully",
      judgeName: judgeName,
      ageGroup: ageGroup,
      judge: judge,
      gender: gender,
    });
  } catch (error) {
    console.error("Error adding judge:", error.message);
    res.status(500).json({
      status: 500,
      error: "Internal server error",
    });
  }
}

module.exports = {
  addJudge,
};
