var React = require('react');
var ReactDOM = require('react-dom');
var TasksIndex = require('./components/TasksIndex');

$(function() {
  ReactDOM.render(
    <TasksIndex />,
    $("#root")[0]
  );
});
