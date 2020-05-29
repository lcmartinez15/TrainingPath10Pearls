const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
    title: {
        type: String,
    },
    link: {
        type: String,
    },
    time: {
        type: String,
    },
    tags: {
        type: String,
    },
    img: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    exteralId: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("course", CourseSchema);