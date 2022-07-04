const mongoose = require('mongoose');

const scienceSchema = mongoose.Schema({
    title: String,
    description: String,
    link: String
});

module.exports = mongoose.model('Science', scienceSchema);