var TaskActions = require('../actions/task_actions');

var APIUtil = {
  fetchAllTasks: function() {
    $.ajax({
        url: "api/tasks",
        dataType: "json",
        method: "GET",
        success: function(tasks) {
          TaskActions.receiveAllTasks(tasks);
        },
        error: function() {
          console.log("Something went wrong in fetchAllTasks");
        }
      }
    );
  },

  fetchSingleTask: function(id) {
    $.ajax({
      url: "api/tasks/" + id,
      dataType: "json",
      method: "GET",
      success: function(task) {
        TaskActions.receiveSingleTask(task.task);
      },
      error: function() {
        console.log("Something went wrong in fetchSingleTask");
      }
    });
  },

  createTask: function(task) {
    $.ajax({
      url: "api/tasks",
      dataType: "json",
      method: "POST",
      data: { task: task },
      success: function(persistedTask) {
        TaskActions.addTask(persistedTask.task);
      },
      error: function() {
        console.log("Something went wrong in createTask");
      }
    });
  }
};

module.exports = APIUtil;
