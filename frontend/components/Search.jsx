var React = require('react');
var SearchResultsStore = require('../stores/search_results');
var ApiUtil = require('../utils/api_util');
var TaskActions = require('../actions/task_actions');
var TaskStore = require('../stores/task');

var Search = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { query: "" , showingResults: false};
  },

  componentDidMount: function () {
    this.storeListener = SearchResultsStore.addListener(this._onChange);
    this.taskStoreListener = TaskStore.addListener(this.removeResults);
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
    this.taskStoreListener.remove();
  },

  _onChange: function () {
    this.setState({results: SearchResultsStore.all(), showingResults: true});
  },

  removeResults: function() {
    this.setState({showingResults: false});
  },

  handleInputChange: function (e) {
    var query;
    if ($(e.currentTarget).val() === "") {
      this.context.router.push("tasks");
      $(e.currentTarget).removeClass("search-box-with-input")
      query = e.currentTarget.value;
      this.setState({ query: query, showingResults: true}, TaskActions.setTasksForCurrentInbox());
    } else {
      $(e.currentTarget).addClass("search-box-with-input")
      query = e.currentTarget.value;
      this.setState({ query: query, showingResults: true }, this.search);
    }
  },

  search: function (e) {
    if (this.state.query) {
      ApiUtil.search(this.state.query, 1);
    }
  },

  nextPage: function () {
    var meta = SearchResultsStore.meta();
    if(meta.page < meta.total_pages) {
      ApiUtil.search(meta.query, meta.page + 1);
    }
  },

  render: function () {
    var search_res;
    var meta = SearchResultsStore.meta();
    if(this.state.query && this.state.showingResults) {
      if (meta.total_pages > 0) {
        search_res = <div className="search-results-page group">
                       <div>Page { meta.page }/{ meta.total_pages } results</div>
                       <button onClick={ this.nextPage }>➜</button>
                     </div>
      } else {
        search_res = <div className="search-results-page group">
                       <div>No results.</div>
                     </div>
      }
    }

    return (
      <article>
        <input className="search-box" type="text" placeholder="Search tasks" onChange={ this.handleInputChange } />
        <button className="search-button" onClick={ this.search }><i id="magnifying" className="fa fa-search"></i></button>
        {search_res}
      </article>
    );
  }

});

module.exports = Search;
