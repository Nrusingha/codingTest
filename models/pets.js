const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter pet name"],
        unique: true,
        trim: true,
    },
    age: {
        type: Number,
        required: [true, "Please enter age"]
    },
    colour: {
        type: String,
        required: [true, "Please enter colour"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);