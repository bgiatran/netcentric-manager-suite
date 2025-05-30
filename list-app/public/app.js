/** Title: HTTP Library Project
 *  Class: CSC3221 Group VI
 *  Purpose: This is the frontend JavaScript controller for the List Manager app.
 *  It handles interactions with the backend API using the CoreHTTP library,
 *  updates the DOM to reflect the current list of items, and provides functions
 *  to add, delete, replace (PUT), and append to (PATCH) list items.
 *  Authors: Bria Tran, Eva Espindola, Ryan Fecarotta
 *  Date: May 30th, 2025
 */

// Import CoreHTTP class from our library
import { CoreHTTP } from './coreHTTP.js';

// Create CoreHTTP instance for API requests
const api = new CoreHTTP('/api');

// Function: fetchItems(0
// Purpose: GET all items from the server and display them in the HTML list
async function fetchItems() {
    // Send GET request to /api/items
    const response = await api.get('/items');
    const list = document.getElementById('list');

    // Clear the current list so we can re-render
    list.innerHTML = '';

    // Render each item with its Delete button
    (response || []).forEach((item, index) => {
        const li = document.createElement('li');

        // Set the text content to show index and item value
        li.textContent = `${index}: ${item}`;

        // Create a Delete button for this item
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => deleteItem(index);

        // Add the button to the list item
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

// Function: addItem()
// Purpose: add a new item to the list
async function addItem() {
    // Get the value from the input field
    const value = document.getElementById('item').value;

    // Check if the input is empty
    if (!value || !value.trim()) {
        showError('Item cannot be empty');
        return;
    }

    // Send POST request to add the new item
    const response = await api.post('/items', { newitem: value.trim() });
    if (response.error) {
        showError(response.error);
    } else {
        clearError();

        // Clear the input field
        document.getElementById('item').value = '';

        // Refresh the list to show the new item
        await fetchItems();
    }
}

// Function: deleteItem()
// Purpose: Delete an item by index
async function deleteItem(index) {
    // Send DELETE request to/api/items/:index
    const response = await api.delete(`/items/${index}`);
    if (response.error) {
        showError(response.error);
    } else {
        clearError();

        // Refresh the list to reflect deletion
        await fetchItems();
    }
}

// Function: putItem()
// Purpose: Replace an item at a given index (PUT)
async function putItem() {
    //Get index and new value form input fields
    const index = document.getElementById('put-index').value;
    const value = document.getElementById('put-value').value;

    // Validate inputs
    if (index === '' || isNaN(index) || !value.trim()) {
        showError('Please enter a valid index and new value');
        return;
    }

    // Send PUT request to update the item
    const response = await api.put(`/items/${index}`, { newitem: value.trim() });
    if (response.error) {
        showError(response.error);
    } else {
        clearError();

        // Clear input fields
        document.getElementById('put-index').value = '';
        document.getElementById('put-value').value = '';
        await fetchItems();
    }
}

// Function: patchItem()
// Purpose: Append text to an item at a given index (PATCH)
async function patchItem() {
    // Get index and patch value form input fields
    const index = document.getElementById('patch-index').value;
    const value = document.getElementById('patch-value').value;
    if (index === '' || isNaN(index) || !value.trim()) {
        showError('Please enter a valid index and patch value');
        return;
    }

    //Send PTACH request to append text to item
    const response = await api.patch(`/items/${index}`, { patchvalue: value.trim() });
    if (response.error) {
        showError(response.error);
    } else {
        clearError();
        document.getElementById('patch-index').value = '';
        document.getElementById('patch-value').value = '';
        await fetchItems();
    }
}

// Display error messsage in UI
function showError(message) {
    document.getElementById('error-message').textContent = message;
}

// Clear any error message
function clearError() {
    document.getElementById('error-message').textContent = '';
}

// Expose functions to global scope for buttons to use
window.addItem = addItem;
window.putItem = putItem;
window.patchItem = patchItem;

// On page load fetch initial list of items
window.onload = fetchItems;