const mongoose = require("mongoose");
const { categoryValues } = require("../data.js");

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        enum: categoryValues,
    },
    cost: { type: Number },
},
    { timestamps: true }
);
module.exports = mongoose.model("Category", CategorySchema);
