var React = require('react');
var SearchResultsStore = require('../stores/search_results');
var ApiUtil = require('../utils/api_util');
var TaskActions = require('../actions/task_actions');
var TaskStore = require('../stores/task');

var Search = React.createClass({

  getInitialState: function () {
    return { query: "" };
  },

  componentDidMount: function () {
    this.storeListener = SearchResultsStore.addListener(
      this._onChange
    );
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  _onChange: function () {
    this.setState({results: SearchResultsStore.all()});
  },

  handleInputChange: function (e) {
    var query;
    if ($(e.currentTarget).val() === "") {
      $(e.currentTarget).removeClass("search-box-with-input")
      query = e.currentTarget.value;
      this.setState({ query: query}, TaskActions.setStore(TaskStore.all()));
    } else {
      $(e.currentTarget).addClass("search-box-with-input")
      query = e.currentTarget.value;
      this.setState({ query: query }, this.search);
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

  resultLis: function () {
    return SearchResultsStore.all().map(function (result) {
      if (result._type === "Task") {
        return (
          <li key={ result.task_id }>
            Task #{ result.task_id }: { result.name }
          </li>
        );
      }
    });
  },

  render: function () {
    var search_res;
    var meta = SearchResultsStore.meta();
    if(this.state.query) {
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
