const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({});

module.exports = mongoose.model("course", CourseSchema);