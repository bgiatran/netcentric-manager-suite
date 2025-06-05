/**
 * Title: Task Manager Backend Server
 * Purpose: Backend for Task Manager Application
 *          Connects to MongoDB Atlas, provides REST API to manage tasks.
 * Authors: Bria Tran, Eva Espindola, Ryan Fecarotta
 * Date: June 1st, 2025
 */

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task'); // Import my Task model
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests (needed for frontend to talk to backend)
app.use(express.json()); // Automatically parse JSON in requests
app.use(express.static('public')); // Serve static files from 'public' folder

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes (these are my API endpoints)

// GET /tasks - return all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); // Get all tasks from database
        res.json({ tasks }); // Send tasks back as JSON
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// POST /tasks - create a new task
app.post('/tasks', async (req, res) => {
    try {
        // Create new Task object with text from request body
        const newTask = new Task({ text: req.body.text });
        await newTask.save(); // Save new task to database
        console.log('Task saved:', newTask);
        res.json({ task: newTask }); // Send new task back as JSON
    } catch (err) {
        console.error('Error saving task:', err);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// PUT /tasks/:id - update a task (mark complete or edit text)
app.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, // find by ID
            { text: req.body.text, completed: req.body.completed }, // update fields
            { new: true } // return the updated document
        );
        res.json({ task: updatedTask });
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// DELETE /tasks/:id - delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id); // delete by ID
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Start the server and listen on specified port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});