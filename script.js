// Get the necessary elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to local storage
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to render tasks
const renderTasks = () => {
  // Clear the task list
  taskList.innerHTML = '';

  // Render each task
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" class="task-checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
      <span class="task-text ${task.completed ? 'task-completed' : ''}">${task.text}</span>
      <span class="delete-button" data-index="${index}">&times;</span>
    `;
    taskList.appendChild(listItem);
  });

  // Update the task count
  taskCount.textContent = `${tasks.filter(task => !task.completed).length} tasks remaining`;
};

// Function to add a new task
const addTask = (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
};

// Function to toggle task completion
const toggleTask = (e) => {
  if (e.target.matches('.task-checkbox')) {
    const index = e.target.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }
};

// Function to delete a task
const deleteTask = (e) => {
  if (e.target.matches('.delete-button')) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
};

// Event listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', toggleTask);
taskList.addEventListener('click', deleteTask);

// Initial rendering of tasks
renderTasks();
