/**
 * Title: Task Model
 * Purpose: Defines Task schema for MongoDB
 * Author: Bria Tran, Eva Espindola, Ryan Fecarotta
 * Date: June 1st, 2025
 */

// Import mongoose so we can use it to work with MongoDB
const mongoose = require('mongoose');

// Define Task schema
const taskSchema = new mongoose.Schema({

    // The text/description of the task
    text: {
        type: String,
        required: true // Task must have text
    },

    // Whether the task is completed or not
    completed: {
        type: Boolean,
        default: false // Default value is not completed
    }
});

// Export the Task model so we can use it in other files (like server.js)
module.exports = mongoose.model('Task', taskSchema);