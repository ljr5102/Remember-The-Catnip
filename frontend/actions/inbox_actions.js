var AppDispatcher = require('../dispatcher/dispatcher');
var InboxConstants = require('../constants/inbox_constants');

var InboxActions = {
  receiveClickedInbox: function(inbox) {
    var action = {
      actionType: InboxConstants.RECEIVE_CLICKED_INBOX,
      inbox: inbox
    };
    AppDispatcher.dispatch(action);
  }
};

module.exports = InboxActions;
