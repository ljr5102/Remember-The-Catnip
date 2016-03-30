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
          console.log("Something went wrong");
        }
      }
    );
  }
};

module.exports = APIUtil;
