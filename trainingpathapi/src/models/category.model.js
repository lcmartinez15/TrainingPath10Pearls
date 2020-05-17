const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({});

module.exports = mongoose.model("category", CategorySchema);