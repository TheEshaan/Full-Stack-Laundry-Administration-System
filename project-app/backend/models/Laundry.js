const mongoose = require("mongoose");
const { categoryValues } = require("../data.js");
const User = require("./User");
const LaundrySchema = new mongoose.Schema({
    customer: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
    category: {
        type: String,
        enum: categoryValues,
    },
    items: {type: [{
        itemType: { type: String },
        quantity: { type: Number, default: 1 },
    } ]},
    status: { type: String, default: "Pending" },
    cost: { type: Number },
},
    { timestamps: true }
);
module.exports = mongoose.model("Laundry", LaundrySchema);
