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
  _tasks.push(task);
};

var getTask = function(task) {
  _task = task;
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
  }
};

module.exports = TaskStore;
