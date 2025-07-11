# Net-Centric Manager Suite

A modular suite of web-based applications built for **CSC 3221 - Net-Centric Computing**, focused on demonstrating modern client-server architecture, reusable HTTP libraries, and scalable full-stack development.

## Project Overview

The **Net-Centric Manager Suite** is a portfolio of interconnected web applications designed to highlight core concepts of net-centric computing, including HTTP communications, RESTful APIs, modular frontend/backend development, and lightweight state management.

### Completed Modules:
- **[CoreHTTP Library](#corehttp-library)** — a reusable JavaScript module for making HTTP requests (GET, POST, PUT, DELETE, PATCH).
- **[List Manager App](#list-manager-app)** — a full-stack web app that allows users to manage dynamic lists.
- **[Task Manager App](#task-manager-app)** — a scalable, feature-rich app for task tracking and management.

---

## CoreHTTP Library

**Location:** `/HTTP_Library/coreHTTP.js`

A lightweight and modular HTTP library written in vanilla JavaScript to standardize and simplify making network requests.

![List Manager UI](images/Screenshot%20(135).png)

### Features:
- Supports all major HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`)
- Built using Promises and `fetch()`
- Error handling and JSON parsing included
- Easily integratable into any frontend app

## List Manager App

**Location:** `/list-app/`

A simple web-based app to manage custom lists. Users can add, delete, and retrieve items via an Express.js API.

### Tech Stack:
- **Frontend:** HTML, CSS, Vanilla JavaScript  
- **Backend:** Node.js, Express  
- **Data Handling:** In-memory (or optionally file-based)

![List Manager UI](images/Screenshot%20(137).png) <!-- Replace with actual image path -->

### Key Features:
- Add/delete list items with real-time UI updates  
- REST API integration using CoreHTTP  
- Clean and modular frontend architecture  

---

## Task Manager App

**Location:** `/task-manager/`

An advanced task management system to handle tasks with optional statuses, deadlines, and categories. Designed to be extensible.

### Tech Stack:
- **Frontend:** HTML/CSS, Modular JavaScript, CoreHTTP  
- **Backend:** Node.js + Express  
- **Optional Extensions:** LocalStorage persistence or MongoDB support

![Task Manager UI](images/Screenshot%20(136).png) <!-- Replace with actual image path -->

### Features:
- Create, update, and delete tasks  
- Mark tasks as completed or pending  
- Modular code separation for easy maintenance  

---

## Future Enhancements
- Improve CSS styling and responsiveness
- Deploy on Vercel or Heroku for live testing
- Integrate Task Manager and List Manager into one unified suite
- 
---

## Getting Started

### Installation

Clone the repository:

```bash
git clone https://github.com/bgiatran/netcentric-manager-suite.git
cd netcentric-manager-suite
