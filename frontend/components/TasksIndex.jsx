var React = require('react');
var TaskStore = require('../stores/task');
var APIUtil = require('../utils/api_util');
var TaskUtil = require('../utils/task_util');
var TaskNewForm = require('./TaskNewForm');

var TasksIndex = React.createClass({

  getInitialState: function() {
    return { tasks: TaskStore.all()}
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.handleChange)
    APIUtil.fetchAllTasks();
  },

  componentWillUnmount: function() {
    TaskStore.remove(this.listenerToken);
  },

  handleChange: function() {
    this.setState({ tasks: TaskStore.all() });
  },

  render: function() {
    var taskArray = this.state.tasks.map(function(task, index) {
      return <li key={index}>{task.name}</li> ;
    });

    return (
      <div>
        <ul>
          {taskArray}
        </ul>
        <TaskNewForm />
      </div>
    );
  }
});

module.exports = TasksIndex;
