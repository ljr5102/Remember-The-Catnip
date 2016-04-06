var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var InboxStore = new Store(AppDispatcher);

var _currentInbox = "";
var _currentList = {};

var setCurrentInbox = function(inbox) {
  _currentInbox = inbox;
};

var setCurrentList = function(list) {
  _currentList = list;
};

InboxStore.getCurrentInbox = function() {
  return _currentInbox.slice();
};

InboxStore.getCurrentList = function() {
  var list = $.extend(true, {}, _currentList);
  return list;
};

InboxStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "RECEIVE_CLICKED_INBOX":
    setCurrentList({});
      setCurrentInbox(payload.inbox);
      break;
    case "RECEIVE_CLICKED_LIST":
      setCurrentInbox("None");
      setCurrentList(payload.list);
      break;
  }
};

module.exports = InboxStore;
