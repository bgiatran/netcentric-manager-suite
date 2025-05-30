/** Title: HTTP Library Project
 *  Class: CSC3221 Group VI
 *  Purpose: Defines the CoreHTTP class for making HTTP requests to RESTful APIs.
 *  This reusable utility handles building URLs with query parameters, setting headers,
 *  and parsing JSON or text responses, while offering convenient methods for all common HTTP verbs.
 *  Authors: Bria Tran, Eva Espindola, Ryan Fecarotta
 *  Date: May 16th, 2025
 */

class MainHTTP {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  // Build full URL with query parameters
  buildURL(endpoint, queryParams = {}) {
    let url = this.baseURL + endpoint;
    if (Object.keys(queryParams).length) {
      const query = new URLSearchParams(queryParams).toString();
      url += `?${query}`;
    }
    return url;
  }

  async request(method, endpoint, data = null, queryParams = {}) {
    const url = this.buildURL(endpoint, queryParams);

    const options = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data && method.toUpperCase() !== "GET") {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      return { error: error.message };
    }
  }

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
