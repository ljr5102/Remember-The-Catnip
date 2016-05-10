var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var InboxStore = new Store(AppDispatcher);

var _currentInbox = "AllTasks";
var _currentList = {};
var _currentLocation = {};

var setCurrentInbox = function(inbox) {
  _currentInbox = inbox;
};

var setCurrentList = function(list) {
  _currentList = list;
};

var setCurrentLocation = function(location) {
  _currentLocation = location;
};

InboxStore.getCurrentItem = function() {
  if (_currentInbox && _currentInbox !== "None") {
    return InboxStore.getCurrentInbox();
  } else if (!$.isEmptyObject(_currentList)) {
    return InboxStore.getCurrentList();
  } else if (!$.isEmptyObject(_currentLocation)) {
    return InboxStore.getCurrentLocation();
  }
};

InboxStore.getCurrentInbox = function() {
  return _currentInbox.slice();
};

InboxStore.getCurrentList = function() {
  var list = $.extend(true, {}, _currentList);
  return list;
};

InboxStore.getCurrentLocation = function() {
  var location = $.extend(true, {}, _currentLocation);
  return location;
};

InboxStore.resetAll = function() {
  _currentInbox = "";
  _currentList = {};
  _currentLocation = {};
};

InboxStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "RECEIVE_CLICKED_INBOX":
      setCurrentList({});
      setCurrentLocation({});
      setCurrentInbox(payload.inbox);
      InboxStore.__emitChange();
      break;
    case "RECEIVE_CLICKED_LIST":
      setCurrentInbox("None");
      setCurrentLocation({});
      setCurrentList(payload.list);
      InboxStore.__emitChange();
      break;
    case "RECEIVE_CLICKED_LOCATION":
      setCurrentInbox("None");
      setCurrentList({});
      setCurrentLocation(payload.location);
      InboxStore.__emitChange();
      break;
  }
};

module.exports = InboxStore;
