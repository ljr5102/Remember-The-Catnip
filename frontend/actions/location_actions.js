var AppDispatcher = require('../dispatcher/dispatcher');
var LocationConstants = require('../constants/location_constants');

var LocationActions = {
  receiveAllLocations: function(locations) {
    var action = {
      actionType: LocationConstants.RECEIVE_ALL_LOCATIONS,
      locations: locations
    };
    AppDispatcher.dispatch(action);
  },

  receiveNewLocation: function(location) {
    var action = {
      actionType: LocationConstants.RECEIVE_NEW_LOCATION,
      location: location
    };
    AppDispatcher.dispatch(action);
  }
};

module.exports = LocationActions;
