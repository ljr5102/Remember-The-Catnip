var AppDispatcher = require('../dispatcher/dispatcher');
var TaskConstants = require('../constants/task_constants');

var TaskActions = {
  receiveAllTasks: function(tasks) {
    var action = {
      actionType: TaskConstants.GET_ALL_TASKS,
      tasks: tasks
    };
    AppDispatcher.dispatch(action);
  }
};

module.exports = TaskActions;
