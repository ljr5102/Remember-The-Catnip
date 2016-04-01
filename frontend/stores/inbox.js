var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var InboxStore = new Store(AppDispatcher);

var _currentInbox = "";

var setCurrent = function(inbox) {
  _currentInbox = inbox;
};

InboxStore.getCurrentInbox = function() {
  return _currentInbox.slice();
};

InboxStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "RECEIVE_CLICKED_INBOX":
      setCurrent(payload.inbox);
      break;
  }
};

module.exports = InboxStore;
