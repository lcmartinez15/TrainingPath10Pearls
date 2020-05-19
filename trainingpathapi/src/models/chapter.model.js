const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChapterSchema = new Schema({
    name: {
        type: String,
    },
    time: {
        type: String,
    },
    percentage: {
        type: String,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
    },
});

module.exports = mongoose.model("chapter", ChapterSchema);