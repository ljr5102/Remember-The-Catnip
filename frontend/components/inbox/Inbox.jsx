var React = require('react');
var TaskStore = require('../../stores/task');
var APIUtil = require('../../utils/api_util');

var Inbox = React.createClass({
  getInitialState: function() {
    return {tasks: TaskStore.all()};
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.updateInbox);
    APIUtil.fetchAllTasks();
  },

  updateInbox: function() {
    this.setState({tasks: TaskStore.all()});
  },

  getTodayTasks: function() {
    var result = [];
    this.state.tasks.forEach(function(task) {
      if (task.due_date) {
        var due_date = new Date(task.due_date);
        if (due_date <= Date.now() && !task.completed) {
          result.push(task);
        }
      }
    });
    return result
  },

  getTomorrowTasks: function() {
    var result = [];
    var tomorrowDate = new Date();
    var dayAfterDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    dayAfterDate.setDate(dayAfterDate.getDate() + 2);
    this.state.tasks.forEach(function(task) {
      if (task.due_date) {
        debugger
        var due_date = new Date(task.due_date);
        if (due_date > tomorrowDate && due_date < dayAfterDate && !task.completed) {
          result.push(task);
        }
      }
    });
    return result
  },

  render: function() {
    var all = this.state.tasks;
    var today = this.getTodayTasks();
    // var tomorrow = this.getTomorrowTasks();

    return (
      <div>
        <h2>Inbox</h2>
        <ul>
          <li>All Tasks: {all.length}</li>
          <li>Today: {today.length}</li>
          <li>Tomorrow</li>
          <li>This Week</li>
          <li>Trash</li>
        </ul>
      </div>
    );
  }
});

module.exports = Inbox;
