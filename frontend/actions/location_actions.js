var AppDispatcher = require('../dispatcher/dispatcher');
var LocationConstants = require('../constants/location_constants');

var LocationActions = {
  receiveNewLocation: function(location) {
    var action = {
      actionType: LocationConstants.RECEIVE_NEW_LOCATION,
      location: location
    };
    AppDispatcher.dispatch(action);
  }
};

module.exports = LocationActions;
