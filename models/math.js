const mongoose = require('mongoose');

const mathSchema = mongoose.Schema({
    title: String,
    description: String,
    link: String
});

module.exports = mongoose.model('Math', mathSchema);