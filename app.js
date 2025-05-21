/** Title: HTTP Library Project
 *  Class: CSC3221 Group VI
 *  Purpose: Client-side controller logic that powers the UI.
 *  It captures user input from the HTML form, parses JSON for query and body data,
 *  and makes requests using the CoreHTTP instance.
 *  The server response is then rendered to the UI for debugging and exploration.
 *  Authors: Bria Tran, Eva Espindola, Ryan Fecarotta
 *  Date: May 16th, 2025
 */

// Remote API base URL
const api = new CoreHTTP("https://jsonplaceholder.typicode.com");

// Attach click event listener to the "Send Request" button
document.getElementById("request").addEventListener("click", async () => {
  const method = document.getElementById("method").value;
  const endpoint = document.getElementById("endpoint").value;
  const data = document.getElementById("data").value;
  const query = document.getElementById("query").value;

  // Parse the input JSON for body and query
  let parsedData = {};
    let parsedQuery = {};

  // Attempt to parse JSON input
  try {
    if (data.trim()) parsedData = JSON.parse(data);
    if (query.trim()) parsedQuery = JSON.parse(query);
  } catch (e) {
    document.getElementById("result").textContent = "Invalid JSON";
    return;
    }

  // Attempt to send the request using appropriate HTTP method
  try {
      const response = await api[method.toLowerCase()](endpoint, parsedData, parsedQuery);
    // Print response to result
    document.getElementById("result").textContent = JSON.stringify(response, null, 2);
  } catch (err) {
    // Handle unexpected errors
    document.getElementById("result").textContent = "Error: " + err.message;
  }
});

// Change cursor style when hovering over form or result containers for fun
const formContainer = document.querySelector('.form-container');
const resultContainer = document.querySelector('.result-container');

function setHoverCursor() {
    document.body.classList.remove("default-cursor");
}

function setDefaultCursor() {
    document.body.classList.add("default-cursor");
}

formContainer.addEventListener("mouseenter", setHoverCursor);
formContainer.addEventListener("mouseleave", setDefaultCursor);
resultContainer.addEventListener("mouseenter", setHoverCursor);
resultContainer.addEventListener("mouseleave", setDefaultCursor);
