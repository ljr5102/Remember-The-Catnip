var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;

var TasksIndex = require('./components/task/TasksIndex');
var TaskDetail = require('./components/task/TaskDetail');
var APIUtil = require('./utils/api_util');
var App = require('./components/App');
var SessionStore = require('./stores/session');
var Login = require('./components/auth/Login');


var requireLoggedIn = function(nextState, replace, asyncCompletionCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    APIUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  } else {
    _redirectIfNotLoggedIn();
  }

  function _redirectIfNotLoggedIn() {
    if (!SessionStore.isLoggedIn()) {
      replace("/login");
    }
    asyncCompletionCallback();
  }
};

var routes = (
  <Route path="/" component={App} >
    <Route path="tasks" component={TasksIndex} onEnter={requireLoggedIn}>
      <Route path=":task_id" component={TaskDetail} />
    </Route>
    <Route path="login" component={Login} />
  </Route>
);

$(function() {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    $("#root")[0]
  );
});
