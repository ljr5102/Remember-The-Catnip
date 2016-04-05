var InboxStore = require('./inbox');
var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var TaskStore = new Store(AppDispatcher);

var _tasks = [];
var _completedTasks = [];

var resetTasks = function(tasks) {
  _tasks = [];
  tasks.forEach(function(task) {
    _tasks.push(task);
  });
};

var resetCompletedTasks = function(tasks) {
  _completedTasks = [];
  tasks.forEach(function(task) {
    _completedTasks.push(task);
  });
};

var addCompletedTask = function(task) {
  _completedTasks.push(task);
};

var addTask = function(task) {
  switch (InboxStore.getCurrentInbox()) {
    case "Today":
      if (task.today) {
        _tasks.push(task);
      }
      break;
    case "Tomorrow":
      if (task.tomorrow) {
        _tasks.push(task);
      }
      break;
    case "Week":
      if (task.week) {
        _tasks.push(task);
      }
      break;
    case "AllTasks":
      _tasks.push(task);
      break;
    case "":
      _tasks.push(task);
      break;
  }
};

var checkForRemoval = function(task) {
  switch (InboxStore.getCurrentInbox()) {
    case "Today":
      if (!task.today) {
        removeTask(task);
      }
      break;
    case "Tomorrow":
      if (!task.tomorrow) {
        removeTask(task);
      }
      break;
    case "Week":
      if (!task.week) {
        removeTask(task);
      }
      break;
    }
};

var removeTask = function(deleteTask) {
  _tasks.forEach(function(task, index) {
    if (task.task_id === deleteTask.task_id) {
      _tasks.splice(index, 1);
    }
  });
};

TaskStore.all = function() {
  return _tasks.slice();
};

TaskStore.allCompleted = function() {
  return _completedTasks.slice();
};

TaskStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "GET_ALL_TASKS":
      resetTasks(payload.tasks);
      TaskStore.__emitChange();
      break;
    case "ADD_TASK":
      addTask(payload.task);
      TaskStore.__emitChange();
      break;
    case "UPDATE_TASK":
      checkForRemoval(payload.task);
      TaskStore.__emitChange();
      break;
    case "COMPLETE_TASK":
      removeTask(payload.task);
      addCompletedTask(payload.task);
      TaskStore.__emitChange();
      break;
    case "REMOVE_TASK":
      removeTask(payload.task);
      TaskStore.__emitChange();
      break;
    case "SET_STORE":
      resetTasks(payload.tasks);
      TaskStore.__emitChange();
      break;
    case "GET_ALL_COMPLETED_TASKS":
      resetCompletedTasks(payload.tasks);
      TaskStore.__emitChange();
      break;
  }
};

module.exports = TaskStore;
