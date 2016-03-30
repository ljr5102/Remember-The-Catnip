var React = require('react');
var TaskStore = require('../stores/task');
var APIUtil = require('../utils/api_util');

var TasksIndex = React.createClass({

  getInitialState: function() {
    return { tasks: TaskStore.all()}
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.handleChange)
    APIUtil.fetchAllTasks();
  },

  handleChange: function() {
    this.setState({ tasks: TaskStore.all() });
  },

  render: function() {
    var taskArray = this.state.tasks.map(function(task) {
      return <li key={task.task_id}>{task.name}</li> ;
    });

    return (
      <div>
        <ul>
          {taskArray}
        </ul>
      </div>
    );
  }
});

module.exports = TasksIndex;
