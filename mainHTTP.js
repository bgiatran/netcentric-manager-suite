/** Title: HTTP Library Project
 *  Class: CSC3221 Group VI
 *  Purpose: Defines the CoreHTTP class for making HTTP requests to RESTful APIs.
 *  This reusable utility handles building URLs with query parameters, setting headers,
 *  and parsing JSON or text responses, while offering convenient methods for all common HTTP verbs.
 *  Authors: Bria Tran, Eva Espindola, Ryan Fecarotta
 *  Date: May 16th, 2025
 */

class CoreHTTP {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  async request(method, endpoint, data = null, queryParams = {}) {
      let url = this.baseURL + endpoint;

    // Append query parameters
    if (Object.keys(queryParams).length) {
      const query = new URLSearchParams(queryParams).toString();
      url += `?${query}`;
    }

    const options = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
    };

     // Only attach a body if data exists and method is not GET
    if (data && method !== "GET") {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const contentType = response.headers.get("content-type");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      // Return parsed JSON or plain text based on response type
      return contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();
    } catch (error) {
      // Return error message to display
      return { error: error.message };
    }
  }

  // Helper methods for HTTP verbs
  get(endpoint, queryParams = {}) {
    return this.request("GET", endpoint, null, queryParams);
  }

  post(endpoint, data = {}, queryParams = {}) {
    return this.request("POST", endpoint, data, queryParams);
  }

  put(endpoint, data = {}, queryParams = {}) {
    return this.request("PUT", endpoint, data, queryParams);
  }

  delete(endpoint, queryParams = {}) {
    return this.request("DELETE", endpoint, null, queryParams);
  }

  patch(endpoint, data = {}, queryParams = {}) {
    return this.request("PATCH", endpoint, data, queryParams);
  }
}