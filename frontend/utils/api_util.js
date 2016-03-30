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

  createTask: function(task) {
    $.ajax({
      url: "api/tasks",
      dataType: "json",
      method: "POST",
      data: { task: task },
      success: function() {
        TaskActions.addTask(task);
      },
      error: function() {
        console.log("Something went wrong in createTask");
      }
    });
  }
};

module.exports = APIUtil;
