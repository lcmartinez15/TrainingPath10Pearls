const mongoose = require("mongoose");
const { Schema } = mongoose;

const LogProcessSchema = new Schema({
  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  chapterRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chapter",
  },
});

module.exports = mongoose.model("logprocess", LogProcessSchema);
