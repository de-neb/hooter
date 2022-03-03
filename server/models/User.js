const mongoose = require("mongoose");
const { hootSchema } = require("./Hoot");

const avatarSchema = new mongoose.Schema({ any: {} });

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    avatar: avatarSchema,
    hoots: [hootSchema],
    birthdate: Date,
    followers: Number,
    following: Number,
    bio: String,
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("user", userSchema, "Users");
