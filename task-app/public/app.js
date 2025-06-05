/** Title: Task Manager Project
 *  Class: CSC3221 Group VI
 *  Purpose: This file defines and configures the Express
 *  application for the Task Manager web app.
 *  Authors: Bria Tran, Eva Espindola, Ryan Fecarotta
 *  Date: June 2, 2025
 */

// Import my CoreHTTP class so I can make API calls
import { CoreHTTP } from './coreHTTP.js';

// Create the API instance (points to my local server)
const api = new CoreHTTP("http://localhost:3000");

// Grab DOM elements that I need to work with
// (tabs, forms, progress bar, kanban columns, etc.)
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");

const taskTableBody = document.getElementById("task-table-body");

const kanbanTodo = document.getElementById("todo-tasks");
const kanbanInProgress = document.getElementById("inprogress-tasks");
const kanbanDone = document.getElementById("done-tasks");

const progressPercent = document.getElementById("progress-percent");
const progressBarFill = document.getElementById("progress-bar-fill");

const taskSummary = document.getElementById("task-summary");

// This array holds the current list of tasks
let tasks = [];

// When the page loads, run these functions:
document.addEventListener("DOMContentLoaded", () => {
    setupTabSwitching(); // set up the tabs
    loadTasks();         // load tasks from the server
});

// Sets up the tab buttons so they can switch between List View and Kanban
function setupTabSwitching() {
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");

            const id = button.id === "tab-list" ? "list-view" : "kanban-board";
            showTab(id);
        });
    });
}

// Shows the correct tab (hides the others)
function showTab(tabId) {
    tabContents.forEach(content => {
        content.classList.remove("active");
    });
    document.getElementById(tabId).classList.add("active");
}

// Loads tasks from the server (GET request)
async function loadTasks() {
    try {
        const response = await api.get("/tasks");
        if (response.tasks && Array.isArray(response.tasks)) {
            tasks = response.tasks;
            renderTasks(); // show them on the page
        } else {
            showError("Failed to load tasks.");
        }
    } catch (err) {
        showError("Error loading tasks: " + err.message);
    }
}

// Renders all tasks into List View and Kanban
function renderTasks() {
    // Clear current views
    taskTableBody.innerHTML = "";
    kanbanTodo.innerHTML = "";
    kanbanInProgress.innerHTML = "";
    kanbanDone.innerHTML = "";

    // Add each task to the views
    tasks.forEach(task => {
        renderTaskRow(task);
        renderKanbanCard(task);
    });

    updateProgress();
}

// When the user submits the Add Task form
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (!text) return; // don't allow empty task

    try {
        const newTask = await api.post("/tasks", {
            text: `${text} [${priority}]`,
            completed: false
        });

        if (newTask.task) {
            tasks.push(newTask.task);
            renderTasks();

            // Reset the form
            taskInput.value = "";
            prioritySelect.value = "Low";
        } else {
            showError("Error creating task.");
        }
    } catch (err) {
        showError("Error creating task: " + err.message);
    }
});

// Renders one task into the List View table
function renderTaskRow(task) {
    const row = document.createElement("tr");

    // Checkbox column
    const checkboxTd = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(task));
    checkboxTd.appendChild(checkbox);

    // Task name column
    const nameTd = document.createElement("td");
    nameTd.textContent = task.text;

    // If task is completed, show strike-through
    if (task.completed) {
        nameTd.style.textDecoration = "line-through";
        nameTd.style.color = "#888";
    }

    // Priority column
    const priorityTd = document.createElement("td");
    const priority = extractPriority(task.text);
    priorityTd.textContent = priority;

    // Actions column (delete button)
    const actionsTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => deleteTask(task));
    actionsTd.appendChild(deleteBtn);

    // Put it all together
    row.appendChild(checkboxTd);
    row.appendChild(nameTd);
    row.appendChild(priorityTd);
    row.appendChild(actionsTd);

    taskTableBody.appendChild(row);
}

// Renders one task into the Kanban Board
function renderKanbanCard(task) {
    const card = document.createElement("div");
    card.className = "kanban-task-card";
    card.textContent = task.text;

    const priority = extractPriority(task.text);
    card.style.borderLeft = priorityColor(priority);

    // Optional drag feature
    card.draggable = true;
    card.addEventListener("dragstart", () => card.classList.add("dragging"));
    card.addEventListener("dragend", () => card.classList.remove("dragging"));

    // Put in the right column
    if (task.completed) {
        kanbanDone.appendChild(card);
    } else {
        kanbanTodo.appendChild(card);
    }
}

// Toggles whether a task is completed or not
async function toggleComplete(task) {
    try {
        const updated = await api.put(`/tasks/${task._id}`, {
            text: task.text,
            completed: !task.completed
        });

        if (updated.task) {
            const index = tasks.findIndex(t => t._id === task._id);
            if (index !== -1) {
                tasks[index] = updated.task;
            }
            renderTasks();
        } else {
            showError("Failed to update task.");
        }
    } catch (err) {
        showError("Error updating task: " + err.message);
    }
}

// Deletes a task from the server and local state
async function deleteTask(task) {
    try {
        const res = await api.delete(`/tasks/${task._id}`);
        if (res.success) {
            tasks = tasks.filter(t => t._id !== task._id);
            renderTasks();
        } else {
            showError("Failed to delete task.");
        }
    } catch (err) {
        showError("Error deleting task: " + err.message);
    }
}

// Updates the progress bar and task summary
function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressPercent.textContent = `${percent}%`;
    progressBarFill.style.width = `${percent}%`;

    // Update the text summary
    taskSummary.textContent = `You have ${tasks.length} tasks (${completed} completed).`;
}

// Extracts the priority type from the task text
function extractPriority(text) {
    if (text.includes("[High]")) return "High";
    if (text.includes("[Medium]")) return "Medium";
    if (text.includes("[Low]")) return "Low";
    return "Unknown";
}

// Returns a color border based on priority
function priorityColor(priority) {
    switch (priority) {
        case "High": return "4px solid red";
        case "Medium": return "4px solid orange";
        case "Low": return "4px solid green";
        default: return "4px solid gray";
    }
}

// Displays an error message in the console (could also show on screen if needed)
function showError(message) {
    console.error(message);
}