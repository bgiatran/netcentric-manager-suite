/** Title: HTTP Library Project
 *  Class: CSC3221 Group VI
 *  Purpose: This is a reusable library class for sending HTTP
 *  requests (GET, POST, PUT, PATCH, DELETE) to a REST API.
 *  Authors: Bria Tran, Eva Espindola, Ryan Fecarotta
 *  Date: May 30th, 2025
 */

// CoreHTTP library — reusable for sending HTTP requests
export class CoreHTTP {
    constructor(baseURL = '') {
        this.baseURL = baseURL; // Set the base URL
    }

    // Build full URL with query parameters
    buildURL(endpoint, queryParams = {}) {
        let url = this.baseURL + endpoint;

        // If query parameters are provided append them
        if (Object.keys(queryParams).length) {
            const query = new URLSearchParams(queryParams).toString();
            url += `?${query}`;
        }
        return url;
    }

    // Core request function — used by GET, POST, PUT, DELETE, PATCH
    async request(method, endpoint, data = null, queryParams = {}) {
        const url = this.buildURL(endpoint, queryParams);

        const options = {
            method: method.toUpperCase(),
            headers: {
                "Content-Type": "application/json",
            },
        };

        // For non-GET requests include body data
        if (data && method.toUpperCase() !== "GET") {
            options.body = JSON.stringify(data);
        }

        try {
            // Send request using Fetch API
            const response = await fetch(url, options);

            // If response not OK throw error
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
            }

            // If response is JSON then parse and return it
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else {
                // Fallback to text response
                return await response.text();
            }
        } catch (error) {
            // Return error message
            return { error: error.message };
        }
    }

    // Helper methods for each HTTP verb
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