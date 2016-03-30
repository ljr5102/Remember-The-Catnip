var React = require('react');
var TaskStore = require('../stores/task');
var APIUtil = require('../utils/api_util');
var TaskUtil = require('../utils/task_util');
var TaskNewForm = require('./TaskNewForm');
var TasksIndexItem = require('./TasksIndexItem');

var TasksIndex = React.createClass({

  getInitialState: function() {
    return { tasks: TaskStore.all()}
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.handleChange)
    APIUtil.fetchAllTasks();
    console.log(this.props.children)
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  handleChange: function() {
    this.setState({ tasks: TaskStore.all() });
  },

  render: function() {
    var taskArray = this.state.tasks.map(function(task, index) {
      return <TasksIndexItem key={index} task={task} /> ;
    });
    return (
      <div>
        <ul>
          {taskArray}
        </ul>
        <TaskNewForm />
        {this.props.children}
      </div>
    );
  }
});

module.exports = TasksIndex;
