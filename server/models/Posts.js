const mongoose = require("mongoose");
const { avatarSchema } = require("./User");

const mediaSchema = new mongoose.Schema({
  width: Number,
  height: Number,
});

const authorSchema = new mongoose.Schema({
  username: String,
  avatar: avatarSchema,
});

const postSchema = new mongoose.Schema(
  {
    text: String,
    has_media: Boolean,
    media: mediaSchema,
    rehoot: Number,
    likes: Number,
    author: authorSchema,
  },
  { timestamps: { createdAt: "created_at", currentTime: () => "time_created" } }
);

module.exports = {
  postModel: mongoose.model("post", postSchema, "Posts"),
  postSchema,
};
