var React = require('react');
var TaskUtil = require('../utils/task_util');

var TaskNewForm = React.createClass({

  componentDidMount: function() {
    this.newTaskElement = $("#task");
  },

  createTask: function(e) {
    e.preventDefault();
    var input = this.newTaskElement.val();
    $("#task").val("");
    TaskUtil.parseTaskInput(input);
  },

  render: function() {
    return (
      <form>
        <input type="text" id="task" />
        <button onClick={this.createTask}>Add Task</button>
      </form>
    );
  }
});

module.exports = TaskNewForm;
