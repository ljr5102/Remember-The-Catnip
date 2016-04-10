var Store = require('flux/utils').Store;
var SessionConstants = require('../constants/session_constants');
var AppDispatcher = require('../dispatcher/dispatcher');
var InboxStore = require('./inbox');

var SessionStore = new Store(AppDispatcher);

var _currentUser;
var _currentUserHasBeenFetched = false;

SessionStore.currentUser = function() {
  return _currentUser;
};

SessionStore.isLoggedIn = function() {
  return !!_currentUser;
};

SessionStore.currentUserHasBeenFetched = function() {
  return _currentUserHasBeenFetched;
};

SessionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case SessionConstants.CURRENT_USER_RECEIVED:
      _currentUser = payload.currentUser;
      SessionStore.__emitChange();
      break;
    case SessionConstants.CURRENT_USER_FETCHED:
      _currentUserHasBeenFetched = true;
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      _currentUser = null;
      InboxStore.resetAll();
      SessionStore.__emitChange();
      break;
  }
};

module.exports = SessionStore;
