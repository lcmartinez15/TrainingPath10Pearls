const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChapterSchema = new Schema({});

module.exports = mongoose.model("chapter", ChapterSchema);