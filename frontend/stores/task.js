var InboxStore = require('./inbox');
var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var TaskStore = new Store(AppDispatcher);

var _tasks = [];
var _completedTasks = [];

// only use for navigating from complete to incomplete
var _incompleteTasks = [];

var _allTasks = [];
var _todayTasks = [];
var _tomorrowTasks = [];
var _weekTasks = [];

var resetTasks = function(tasks) {
  _tasks = [];
  _allTasks = [];
  _todayTasks = [];
  _tomorrowTasks = [];
  _weekTasks = [];
  _completedTasks = [];
  tasks.forEach(function(task) {
    if (task.completed) {
      _completedTasks.push(task);
    } else {
      _tasks.push(task);
      _allTasks.push(task);
      if (task.today) {
        _todayTasks.push(task);
      }
      if (task.tomorrow) {
        _tomorrowTasks.push(task);
      }
      if (task.week) {
        _weekTasks.push(task);
      }
    }
  });
};

var setStore = function(tasks) {
  _tasks = [];
  tasks.forEach(function(task) {
    _tasks.push(task);
  });
};

var tableHas = function(table, task) {
  return table.some(function(obj) {
    return obj.task_id === task.task_id;
  });
};

var massUpdate = function(updatedTask) {
  _allTasks.forEach(function(task, index) {
    if (updatedTask.task_id === task.task_id) {
      _allTasks[index] = updatedTask;
    }
  });

  if (updatedTask.today && !tableHas(_todayTasks, updatedTask)) {
    _todayTasks.push(updatedTask);
  } else {
    _todayTasks.forEach(function(task, index) {
      if (updatedTask.task_id === task.task_id) {
        if (updatedTask.today) {
          _todayTasks[index] = updatedTask;
        } else {
          _todayTasks.splice(index, 1);
        }
      }
    });
  }

  if (updatedTask.tomorrow && !tableHas(_tomorrowTasks, updatedTask)) {
    _tomorrowTasks.push(updatedTask);
  } else {
    _tomorrowTasks.forEach(function(task, index) {
      if (updatedTask.task_id === task.task_id) {
        if (updatedTask.tomorrow) {
          _tomorrowTasks[index] = updatedTask;
        } else {
          _tomorrowTasks.splice(index, 1);
        }
      }
    });
  }

  if (updatedTask.week && !tableHas(_weekTasks, updatedTask)) {
    _weekTasks.push(updatedTask);
  } else {
    _weekTasks.forEach(function(task, index) {
      if (updatedTask.task_id === task.task_id) {
        if (updatedTask.week) {
          _weekTasks[index] = updatedTask;
        } else {
          _weekTasks.splice(index, 1);
        }
      }
    });
  }
};

var resetCompletedTasks = function(tasks) {
  _completedTasks = [];
  tasks.forEach(function(task) {
    _completedTasks.push(task);
  });
};

var resetIncompleteTasks = function(tasks) {
  _incompleteTasks = [];
  tasks.forEach(function(task) {
    _incompleteTasks.push(task);
  });
};

var addCompletedTask = function(task) {
  _completedTasks.push(task);
};

var placeTask = function(task) {
  _allTasks.push(task);
  if (task.today) {
    _todayTasks.push(task);
  }
  if (task.tomorrow) {
    _tomorrowTasks.push(task);
  }
  if (task.week) {
    _weekTasks.push(task);
  }
};

var displaceTask = function(updatedTask) {
  _allTasks.forEach(function(task, index) {
    if (updatedTask.task_id === task.task_id) {
      _allTasks.splice(index, 1);
    }
  });
  _todayTasks.forEach(function(task, index) {
    if (updatedTask.task_id === task.task_id) {
      _todayTasks.splice(index, 1);
    }
  });
  _tomorrowTasks.forEach(function(task, index) {
    if (updatedTask.task_id === task.task_id) {
      _tomorrowTasks.splice(index, 1);
    }
  });
  _weekTasks.forEach(function(task, index) {
    if (updatedTask.task_id === task.task_id) {
      _weekTasks.splice(index, 1);
    }
  });
};

var addTask = function(task) {
  switch (InboxStore.getCurrentInbox()) {
    case "Today":
      if (task.today) {
        _tasks.push(task);
      }
      break;
    case "Tomorrow":
      if (task.tomorrow) {
        _tasks.push(task);
      }
      break;
    case "Week":
      if (task.week) {
        _tasks.push(task);
      }
      break;
    case "AllTasks":
      _tasks.push(task);
      break;
    case "":
      _tasks.push(task);
      break;
    case "None":
      var currList = InboxStore.getCurrentList();
      if(task.list_id === currList.list_id) {
        _tasks.push(task);
      }
      var currLocation = InboxStore.getCurrentLocation();
      if(task.location_id === currLocation.location_id) {
        _tasks.push(task);
      }
      break;
  }
};

