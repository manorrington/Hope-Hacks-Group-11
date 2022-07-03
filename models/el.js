const mongoose = require('mongoose');

const elSchema = mongoose.Schema({
    title: String,
    description: String,
    link: String
});

module.exports = mongoose.model('EL', elSchema);