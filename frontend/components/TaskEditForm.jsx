var React = require('react');
var APIUtil = require('../utils/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');



var TaskEditForm = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      name: this.props.task.name,
      due_date: this.props.task.due_date,
      start_date: this.props.task.start_date,
      priority: this.props.task.priority,
      estimate: this.props.task.estimate,
    }
  },

  updateTask: function(e) {
    e.preventDefault();
    var task = {};
    Object.keys(this.state).forEach(function(key) {
      if (this.state[key] !== null) {
        task[key] = this.state[key];
      }
    }.bind(this));
    APIUtil.updateTask(this.props.task, task);
  },

  render: function() {
    return(
      <form onSubmit={this.updateTask}>
        <input type="text" defaultValue={this.state.name} valueLink={this.linkState("name")} />
        <input type="date" defaultValue={this.state.start_date} valueLink={this.linkState("start_date")} />
        <input type="date" defaultValue={this.state.due_date} valueLink={this.linkState("due_date")} />
        <input type="number" defaultValue={this.state.priority} valueLink={this.linkState("priority")} min="1" max="3" />
        <input type="text" defaultValue={this.state.estimate} valueLink={this.linkState("estimate")} />
        <button>Update Task</button>
      </form>
    )
  }
});

module.exports = TaskEditForm;
