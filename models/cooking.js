const mongoose = require('mongoose');

const cookingSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String
})

module.exports = mongoose.model('Cooking', cookingSchema);