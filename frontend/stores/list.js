var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ListStore = new Store(AppDispatcher);

_lists = [];

var resetLists = function(lists) {
  _lists = lists;
};

var addList = function(list) {
  _lists.push(list);
};

var updateList = function(updatedList) {
  _lists.forEach(function(list) {
    if (list.list_id === updatedList.list_id) {
      list.name = updatedList.name;
    }
  });
};

var removeList = function(removeList) {
  _lists.forEach(function(list, index) {
    if (list.list_id === removeList.list_id) {
      _lists.splice(index, 1);
    }
  });
};

var checkForCountRaise = function(task) {
  _lists.forEach(function(list) {
    if (list.list_id === task.list_id) {
      list.task_count += 1;
    }
  });
};

var checkForCountLower = function(task) {
  _lists.forEach(function(list) {
    if (list.list_id === task.list_id) {
      list.task_count -= 1;
    }
  });
};

ListStore.all = function() {
  return _lists.slice();
};

ListStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "RECEIVE_ALL_LISTS":
      resetLists(payload.lists);
      ListStore.__emitChange();
      break;
    case "RECEIVE_NEW_LIST":
      addList(payload.list);
      ListStore.__emitChange();
      break;
    case "RECEIVE_UPDATED_LIST":
      updateList(payload.list);
      ListStore.__emitChange();
      break;
    case "REMOVE_LIST":
      removeList(payload.list);
      ListStore.__emitChange();
      break;
    case "ADD_TASK":
      checkForCountRaise(payload.task);
      ListStore.__emitChange();
      break;
    case "REMOVE_TASK":
      checkForCountLower(payload.task);
      ListStore.__emitChange();
      break;
    case "COMPLETE_TASK":
      checkForCountLower(payload.oldTask);
      ListStore.__emitChange();
      break;
    case "UPDATE_TASK":
      checkForCountRaise(payload.task);
      checkForCountLower(payload.oldTask);
      ListStore.__emitChange();
      break;

  }
};

module.exports = ListStore;
