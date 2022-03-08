const mongoose = require("mongoose");

const trendSchema = new mongoose.Schema({
  trend_name: String,
  trend_query: String,
  volume: Number,
});

module.exports = mongoose.model("trend", trendSchema, "Trends");
