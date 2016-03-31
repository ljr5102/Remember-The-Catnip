var TaskActions = require('../actions/task_actions');
var SessionActions = require('../actions/session_actions');

var APIUtil = {
  login: function(credentials) {
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: {user: credentials},
      success: function(currentUser) {
        SessionActions.currentUserReceived(currentUser);
      }
    });
  },

  logout: function() {
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      dataType: "json",
      success: function() {
        SessionActions.logout();
      }
    });
  },

  fetchCurrentUser: function(completion) {
    $.ajax({
      type: "GET",
      url: "/api/session",
      dataType: "json",
      success: function(currentUser) {
        SessionActions.currentUserReceived(currentUser);
      },
      complete: function() {
        SessionActions.currentUserFetched();
        completion && completion();
      }
    });
  },

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
  },

  updateTask: function(currentTask, task) {
    $.ajax({
      url: "api/tasks/" + currentTask.task_id,
      dataType: "json",
      method: "PATCH",
      data: {task: task},
      success: function(updatedTask) {
        TaskActions.updateTask(updatedTask.task);
      },
      error: function() {
        console.log("Something went wrong in updateTask");
      }
    });
  },

  destroyTask: function(currentTask) {
    $.ajax({
      url: "api/tasks/" + currentTask.task_id,
      dataType: "json",
      method: "DELETE",
      success: function() {
        TaskActions.removeTask(currentTask);
      },
      error: function() {
        console.log("Something went wrong in destroyTask");
      }
    });
  }



};

module.exports = APIUtil;
