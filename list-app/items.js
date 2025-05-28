/** Title: List Manager Project
 *  Class: CSC3221 Group VI
 *  Purpose: Client-side controller logic for the List Manager UI.
 *  Authors: Bria Tran, Eva Espindola, Ryan Fecarotta
 *  Date: May 24th, 2025
 */

const api = new MainHTTP("http://localhost:3000");

// Function to render the list of items in the UI
function renderItems(items) {
  const list = document.getElementById("item-list");
  list.innerHTML = ""; // Clear current list

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

// Function to fetch items from server and update UI
async function fetchItems() {
  try {
    const response = await api.get("/items");
    if (response.error) {
      showError(response.error);
    } else {
      renderItems(response.items || []);
      clearError();
    }
  } catch (err) {
    showError("Failed to fetch items: " + err.message);
  }
}

// Function to add a new item by sending POST to server
async function addItem(text) {
  if (!text.trim()) {
    showError("Item cannot be empty");
    return;
  }

  try {
    const response = await api.post("/submit", { newitem: text });
    if (response.error) {
      showError(response.error);
    } else {
      clearError();
      fetchItems();  // Refresh the list after successful add
    }
  } catch (err) {
    showError("Failed to add item: " + err.message);
  }
}

// Show error message in UI
function showError(message) {
  document.getElementById("error-message").textContent = message;
}

// Clear error message in UI
function clearError() {
  document.getElementById("error-message").textContent = "";
}

// Set up event listener for Add Item button click
document.getElementById("add-item-btn").addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent form submission reload

  const input = document.getElementById("new-item");
  await addItem(input.value);
  input.value = ""; // Clear input after submit
});

// Fetch and display items when page loads
fetchItems();
