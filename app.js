'use strict';

////////////////////// Selectors Section //////////////////////

const pageContainer = document.querySelector('.page-container');

const taskInput = document.querySelector('.task-placeholder');

const assigneeInput = document.querySelector('.assignee-placeholder');

const addBtn = document.querySelector('.add-btn');
const switchBtn = document.querySelector('.switch-btn');

const searchInput = document.querySelector('.search-bar');
const clearSearchBtn = document.querySelector('.clear-search');

const tasksListContainer = document.querySelector('.task-list-container');
const tasksMainContainer = document.querySelector('.task-main-container');

const taskText = document.querySelector('.task-text');
const assigneeText = document.querySelector('.assignee-text');
const deleteTaskBtn = document.querySelector('.delete-btn');
const checkTaskBtn = document.querySelector('.check-btn');

const todoTasksEl = document.querySelector('.todo-counter');
const doneTasksEl = document.querySelector('.done-counter');

const popupConfirmationBox = document.querySelector('.popup-box');
const popupCancelBtn = document.querySelector('.cancel-btn');
const popupOkBtn = document.querySelector('.ok-btn');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const tasks = document.querySelectorAll('.task-list-container li');

let data = [];
let todoCounter;
let doneCounter;
let doneTasksArray = [];

let currentTaskIndex = 0;

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
        <p class="task-text editable">${task.name}</p>
      </div>
    </div>

    <div class="assignee-container">
      <div>
        <h1 class="assignee-label-text">Assignee :</h1>
        <p class="assignee-text editable">${task.assignee}</p>
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

//////////////// get the data from the locale storage ////////
const storedData = localStorage.getItem('tasks');
const storedDoneTasksArray = localStorage.getItem('doneTasks');

if (storedData) {
  data = JSON.parse(storedData);
  renderData(data);
}

if (storedDoneTasksArray) {
  doneTasksArray = JSON.parse(storedDoneTasksArray);
  updateTaskCounter();
}

///// Set the data to the localeStorage ////////////

const updateLocalStorage = function (data, doneTasksArray) {
  localStorage.setItem('tasks', JSON.stringify(data));
  localStorage.setItem('doneTasks', JSON.stringify(doneTasksArray));
};

//////// Clear the whole locale storage of the app ///////////
const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  // Reload the page to reflect the cleared localStorage
  window.location.reload();
});

////////// Main functions /////////

function showPopup() {
  // Show the popup box
  popupConfirmationBox.removeAttribute('hidden');

  // Add the popup overlay to the page container
  const overlay = document.createElement('div');
  overlay.classList.add('popup-overlay');
  pageContainer.appendChild(overlay);

  // Disable scrolling on the body
  pageContainer.style.overflow = 'hidden';
}

function hidePopup() {
  // Hide the popup box
  popupConfirmationBox.setAttribute('hidden', '');

  // Remove the popup overlay from the page container
  const overlay = document.querySelector('.popup-overlay');
  if (overlay) {
    pageContainer.removeChild(overlay);
  }
  // Enable scrolling on the body
  pageContainer.style.overflow = 'auto';
}

function updateTaskCounter() {
  todoCounter = 0;
  doneCounter = 0;

  data.forEach(() => {
    todoCounter++;
  });

  doneTasksArray.forEach(() => {
    doneCounter++;
  });

  todoTasksEl.textContent = todoCounter;
  doneTasksEl.textContent = doneCounter;
}

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

    // Save the data array to local storage
    updateLocalStorage(data, doneTasksArray);

    // Render the Data array to the DOM
    renderData(data);

    // Clear the input fields
    taskInput.value = '';
    assigneeInput.value = '';

    // Update the ToDo statistics
    updateTaskCounter();
  } else {
    alert('Please fill in both task and assignee fields.');
  }
};

////////////////////// add task on button  click ////////////////////

addBtn.addEventListener('click', addTask);

////////////////////// add task on enter key press  ///////////////////

