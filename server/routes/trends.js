const express = require("express");
const router = express.Router();
const trendModel = require("../models/Trend");

router.get("/", async (req, res) => {
  try {
    const aggregate = await trendModel.aggregate([
      { $match: { volume: { $ne: null } } },
      { $sample: { size: 20 } },
    ]);
    res.send(aggregate);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
