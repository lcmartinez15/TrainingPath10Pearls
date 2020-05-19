const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserTrainingPathSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    courses: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "course",
        },
        status: {
            type: String,
        },
    }, ],
});

module.exports = mongoose.model("usertrainingpath", UserTrainingPathSchema);