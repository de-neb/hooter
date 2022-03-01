const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  username: "String",
  first_name: "String",
  last_name: "String",
  avatar: "String",
});

module.exports = { commentSchema };
