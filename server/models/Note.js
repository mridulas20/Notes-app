const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userId: String,
    text: String
});

module.exports = mongoose.model("Note", noteSchema);