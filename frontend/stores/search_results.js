var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SearchResultsConstants = require('../constants/search_results_constants');
var TaskStore = require('./task');

var SearchResultsStore = new Store(AppDispatcher);

var _searchResults = [];
var _meta = {};
var _currentTasks = [];

SearchResultsStore.all = function() {
  return _searchResults.slice();
};

SearchResultsStore.getCurrentTasks = function() {
  return _currentTasks.slice();
};

SearchResultsStore.meta = function() {
  return $.extend(true, {}, _meta);
};

SearchResultsStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case SearchResultsConstants.SEARCH_RESULTS_RECEIVED:
      _currentTasks = TaskStore.all();
      _searchResults = payload.searchResults;
      _meta = payload.meta;
      SearchResultsStore.__emitChange();
      break;
  }
};

module.exports = SearchResultsStore;
