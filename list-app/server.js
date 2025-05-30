/** Title: List Manager Project
 *  Class: CSC3221 Group VI
 *  Purpose: Server logic, using Node.js and the express module to read and write to a server
 *  Authors: Bria Tran, Eva Espindola, Ryan Fecarotta
 *  Date: May 26th, 2025
 */

// Import required modules
const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

// Path to the JSON file that stores the list of items
const filePath = path.join(__dirname, 'items.json');

// Parse incoming JSON request bodies
app.use(express.json());

// Server static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Function: readItems()
// Purpose: reads the items from items.json file
const readItems = () => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
        return [];  // If file is empty or invalid
    }
};

// GET all items
app.get('/api/items', (req, res) => res.json(readItems()));

// POST new item
// Adds a new item to the list
app.post('/api/items', (req, res) => {
    const items = readItems();

    // Validate input
    if (!req.body.newitem || !req.body.newitem.trim()) {
        return res.status(400).json({ error: 'Item cannot be empty' });
    }

    // Add newitem
    items.push(req.body.newitem.trim());

    // Save updated list to file
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
    res.status(201).json({ success: true });
});

// DELETE item by index
app.delete('/api/items/:index', (req, res) => {
    const items = readItems();
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= items.length) {
        return res.status(400).json({ error: 'Invalid index' });
    }

    // Remove item from array
    const removed = items.splice(index, 1);

    // Save updated list
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
    res.json({ success: true, removed });
});

// PUT (replace) item
app.put('/api/items/:index', (req, res) => {
    const items = readItems();
    const index = parseInt(req.params.index);

    // Validate index
    if (isNaN(index) || index < 0 || index >= items.length) {
        return res.status(400).json({ error: 'Invalid index' });
    }

    // Validate new value
    if (!req.body.newitem || !req.body.newitem.trim()) {
        return res.status(400).json({ error: 'New value cannot be empty' });
    }

    // Replace item
    items[index] = req.body.newitem.trim();
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
    res.json({ success: true });
});

// PATCH (partial update) — for demo we'll append text
app.patch('/api/items/:index', (req, res) => {
    const items = readItems();
    const index = parseInt(req.params.index);

    // Validate index
    if (isNaN(index) || index < 0 || index >= items.length) {
        return res.status(400).json({ error: 'Invalid index' });
    }

    // Append patch value to existing item
    if (!req.body.patchvalue || !req.body.patchvalue.trim()) {
        return res.status(400).json({ error: 'Patch value cannot be empty' });
    }

    // Append patch value to existing item
    items[index] += ` ${req.body.patchvalue.trim()}`;
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
    res.json({ success: true });
});


// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));