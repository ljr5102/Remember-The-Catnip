var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var TaskStore = new Store(AppDispatcher);

var _tasks = [];

var resetTasks = function(tasks) {
  _tasks = [];
  tasks.forEach(function(task) {
    _tasks.push(task);
  });
};

TaskStore.all = function() {
  return _tasks.slice();
};

TaskStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "GET_ALL_TASKS":
      resetTasks(payload.tasks);
      TaskStore.__emitChange();
      break;
  }
};

module.exports = TaskStore;
