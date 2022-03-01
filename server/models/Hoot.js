const mongoose = require("mongoose");
const { commentSchema } = require("./Comment");
const hootSchema = new mongoose.Schema({
  text: String,
  has_media: Boolean,
  media: [Number],
  created_at: Date,
  rehoot: Number,
  likes: Number,
  comments: [commentSchema],
});

module.exports = { hootSchema };
