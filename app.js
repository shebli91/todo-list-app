'use strict';

////////////////////// Selectors Section //////////////////////
const taskInput = document.querySelector('.task-placeholder');

const assigneeInput = document.querySelector('.assignee-placeholder');

const addBtn = document.querySelector('.add-btn');
const switchBtn = document.querySelector('.switch-btn');

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.fa-magnifying-glass');
const clearSearchBtn = document.querySelector('.clear-search');

const taskText = document.querySelector('.task-text');
const assigneeText = document.querySelector('.assignee-text');
const deleteTaskBtn = document.querySelector('.delete-btn');
const checkTaskBtn = document.querySelector('.check-btn');

const doneTasks = document.querySelector('.done');
const todoTasks = document.querySelector('.todo');

const popupConfirmationBox = document.querySelector('.popup-box');
const popupCancelBtn = document.querySelector('.cancel-btn');
const popupOkBtn = document.querySelector('.ok-btn');
