const mongoose = require("mongoose");
const userSchemaAlt = new mongoose.Schema({
  any: {},
});

const commentSchema = new mongoose.Schema({
  text: String,
  user: userSchemaAlt,
});

module.exports = { commentSchema };
