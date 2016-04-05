var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var InboxStore = require('./inbox');

var TaskDetailStore = new Store(AppDispatcher);

var _task = {};

var resetTask = function(task) {
  _task = task;
};

var checkForRemoval = function(task) {
  switch (InboxStore.getCurrentInbox()) {
    case "Today":
      if (!task.today) {
        removeTask();
      }
      break;
    case "Tomorrow":
      if (!task.tomorrow) {
        removeTask();
      }
      break;
    case "Week":
      if (!task.week) {
        removeTask();
      }
      break;
    }
};

var removeTask = function() {
  _task = {};
};


TaskDetailStore.getTask = function() {
  var taskToReturn = {};
  for (var key in _task) {
    if (_task.hasOwnProperty(key)) {
      taskToReturn[key] = _task[key];
    }
  }
  return taskToReturn;
};

TaskDetailStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "GET_ONE_TASK":
      resetTask(payload.task);
      TaskDetailStore.__emitChange();
      break;
    case "UPDATE_TASK":
      resetTask(payload.task);
      checkForRemoval(payload.task);
      TaskDetailStore.__emitChange();
      break;
    case "COMPLETE_TASK":
      removeTask();
      TaskDetailStore.__emitChange();
      break;
    case "REMOVE_TASK":
      removeTask();
      TaskDetailStore.__emitChange();
      break;
  }
};

module.exports = TaskDetailStore;
