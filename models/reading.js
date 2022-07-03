const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String
})

module.exports = mongoose.model('Reading', readingSchema);