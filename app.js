// Define UI VARS
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners (globalscope)
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks() {
  //init tasks
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');
    // Add class name to li element
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create a new link
    const link = document.createElement('a');
    // Add class name to link
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to LI
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add tasks
function addTask(e) {
  if (taskInput.value === '') {
    alert('Task list is empty, please add new task!');
  }
  // Create li element
  const li = document.createElement('li');
  // Add class name to li element
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create a new link
  const link = document.createElement('a');
  // Add class name to link
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to LI
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  //Store in localstorage
  storeTaskInLocalStorage(taskInput.value);
  // Clear input
  taskInput.value = '';

  e.preventDefault;
}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Taks
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {

    e.target.parentElement.parentElement.remove();

    // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  //check LS
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  //Loop throught listItems and remove targets
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  //Update the LS
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
  // Empty string
  // taskList.innerHTML = '';

  //Faster 
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //Clear LS
  clearTasksFromLocalStorage();
}

// Clear from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  // Get a input value
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    // text content for firstchild
    const item = task.firstChild.textContent;
    // check
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}