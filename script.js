document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Add a new task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    addTask(taskText);
    saveTask(taskText);
    taskInput.value = "";
});


// Function to create a task element
function addTask(text, completed = false) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="${completed ? 'completed' : ''}">${text}</span>
        <button class="delete-btn">X</button>
    `;

    li.querySelector("span").addEventListener("click", () => {
        li.querySelector("span").classList.toggle("completed");
        updateTask(text);
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
        removeTask(text);
        li.remove();
    });

    taskList.appendChild(li);
}


// Save task to local storage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}


// Update task status in local storage
function updateTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => 
        task.text === taskText ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Remove task from local storage
function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

