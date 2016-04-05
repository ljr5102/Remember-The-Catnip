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
var UserNew = require('./components/auth/UserNew');
var CompletedTasks = require('./components/task/CompletedTasks');


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

var switchOffCompletedTab = function() {
  if($("#complete").hasClass("selected-tab")) {
    $("#complete").removeClass("selected-tab").addClass("unselected-tab");
    $("#incomplete").removeClass("unselected-tab").addClass("selected-tab");
  }
};

var switchOnCompletedTab = function() {
  if($("#complete").hasClass("unselected-tab")) {
    $("#complete").removeClass("unselected-tab").addClass("selected-tab");
    $("#incomplete").removeClass("selected-tab").addClass("unselected-tab");
  }
};

var routes = (
  <Route path="/" component={App} >
    <Route path="tasks" component={TasksIndex} onEnter={requireLoggedIn}>
      <Route path="completed" component={CompletedTasks} onEnter={switchOnCompletedTab} onLeave={switchOffCompletedTab}>
        <Route path=":task_id" component={TaskDetail} />
      </Route>
      <Route path=":task_id" component={TaskDetail} />
    </Route>
    <Route path="login" component={Login} />
    <Route path="users/new" component={UserNew}/>
  </Route>
);

$(function() {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    $("#root")[0]
  );
});
