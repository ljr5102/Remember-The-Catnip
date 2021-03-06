var TaskActions = require('../actions/task_actions');
var InboxActions = require('../actions/inbox_actions');
var SessionActions = require('../actions/session_actions');
var SearchResultActions = require('../actions/search_result_actions');
var ListActions = require('../actions/list_actions');
var LocationActions = require('../actions/location_actions');

var APIUtil = {
  login: function(credentials, errorCB) {
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: {user: credentials},
      success: function(currentUser) {
        SessionActions.currentUserReceived(currentUser);
      },
      error: function() {
        errorCB();
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

  createUser: function(formData, errorCB) {
    $.ajax({
      url: "/api/users" ,
      method: "POST",
      dataType: "json",
      data: formData,
      success: function(newUser) {
        SessionActions.currentUserReceived(newUser);
      },
      error: function(e) {
        var err_table = JSON.parse(e.responseText).errors;
        errorCB(err_table);
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
      processData: false,
      contentType: false,
      data: task,
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
      processData: false,
      contentType: false,
      data: task,
      success: function(updatedTask) {
        TaskActions.updateTask(updatedTask.task, currentTask);
      },
      error: function() {
        console.log("Something went wrong in updateTask");
      }
    });
  },

  removeImage: function(task) {
    $.ajax({
      url: "/api/tasks/" + task.task_id + "/images",
      dataType: "json",
      method: "PATCH",
      success: function(updatedTask) {
        TaskActions.updateTask(updatedTask.task);
      },
      error: function() {
        console.log("Something went wrong in removeImage");
      }
    });
  },

  completeTask: function(currentTask, task) {
    $.ajax({
      url: "api/tasks/" + currentTask.task_id,
      dataType: "json",
      method: "PATCH",
      data: {task: task},
      success: function(completedTask) {
        TaskActions.completeTask(completedTask.task, currentTask);
      },
      error: function() {
        console.log("Something went wrong in completeTask");
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
  },

  getAllTasks: function(callback) {
    $.ajax({
      method: "GET",
      url: "api/tasks",
      dataType: "json",
      success: function(tasks) {
        TaskActions.holdAllTasks(tasks);
      },
      error: function() {
        console.log("Something went wrong in getAllTasks");
      }
    });
  },

  getTodayTasks: function(callback) {
    $.ajax({
      method: "GET",
      url: "api/tasks/today",
      dataType: "json",
      success: function(tasks) {
        callback(tasks);
      },
      error: function() {
        console.log("Something went wrong in getTodayTasks");
      }
    });
  },

  getTomorrowTasks: function(callback) {
    $.ajax({
      method: "GET",
      url: "api/tasks/tomorrow",
      dataType: "json",
      success: function(tasks) {
        callback(tasks);
      },
      error: function() {
        console.log("Something went wrong in getTomorrowTasks");
      }
    });
  },

  getWeekTasks: function(callback) {
    $.ajax({
      method: "GET",
      url: "api/tasks/week",
      dataType: "json",
      success: function(tasks) {
        callback(tasks);
      },
      error: function() {
        console.log("Something went wrong in getWeekTasks");
      }
    });
  },

  fetchCompletedTasks: function() {
    $.ajax({
      method: "GET",
      url: "/api/tasks/completed",
      dataType: "json",
      success: function(completedTasks) {
        TaskActions.receiveAllCompletedTasks(completedTasks);
      },
      error: function() {
        console.log("Something went wrong in fetchCompletedTasks");
      }
    });
  },

  fetchTasksForList: function(list_id) {
    $.ajax({
      method: "GET",
      url: "/api/lists/" + list_id + "/tasks",
      dataType: "json",
      success: function(tasks) {
        TaskActions.receiveAllTasks(tasks);
      },
      error: function() {
        console.log("Something went wrong in fetchTasksForList");
      }
    });
  },

  fetchTasksForLocation: function(location_id) {
    $.ajax({
      method: "GET",
      url: "/api/locations/" + location_id + "/tasks",
      dataType: "json",
      success: function(tasks) {
        TaskActions.receiveAllTasks(tasks);
      },
      error: function() {
        console.log("Something went wrong in fetchTasksForLocation");
      }
    });
  },

  search: function(query, page) {
    $.ajax({
      method: "GET",
      url: "/api/searches",
      dataType: "json",
      data: {query: query, page: page},
      success: function(response) {
        SearchResultActions.receiveResults(response);
      },
      error: function() {
        console.log("Something went wrong in search");
      }
    });
  },

  fetchAllLists: function() {
    $.ajax({
      method: "GET",
      url: "/api/lists",
      dataType: "json",
      success: function(lists) {
        ListActions.receiveAllLists(lists);
      },
      error: function() {
        console.log("Something went wrong in fetchAllLists");
      }
    });
  },

  createList: function(listData) {
    $.ajax({
      method: "POST",
      url: "/api/lists",
      dataType: "json",
      data: listData,
      success: function(createdList) {
        ListActions.receiveNewList(createdList);
      },
      error: function() {
        console.log("Something went wrong in createList");
      }
    });
  },

  updateList: function(list_id, listData) {
    $.ajax({
      method: "PATCH",
      url: "/api/lists/" +  list_id,
      dataType: "json",
      data: listData,
      success: function(updatedList) {
        ListActions.receiveUpdatedList(updatedList);
        InboxActions.receiveClickedList(updatedList);
      },
      error: function() {
        console.log("Something went wrong in createList");
      }
    });
  },

  deleteList: function(list) {
    $.ajax({
      method: "DELETE",
      url: "/api/lists/" + list.list_id,
      dataType: "json",
      success: function() {
        ListActions.removeList(list);
      },
      error: function() {
        console.log("Something went wrong in deleteList");
      }
    });
  },

  fetchAllLocations: function() {
    $.ajax({
      method: "GET",
      url: "/api/locations",
      dataType: "json",
      success: function(locations) {
        LocationActions.receiveAllLocations(locations);
      },
      error: function() {
        console.log("Something went wrong in fetchAllLocations");
      }
    });
  },

  createLocation: function(location) {
    $.ajax({
      method: "POST",
      url: "/api/locations",
      dataType: "json",
      data: {location: location},
      success: function(createdLocation) {
        LocationActions.receiveNewLocation(createdLocation);
      },
      error: function() {
        console.log("Something went wrong in createLocation");
      }
    });
  },

  fetchCoordsForLocation: function(location, locationObject) {
    $.ajax({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json",
      dataType: "json",
      data: {address: location, key: "AIzaSyBYgMq-B0GqfPPCHjQ9zPh0jyCSJFmWYBo"},
      success: function(result) {
        var coords = result.results[0].geometry.location;
        locationObject['lng'] = coords.lng;
        locationObject['lat'] = coords.lat;
        APIUtil.createLocation(locationObject);
      },
      error: function() {
        console.log("Something went wrong");
      }
    });
  }




};

module.exports = APIUtil;
