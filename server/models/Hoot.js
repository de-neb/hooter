const mongoose = require("mongoose");
const { commentSchema } = require("./Comment");

const mediaSchema = new mongoose.Schema({
  width: Number,
  height: Number,
});

const hootSchema = new mongoose.Schema({
  text: String,
  has_media: Boolean,
  media: [mediaSchema],
  created_at: String,
  rehoot: Number,
  likes: Number,
  comments: [commentSchema],
});

module.exports = { hootSchema };
