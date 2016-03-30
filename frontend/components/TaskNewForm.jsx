var React = require('react');
var TaskUtil = require('../utils/task_util');
var APIUtil = require('../utils/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var TaskNewForm = React.createClass({
  mixins: [LinkedStateMixin],

  blankAttrs: {
    name: "",
    due_date: "",
    start_date: "",
    priority: "",
    estimate: "",
  },
  getInitialState: function() {
    return this.blankAttrs;
  },

  createTask: function(e) {
    e.preventDefault();
    var task = {};
    Object.keys(this.state).forEach(function(key) {
      if (this.state[key] !== "") {
        task[key] = this.state[key];
      }
    }.bind(this));
    APIUtil.createTask(task);
    this.setState(this.blankAttrs);
  },

  render: function() {
    return (
      <form onSubmit={this.createTask}>
        <input type="text" valueLink={this.linkState("name")} />
        <input type="date" valueLink={this.linkState("start_date")} />
        <input type="date" valueLink={this.linkState("due_date")} />
        <input type="number" valueLink={this.linkState("priority")} min="1" max="3" />
        <input type="text" valueLink={this.linkState("estimate")} />
        <button>Add Task</button>
      </form>
    );
  }
});

module.exports = TaskNewForm;
