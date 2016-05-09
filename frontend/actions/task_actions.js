var AppDispatcher = require('../dispatcher/dispatcher');
var TaskConstants = require('../constants/task_constants');

var TaskActions = {
  receiveAllTasks: function(tasks) {
    var action = {
      actionType: TaskConstants.GET_ALL_TASKS,
      tasks: tasks
    };
    AppDispatcher.dispatch(action);
  },

  receiveAllCompletedTasks: function(tasks) {
    var action = {
      actionType: TaskConstants.GET_ALL_COMPLETED_TASKS,
      tasks: tasks
    };
    AppDispatcher.dispatch(action);
  },

  receiveSingleTask: function(task) {
    var action = {
      actionType: TaskConstants.GET_ONE_TASK,
      task: task
    };
    AppDispatcher.dispatch(action);
  },

  receiveIncompleteTasks: function(tasks) {
    var action = {
      actionType: TaskConstants.GET_INCOMPLETE_TASKS,
      tasks: tasks
    };
    AppDispatcher.dispatch(action);
  },

  addTask: function(task) {
    var action = {
      actionType: TaskConstants.ADD_TASK,
      task: task
    };
    AppDispatcher.dispatch(action);
  },

  updateTask: function(task, oldTask) {
    var action = {
      actionType: TaskConstants.UPDATE_TASK,
      task: task,
      oldTask: oldTask
    };
    AppDispatcher.dispatch(action);
  },

  completeTask: function(task, oldTask) {
    var action = {
      actionType: TaskConstants.COMPLETE_TASK,
      task: task,
      oldTask: oldTask
    };
    AppDispatcher.dispatch(action);
  },

  removeTask: function(task) {
    var action = {
      actionType: TaskConstants.REMOVE_TASK,
      task: task
    };
    AppDispatcher.dispatch(action);
  },

  setStore: function(tasks) {
    var action = {
      actionType: TaskConstants.SET_STORE,
      tasks: tasks
    };
    AppDispatcher.dispatch(action);
  },

  holdAllTasks: function(tasks) {
    var action = {
      actionType: TaskConstants.HOLD_ALL_TASKS,
      tasks: tasks
    };
    AppDispatcher.dispatch(action);
  }
};

module.exports = TaskActions;
