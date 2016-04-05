var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ListStore = new Store(AppDispatcher);

_lists = [];

var resetLists = function(lists) {
  _lists = lists;
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

  }
};

module.exports = ListStore;
