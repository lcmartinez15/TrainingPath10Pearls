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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chapter",
    },
});

module.exports = mongoose.model("logprocess", LogProcessSchema);