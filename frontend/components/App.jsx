var React = require('react');
var SessionStore = require('../stores/session');
var APIUtil = require('../utils/api_util');
var Search = require('./Search');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {currentUser: null}
  },

  componentDidMount: function() {
    this.sessionStoreToken = SessionStore.addListener(this.handleChange);
    APIUtil.fetchCurrentUser();
  },

  componentWillUnmount: function() {
    this.sessionStoreToken.remove();
  },

  handleChange: function() {
    if (SessionStore.isLoggedIn()) {
      this.setState({currentUser: SessionStore.currentUser()}, this.context.router.push("/tasks"));
    } else {
      this.setState({currentUser: null}, this.context.router.push("/login"));
    }
  },

  render: function() {
    var button;
    var currUser;
    var searchBar;
    if (this.state.currentUser) {
      searchBar = <ul className="search-bar"><Search /></ul>;
      button = <button className="logout-button" onClick={APIUtil.logout}>Logout</button>;
      currUser = <div>Welcome {this.state.currentUser.user.username}</div>;
    }

    return (
      <div>
        <header className="header-bar group">
          {searchBar}
          <ul className="user-section group">
            <li>{button}</li>
          </ul>
        </header>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
