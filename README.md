# HTTP Library + Tester UI
*Authors: Bria Tran, Eva Espindola, Ryan Fecarotta*

## Project Overview

This project includes a reusable front-end JavaScript library (`CoreHTTP`) for making HTTP requests (GET, POST, PUT, DELETE, and PATCH), along with a visual UI built with HTML/CSS/JavaScript to test and demonstrate its functionality. It supports dynamic routes, query parameters, and JSON payloads, and is designed to work with REST APIs like [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).

## Features

- Supports HTTP methods: `GET`, `POST`, `PUT`, `DELETE`, and `PATCH`
- Built with modern JavaScript `class` syntax
- All requests are asynchronous (`async` / `await`)
- Routes, query parameters, and JSON bodies supported
- Parses JSON responses and displays results in structured format
- Graceful error handling and fallback behavior
- Clean two-column UI with live form-based testing

## Live Testing UI

The project includes a simple web-based UI to test the HTTP library interactively:
- Select HTTP method (GET, POST, PUT, DELETE, PATCH)
- Enter the API endpoint path (e.g. `/users`)
- Add optional query parameters and request body in JSON format
- See formatted JSON results in real-time

## Usage Instructions

### 1. Launch the UI  
Open `index.html` in your browser. You will see a form on the left and a response viewer on the right.

### 2. Select Method & Input Data  
- Choose an HTTP method (GET, POST, etc.) from the dropdown.
- Enter the API endpoint (e.g., `/users`).
- (Optional) Add query parameters and request body in JSON format.

### 3. Send Request  
Click **"Send Request"**. The formatted response will appear in the viewer panel.
