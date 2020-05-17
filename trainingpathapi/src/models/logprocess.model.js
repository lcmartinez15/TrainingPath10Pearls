const mongoose = require("mongoose");
const { Schema } = mongoose;

const LogProcessSchema = new Schema({});

module.exports = mongoose.model("logprocess", LogProcessSchema);