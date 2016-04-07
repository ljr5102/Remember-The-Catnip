var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var LocationStore = new Store(AppDispatcher);

var _locations = [];

var addLocation = function(location) {
  _locations.push(location);
};

var resetLocations = function(locations) {
  _locations = locations;
};

var checkForCountRaise = function(task) {
  _locations.forEach(function(location) {
    if (task.location_id === location.location_id) {
      location.task_count += 1;
    }
  });
};

var checkForCountLower = function(task) {
  _locations.forEach(function(location) {
    if (task.location_id === location.location_id) {
      location.task_count -= 1;
    }
  });
};

LocationStore.all = function() {
  return _locations.slice();
};

LocationStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "RECEIVE_ALL_LOCATIONS":
      resetLocations(payload.locations);
      LocationStore.__emitChange();
      break;
    case "RECEIVE_NEW_LOCATION":
      addLocation(payload.location);
      LocationStore.__emitChange();
      break;
    case "ADD_TASK":
      checkForCountRaise(payload.task);
      LocationStore.__emitChange();
      break;
    case "REMOVE_TASK":
      checkForCountLower(payload.task);
      LocationStore.__emitChange();
      break;
    case "COMPLETE_TASK":
      checkForCountLower(payload.oldTask);
      LocationStore.__emitChange();
      break;
    case "UPDATE_TASK":
      checkForCountRaise(payload.task);
      checkForCountLower(payload.oldTask);
      LocationStore.__emitChange();
      break;

  }
};

module.exports = LocationStore;
