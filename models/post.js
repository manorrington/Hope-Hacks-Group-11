const mongoose = require('mongoose');

const resourcesSchema = mongoose.Schema({
    title: String,
    description: String,
    link: String
});

module.exports = mongoose.model('Resources', resourcesSchema);