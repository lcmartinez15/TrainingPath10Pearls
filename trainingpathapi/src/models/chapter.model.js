const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChapterSchema = new Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    time: {
        type: String,
    },
    percentage: {
        type: String,
    },
    description: {
        type: String,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
    },
    exteralId: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("chapter", ChapterSchema);