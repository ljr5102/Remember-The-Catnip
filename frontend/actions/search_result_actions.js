var AppDispatcher = require('../dispatcher/dispatcher');
var SearchResultsConstants = require('../constants/search_results_constants');

var SearchResultActions = {
  receiveResults: function(response) {
    var action = {
      actionType: SearchResultsConstants.SEARCH_RESULTS_RECEIVED,
      searchResults: response.search_results,
      meta: response.meta
    };
    AppDispatcher.dispatch(action);
  }
};

module.exports = SearchResultActions;
