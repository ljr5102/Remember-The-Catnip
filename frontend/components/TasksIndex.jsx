var React = require('react');
var TaskStore = require('../stores/task');
var APIUtil = require('../utils/api_util');
var TaskUtil = require('../utils/task_util');

var TasksIndex = React.createClass({

  getInitialState: function() {
    return { tasks: TaskStore.all()}
  },

  componentDidMount: function() {
    this.newTaskElement = $("#task");
    this.listenerToken = TaskStore.addListener(this.handleChange)
    APIUtil.fetchAllTasks();
  },

  handleChange: function() {
    this.setState({ tasks: TaskStore.all() });
    this.newTaskElement.val("");
  },

  createTask: function() {
    var input = this.newTaskElement.val();
    TaskUtil.parseTaskInput(input);
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
        <input type="text" id="task" />
        <button onClick={this.createTask}>Add Task</button>
      </div>
    );
  }
});

module.exports = TasksIndex;
