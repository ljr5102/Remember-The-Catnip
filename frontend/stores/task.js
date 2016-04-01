var InboxStore = require('./inbox');
var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var TaskStore = new Store(AppDispatcher);

var _tasks = [];
var _task = {};

var resetTasks = function(tasks) {
  _tasks = [];
  tasks.forEach(function(task) {
    _tasks.push(task);
  });
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

var getTask = function(task) {
  _task = task;
};

var updateTask = function(task) {
  _task = task;
};

var removeTask = function(deleteTask) {
  _task = {};
  _tasks.forEach(function(task, index) {
    if (task.task_id === deleteTask.task_id) {
      _tasks.splice(index, 1);
    }
  });
};

TaskStore.all = function() {
  return _tasks.slice();
};

TaskStore.get = function() {
  var taskToReturn = {};
  for (var key in _task) {
    if (_task.hasOwnProperty(key)) {
      taskToReturn[key] = _task[key];
    }
  }
  return taskToReturn;
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
    case "GET_ONE_TASK":
      getTask(payload.task);
      TaskStore.__emitChange();
      break;
    case "UPDATE_TASK":
      updateTask(payload.task);
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
  }
};

module.exports = TaskStore;
