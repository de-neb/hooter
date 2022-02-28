const mongoose = require("mongoose");

const hootSchema = new mongoose.Schema(
  {
    text: String,
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = { hootSchema };
