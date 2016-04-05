var ListConstants = require('../constants/list_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var ListActions = {
  receiveAllLists: function(lists) {
    var action = {
      actionType: ListConstants.RECEIVE_ALL_LISTS,
      lists: lists
    };
    AppDispatcher.dispatch(action);
  },

  receiveNewList: function(list) {
    var action = {
      actionType: ListConstants.RECEIVE_NEW_LIST,
      list: list
    };
    AppDispatcher.dispatch(action);
  }
};

module.exports = ListActions;
