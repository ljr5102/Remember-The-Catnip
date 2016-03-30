var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var TasksIndex = require('./components/TasksIndex');

var App = React.createClass({
  render: function() {
    return (
      <TasksIndex />
    );
  }
});

var Routes = (
  <Route path="/" component={App} />
);

$(function() {
  ReactDOM.render(
    <App />,
    $("#root")[0]
  );
});
