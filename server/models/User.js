const mongoose = require("mongoose");
const { hootSchema } = require("./Hoot");
const userSchema = new mongoose.Schema(
  {
    name: String,
    bio: String,
    username: String,
    email: String,
    birthdate: Date,
    hoots: [hootSchema],
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = new mongoose.model("user", userSchema);
