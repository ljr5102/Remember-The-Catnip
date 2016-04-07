var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var LocationStore = new Store(AppDispatcher);

var _locations = [];

var addLocation = function(location) {
  _locations.push(location);
};

LocationStore.all = function() {
  return _locations.slice();
};

LocationStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "RECEIVE_NEW_LOCATION":
      addLocation(payload.location);
      LocationStore.__emitChange();
      break;

  }
};

module.exports = LocationStore;
