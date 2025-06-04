/** Title: Task Manager Project
 *  Class: CSC3221 Group VI
 *  Purpose: This file defines and configures the Express 
 *  application for the Task Manager web app.
 *  Authors: Bria Tran, Eva Espindola, Ryan Fecarotta
 *  Date: June 2, 2025
 */

// Remote API base URL
const api = new MainHTTP("https://jsonplaceholder.typicode.com");

// DOM elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Create task
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  const newTask = await api.post("/", { text, completed: false });
  if (!newTask.error) {
    renderTask(newTask);
    taskInput.value = "";
  } else {
    alert("Error creating task.");
  }
});

// Load and render all tasks
async function loadTasks() {
  const tasks = await api.get("/");
  if (Array.isArray(tasks)) {
    tasks.forEach(renderTask);
  }
}

// Render one task item
function renderTask(task) {
  const li = document.createElement("li");
  li.dataset.id = task._id;
  li.className = task.completed ? "completed" : "";

  const span = document.createElement("span");
  span.textContent = task.text;
  if (task.completed) span.style.textDecoration = "line-through";
  li.appendChild(span);

  // Complete/incomplete toggle
  li.addEventListener("click", async () => {
    const updated = await api.put(`/${task._id}`, {
      text: task.text,
      completed: !task.completed,
    });
    if (!updated.error) {
      li.classList.toggle("completed");
      span.style.textDecoration = updated.completed ? "line-through" : "none";
      task.completed = updated.completed;
    }
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "✕";
  delBtn.className = "delete-btn";
  delBtn.addEventListener("click", async (e) => {
    e.stopPropagation(); // Don’t trigger toggle
    const res = await api.delete(`/${task._id}`);
    if (!res.error) {
      li.remove();
    }
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}
