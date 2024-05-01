const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

// Define the application schema
const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    genre: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    reviews: [reviewSchema] // Embedding review schema into application schema
});

// Create a model based on the schema
const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
