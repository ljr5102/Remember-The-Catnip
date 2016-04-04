var React = require('react');
var SearchResultsStore = require('../stores/search_results');
var ApiUtil = require('../utils/api_util');

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
    var query = e.currentTarget.value;
    this.setState({ query: query })
  },

  search: function (e) {
    ApiUtil.search(this.state.query, 1);
  },

  nextPage: function () {
    var meta = SearchResultsStore.meta();
    ApiUtil.search(meta.query, meta.page + 1);
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
    // <ul>
    //   { this.resultLis() }
    // </ul>
    var meta = SearchResultsStore.meta();
    return (
      <article>
        <input type="text" onChange={ this.handleInputChange } />
        <button onClick={ this.search }>GO</button>

        <nav>
          Displaying page { meta.page } of { meta.total_pages }
          <button onClick={ this.nextPage }>NEXT PAGE</button>
        </nav>

      </article>
    );
  }

});

module.exports = Search;
