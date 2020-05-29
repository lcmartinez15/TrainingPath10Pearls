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
        courseRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "course",
        },
        status: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            required: true,
        },
    }, ],
});

module.exports = mongoose.model("usertrainingpath", UserTrainingPathSchema);