document.addEventListener('keydown', function (event) {
  if (
    event.key === 'Enter' &&
    (event.target === taskInput || event.target === assigneeInput)
  ) {
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

////////// creating the tasks controlling  mechanism  ( using event Delegation) /////////////

tasksListContainer.addEventListener('click', event => {
  const clickedElement = event.target;

  // Check if the clicked element is the delete icon
  if (clickedElement.classList.contains('fa-trash-can')) {
    // Find the closest task element and remove it from the DOM
    const taskElement = clickedElement.closest('.task-main-container');

    // Show the confirmation popup
    showPopup();

    // Add event listener to cancel button
    popupCancelBtn.addEventListener('click', () => {
      hidePopup();
    });

    // Add event listener to ok button
    popupOkBtn.addEventListener('click', function () {
      // Remove the task element from the DOM if the deletion has been confirmed
      taskElement.remove();

      // Remove the task from the task data array
      const taskName = taskElement.querySelector('.task-text').textContent;
      const taskIndex = data.findIndex(task => task.name === taskName);
      if (taskIndex !== -1) {
        data.splice(taskIndex, 1);
        updateLocalStorage(data, doneTasksArray);
      }
      // Hide the confirmation popup
      hidePopup();

      updateTaskCounter();
    });
  }

  // Check if the clicked element is the check icon
  if (clickedElement.classList.contains('fa-circle-check')) {
    // Find the closest task element and move it to the done task container
    const taskElement = clickedElement.closest('.task-main-container');
    taskElement.remove();

    // Remove the task from the task data array and add it to the done tasks array
    const taskName = taskElement.querySelector('.task-text').textContent;
    const taskIndex = data.findIndex(task => task.name === taskName);
    if (taskIndex !== -1) {
      const doneTask = data.splice(taskIndex, 1)[0];
      doneTasksArray.push(doneTask);

      // Update the local storage data
      updateLocalStorage(data, doneTasksArray);
    }
    updateTaskCounter();
  }

  /////////////////////////////// in line edit functionality //////////////////

  // Check if the clicked element is the task text or assignee text
  if (
    clickedElement.classList.contains('task-text') ||
    clickedElement.classList.contains('assignee-text')
  ) {
    // Get the original text content of the clicked element
    const originalText = clickedElement.textContent;
    // Create an input element and set its value to the original text content
    const inputElement = document.createElement('input');
    inputElement.value = originalText;

    // Add the 'inline-input' class to the input element
    inputElement.classList.add('inline-input');

    // Replace the clicked element with the input element and focus on it
    clickedElement.replaceWith(inputElement);
    inputElement.focus();

    // Listen for the "keydown" event on the input element
    inputElement.addEventListener('keydown', event => {
      // If the "Enter" key or "Escape" key is pressed
      if (event.key === 'Enter' || event.key === 'Escape') {
        editHandler(inputElement);
      }
    });

    // Listen for the "blur" event on the input element
    inputElement.addEventListener('blur', () => {
      editHandler(inputElement);
    });
  }

  function editHandler(inputElement) {
    // Get the new text value from the input element
    const newText = inputElement.value;
    // Find the index of the task in the data array using the input element
    const taskIndex = findTaskIndex(inputElement);
    // Call the "updateTaskText" function with the new text, index, and clicked element
    updateTaskText(taskIndex, newText, clickedElement);
    // Re-render the task list with the updated data
    renderData(data);
    // Update the local storage
    updateLocalStorage(data, doneTasksArray);

    // Remove the 'inline-input' class from the input element
    inputElement.classList.remove('inline-input');
  }

  // Function to find the index of the task in the data array using the clicked element

  function findTaskIndex(clickedElement) {
    const taskContainer = clickedElement.closest('.task-main-container');
    const taskContainers = Array.from(
      document.querySelectorAll('.task-main-container')
    );
    // Return the index of the task in the array of task containers
    return taskContainers.findIndex(task => task === taskContainer);
  }

  function updateTaskText(index, newText, clickedElement) {
    // Check if the data array exists and if the index is valid
    if (data && index !== -1 && index < data.length) {
      // Check if clicked element is a task or assignee text element
      if (clickedElement.classList.contains('task-text')) {
        // Update the task text in the data array
        data[index].name = newText;
      } else if (clickedElement.classList.contains('assignee-text')) {
        // Update the assignee text in the data array
        data[index].assignee = newText;
      }
    }
  }
});

/////////// horizontal view  functionality ////////////

// switchBtn.addEventListener('click', function () {
//   pageContainer.classList.toggle('horizontal-view');
//   tasksListContainer.classList.toggle('show-one-task');
// });
