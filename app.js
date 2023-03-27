'use strict';

////////////////////// Selectors Section //////////////////////

const taskInput = document.querySelector('.task-placeholder');

const assigneeInput = document.querySelector('.assignee-placeholder');

const addBtn = document.querySelector('.add-btn');
const switchBtn = document.querySelector('.switch-btn');

const searchInput = document.querySelector('.search-bar');
const clearSearchBtn = document.querySelector('.clear-search');

const tasksListContainer = document.querySelector('.task-list-container');

const taskText = document.querySelector('.task-text');
const assigneeText = document.querySelector('.assignee-text');
const deleteTaskBtn = document.querySelector('.delete-btn');
const checkTaskBtn = document.querySelector('.check-btn');

const todoTasks = document.querySelector('.todo-counter');
const doneTasks = document.querySelector('.done-counter');

const popupConfirmationBox = document.querySelector('.popup-box');
const popupCancelBtn = document.querySelector('.cancel-btn');
const popupOkBtn = document.querySelector('.ok-btn');

let data = [];
let counter = 0;

//////////////////////  Render Function  Section //////////////////////

const renderData = function (data) {
  // Clear the current tasks
  tasksListContainer.innerHTML = '';

  // Loop through the tasks array and create li element for each one
  data.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `<div class="task-main-container">
    <div class="task-container">
      <div>
        <h1 class="task-label-text">Task :</h1>
        <p class="task-text">${task.name}</p>
      </div>
    </div>

    <div class="assignee-container">
      <div>
        <h1 class="assignee-label-text">Assignee :</h1>
        <p class="assignee-text">${task.assignee}</p>
      </div>
      <div class="check-and-delete-btns">
      <div class="check-btn">
        <i class="fa-solid fa-circle-check task-icon"></i>
      </div>
      <div class="delete-btn">
        <i class="fa-solid fa-trash-can task-icon"></i>
      </div>
    </div>
  </div>`;

    // Append the element to the (ul) Parent
    tasksListContainer.appendChild(taskItem);
  });
};

//////////////////////  function to add task //////////////////////
const addTask = function () {
  // Check that task and assignee are not empty
  // if true Create an object with the task and assignee inputs values

  if (taskInput.value && assigneeInput.value) {
    const taskObj = {
      name: taskInput.value,
      assignee: assigneeInput.value,
    };

    // Add the object to the data array

    data.push(taskObj);

    // Render the Data array to the DOM

    renderData(data);

    // Clear the input fields
    taskInput.value = '';
    assigneeInput.value = '';

    // Update the ToDo statistics counter

    counter++;
    todoTasks.textContent = counter;
  } else {
    alert('Please fill in both task and assignee fields.');
  }
};

////////////////////// add task on button  click ////////////////////

addBtn.addEventListener('click', addTask);

////////////////////// add task on enter key press  ///////////////////

taskInput.addEventListener('keypress', function (event) {
  if (event.keyCode === 13) {
    addTask();
  }
});

assigneeInput.addEventListener('keypress', function (event) {
  if (event.keyCode === 13) {
    addTask();
  }
});

/////////////////////////// Search bar section  //////////////////////////////////

//////// creating the  Clear functionality of the x mark button  ////////////

// Add an event listener to the search bar to show/hide the x mark icon
searchInput.addEventListener('input', () => {
  if (searchInput.value !== '') {
    clearSearchBtn.style.display = 'block';
  } else {
    clearSearchBtn.style.display = 'none';
  }
});

clearSearchBtn.addEventListener('click', function () {
  // Clear the inout value
  searchInput.value = '';

  // Render the full tasks
  renderData(data);

  // Hide the X button
  clearSearchBtn.style.display = 'none';
});

////////////////// creating the Search mechanism ////////////////////////

searchInput.addEventListener('keyup', function (event) {
  // Get the search value
  const searchValue = event.target.value.toLowerCase();

  // filter the tasks array based on the search value
  const filteredData = data.filter(function (taskObj) {
    return (
      taskObj.name.toLowerCase().includes(searchValue) ||
      taskObj.assignee.toLowerCase().includes(searchValue)
    );
  });

  // Render the filtered data to the DOM
  renderData(filteredData);
});