var checkForRemoval = function(task) {
  switch (InboxStore.getCurrentInbox()) {
    case "Today":
      if (!task.today) {
        removeTask(task);
      }
      break;
    case "Tomorrow":
      if (!task.tomorrow) {
        removeTask(task);
      }
      break;
    case "Week":
      if (!task.week) {
        removeTask(task);
      }
      break;
    case "None":
      var currList = InboxStore.getCurrentList();
      if (!$.isEmptyObject(currList)) {
        if(!task.list_id || task.list_id !== currList.list_id) {
          removeTask(task);
        }
      }
      var currLocation = InboxStore.getCurrentLocation();
      if (!$.isEmptyObject(currLocation)) {
        if(!task.location_id || task.location_id !== currLocation.location_id) {
          removeTask(task);
        }
      }
      break;
    }
};

var removeTask = function(deleteTask) {
  _tasks.forEach(function(task, index) {
    if (task.task_id === deleteTask.task_id) {
      _tasks.splice(index, 1);
    }
  });
};

var updateIndexItemTask = function(updatedTask) {
  _tasks.forEach(function(task, index) {
    if (task.task_id === updatedTask.task_id) {
      _tasks[index] = updatedTask;
    }
  });
};

var storeAllTasks = function(tasks) {
  _allTasks = tasks;
};

var setCurrentInboxTasks = function() {
  _tasks = [];
  switch (InboxStore.getCurrentInbox()) {
    case "Today":
      setTodayTasks();
      break;
    case "Tomorrow":
      setTomorrowTasks();
      break;
    case "Week":
      setWeekTasks();
      break;
    case "AllTasks":
      setAllTasks();
      break;
    case "None":
      var currList = InboxStore.getCurrentList();
      if (!$.isEmptyObject(currList)) {
        _allTasks.forEach(function(task) {
          if (task.list_id === currList.list_id) {
            _tasks.push(task);
          }
        });
      }
      var currLocation = InboxStore.getCurrentLocation();
      if (!$.isEmptyObject(currLocation)) {
        _allTasks.forEach(function(task) {
          if (task.location_id === currLocation.location_id) {
            _tasks.push(task);
          }
        });
      }
      break;
  }

};

TaskStore.getAllTasks = function() {
  return _allTasks.slice();
};

var setAllTasks = function() {
  _tasks = _allTasks.slice();
};

TaskStore.getTodayTasks = function() {
  return _todayTasks.slice();
};

var setTodayTasks = function() {
  _tasks = _todayTasks.slice();
};

TaskStore.getTomorrowTasks = function() {
  return _tomorrowTasks.slice();
};

var setTomorrowTasks = function() {
  _tasks = _tomorrowTasks.slice();
};

TaskStore.getWeekTasks = function() {
  return _weekTasks.slice();
};

var setWeekTasks = function() {
  _tasks = _weekTasks.slice();
};

TaskStore.all = function() {
  return _tasks.slice().reverse();
};

TaskStore.allCompleted = function() {
  return _completedTasks.slice().reverse();
};

TaskStore.getIncompleteTasks = function() {
  return _incompleteTasks.slice();
};

TaskStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "GET_ALL_TASKS":
      resetTasks(payload.tasks);
      TaskStore.__emitChange();
      break;
    case "ADD_TASK":
      placeTask(payload.task);
      addTask(payload.task);
      TaskStore.__emitChange();
      break;
    case "UPDATE_TASK":
      massUpdate(payload.task);
      checkForRemoval(payload.task);
      setCurrentInboxTasks(); //put this here so task index updates appropriately
      // updateIndexItemTask(payload.task);
      TaskStore.__emitChange();
      break;
    case "COMPLETE_TASK":
      displaceTask(payload.task);
      removeTask(payload.task);
      addCompletedTask(payload.task);
      TaskStore.__emitChange();
      break;
    case "REMOVE_TASK":
      displaceTask(payload.task);
      removeTask(payload.task);
      TaskStore.__emitChange();
      break;
    case "SET_STORE":
      setStore(payload.tasks);
      TaskStore.__emitChange();
      break;
    case "GET_ALL_COMPLETED_TASKS":
      resetCompletedTasks(payload.tasks);
      TaskStore.__emitChange();
      break;
    case "GET_INCOMPLETE_TASKS":
      resetIncompleteTasks(payload.tasks);
      break;
    case "HOLD_ALL_TASKS":
      storeAllTasks(payload.tasks);
      break;
    case "SET_CURRENT_INBOX_TASKS":
      setCurrentInboxTasks();
      TaskStore.__emitChange();
      break;
  }
};

module.exports = TaskStore;
