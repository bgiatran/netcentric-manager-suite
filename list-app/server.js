/** Title: List Manager Project
 *  Class: CSC3221 Group VI
 *  Purpose: Server logic, using Node.js and the express module to read and write to a server
 *  Authors: Bria Tran, Eva Espindola, Ryan Fecarotta
 *  Date: May 26th, 2025
 */

// required modules
const express = require('express');
const fs = require('fs')
const path = require('path')
const bodyParser = require("body-parser")

// create app object
const app = express();

app.set("views", path.join(__dirname));
app.set("view engine", "ejs");

// Get basic list page 
app.get("/", (req, res) => {
    res.send(fs.readFileSync('items.html', {encoding: 'utf-8'}));
});

// body parser middleware. Sets it up to process text input from user
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/submit", (req, res) => {
    var inputText = req.body.newitem;
    addItem(inputText);
    res.send(fs.readFileSync('items.html', {encoding: 'utf-8'}));
})

// set port and start server
const PORT = 3000
app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server is running on http://localhost:${PORT}`)
});


function addItem(input) {
    fs.appendFile(path.join('files', 'items.csv'), input + ',', (error) => {if (error) throw error});
}
