/** Title: HTTP Library Project
 *  Class: CSC3221 Group VI
 *  Purpose: Client-side controller logic that powers the UI.
 *  It captures user input from the HTML form, parses JSON for query and body data,
 *  and makes requests using the CoreHTTP instance.
 *  The server response is then rendered to the UI for debugging and exploration.
 *  Authors: Bria Tran, Eva Espindola, Ryan Fecarotta
 *  Date: May 16th, 2025
 */

// Initialize CoreHTTP with the remote API base URL
const api = new CoreHTTP("https://jsonplaceholder.typicode.com");

// Attach click event listener to the "Send Request" button
document.getElementById("sendRequest").addEventListener("click", async () => {
  const method = document.getElementById("method").value;
  const endpoint = document.getElementById("endpoint").value;
  const data = document.getElementById("data").value;
  const query = document.getElementById("query").value;

  // Parse the input JSON for body and query
  let parsedData = {};
    let parsedQuery = {};

  // Attempt to parse JSON input; show error if invalid
  try {
    if (data.trim()) parsedData = JSON.parse(data);
    if (query.trim()) parsedQuery = JSON.parse(query);
  } catch (e) {
    document.getElementById("result").textContent = "Invalid JSON in data or query";
    return;
    }

  // Attempt to send the request using the appropriate HTTP method
  try {
      const response = await api[method.toLowerCase()](endpoint, parsedData, parsedQuery);
    // Pretty-print the response to the result panel
    document.getElementById("result").textContent = JSON.stringify(response, null, 2);
  } catch (err) {
    // Handle unexpected errors (e.g., network issues)
    document.getElementById("result").textContent = "Error: " + err.message;
  }
});