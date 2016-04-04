var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var TaskDetailStore = new Store(AppDispatcher);

var _task = {};

var resetTask = function(task) {
  _task = task;
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

  }
};

module.exports = TaskDetailStore;
