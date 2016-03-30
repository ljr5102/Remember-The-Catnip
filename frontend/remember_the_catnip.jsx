var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;

var TasksIndex = require('./components/TasksIndex');
var TaskDetail = require('./components/TaskDetail');


var App = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    this.context.router.push("tasks")
  },

  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

// <IndexRoute component={alltasks...}
// <Route path=":task_id" component={} />
var routes = (
  <Route path="/" component={App}>
    <Route path="tasks" component={TasksIndex}>
      <Router path=":task_id" component={TaskDetail} />
    </Route>
  </Route>
);

$(function() {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    $("#root")[0]
  );
});
