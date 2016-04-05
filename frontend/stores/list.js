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

var checkForCountUpdate = function(task) {
  debugger
  _lists.forEach(function(list) {
    if (list.list_id === task.list_id) {
      list.task_count += 1;
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
    case "ADD_TASK":
      checkForCountUpdate(payload.task);
      ListStore.__emitChange();
      break;
  }
};

module.exports = ListStore;
