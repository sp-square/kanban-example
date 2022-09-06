// DOM variables
var formEl = document.querySelector('form');
var inputTaskNameEl = document.querySelector("input[name='task-name']");
var inputTaskTypeEl = document.querySelector("input[name='task-type']");
var tasksToDoListEl = document.getElementById('tasks-to-do');
var tasksInProgressListEl = document.getElementById('tasks-in-progress');
var tasksCompletedListEl = document.getElementById('tasks-completed');

// Global variables
var tasks; // this will be an array to hold our tasks and make them available globally
var taskIdTracker; // this will keep track of the next id number available for a new task being created

// TODO - Function to trigger actions to take when the page loads
function init() {
  // Retrieve our tasks from local storage
  tasks = JSON.parse(localStorage.getItem('tasks'));
  console.log(tasks);

  // If there are no tasks, initialize tasks and taskIdTracker, and  exit the function
  if (!tasks) {
    console.log('There were no tasks saved in local storage.');
    tasks = [];
    taskIdTracker = 0;
    return;
  }

  // TODO - Loop through our array of retrieved tasks and display each task in its proper section. Also initialize 'taskIdTracker' to the next number available.
}

init();

/***************************/
/***** Event listeners *****/
/***************************/

function taskFormHandler(event) {
  event.preventDefault();

  // Retrieve value from input elements
  var taskName = inputTaskNameEl.value.trim();
  var taskType = inputTaskTypeEl.value.trim();

  // Verify that user did provide both a task name and a task type
  if (!taskName || !taskType) {
    alert('Please provide both a task name and a task type');
    return;
  }

  // Create a new task object
  var newTaskObj = {
    id: taskIdTracker,
    name: taskName,
    type: taskType,
    status: 'To Do',
  };

  createTask(newTaskObj);

  // Reset form fields
  inputTaskNameEl.value = '';
  inputTaskTypeEl.value = '';
}

// Listen for a form submission event
formEl.addEventListener('submit', taskFormHandler);

/****************************/
/****** CRUD functions ******/
/****************************/
// CRUD: Create, Read, Update, Delete

// CREATE
// TODO - Function to create a new task
function createTask(newTask) {
  // console.log('newTask passed in createTask function:', newTask);
  // TODO - Display the new task in the 'To Do' section
  displayTask(newTask);

  // TODO - Save the new task

  // TODO - Increase task id tracker for next unique task id
}

// READ
// TODO - Function to display a task into its correct section
function displayTask(task) {
  console.log('task passed in displayTask function:', task);
  // Create a 'li' element for the task to be displayed
  var taskListItemEl = document.createElement('li');
  taskListItemEl.setAttribute('class', 'task-item');
  taskListItemEl.setAttribute('data-taskId', task.id);

  // Create and append task information to the li element
  var taskInfoEl = document.createElement('div');
  taskInfoEl.innerHTML =
    '<h3 class="task-name">' +
    task.name +
    '</h3><span class="task-type"> - ' +
    task.type +
    '</span>';
  taskListItemEl.appendChild(taskInfoEl);

  // Create and append task actions to the li element
  var taskActionsEl = document.createElement('div');
  taskActionsEl.setAttribute('class', 'task-actions');
  taskListItemEl.appendChild(taskActionsEl);
  // Create edit button
  var editTaskEl = document.createElement('button');
  editTaskEl.textContent = 'Edit';
  editTaskEl.setAttribute('class', 'editBtn');
  editTaskEl.setAttribute('data-taskId', task.id);
  taskActionsEl.appendChild(editTaskEl);
  // Create delete button
  var deleteTaskEl = document.createElement('button');
  deleteTaskEl.textContent = 'Delete';
  deleteTaskEl.setAttribute('class', 'deleteBtn');
  deleteTaskEl.setAttribute('data-taskId', task.id);
  taskActionsEl.appendChild(deleteTaskEl);
  // Create change task status dropdown
  var selectTaskStatusEl = document.createElement('select');
  selectTaskStatusEl.setAttribute('name', 'task-status');
  selectTaskStatusEl.setAttribute('data-taskId', task.id);
  taskActionsEl.appendChild(selectTaskStatusEl);
  // Create task status options
  var statusOptions = ['To Do', 'In Progress', 'Completed'];
  for (var i = 0; i < statusOptions.length; i++) {
    var statusOptionEl = document.createElement('option');
    statusOptionEl.setAttribute('value', statusOptions[i]);
    statusOptionEl.textContent = statusOptions[i];
    selectTaskStatusEl.appendChild(statusOptionEl);
  }

  // Append the new list item to the correct ul (is it the ul located in the 'Tasks To Do' section, the 'Tasks In Progress' section, or the 'Tasks Completed' section?)
  // TODO - might need to also set the selectedIndex property of the select element 'selectTaskStatusEl' to its correct index
  if (task.status === 'To Do') {
    tasksToDoListEl.append(taskListItemEl);
  } else if (task.status === 'In Progress') {
    tasksInProgressListEl.append(taskListItemEl);
  } else if (task.status === 'Completed') {
    tasksCompletedListEl.append(taskListItemEl);
  } else {
    alert('Oops, something went wrong!');
  }
  console.log(
    'selectTaskStatusEl.selectedIndex',
    selectTaskStatusEl.selectedIndex
  );
}
