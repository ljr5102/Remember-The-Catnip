var React = require('react');
var TaskUtil = require('../../utils/task_util');
var APIUtil = require('../../utils/api_util');
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
    $("#start-date").removeClass().addClass("task-form-hidden");
    $(".show-button").removeClass().addClass("hidden-button");
  },

  toggleClass: function(e) {
    e.preventDefault();
    var formInput =  e.target.id.split("-button")[0]
    $("#" + formInput).toggleClass("task-form-show");
  },

  toggleButtons: function() {
    if ($(".task-new-name").val() === "") {
      $(".show-button").removeClass("show-button").addClass("hidden-button");
      $(".task-form-show").removeClass("task-form-show").addClass("task-form-hidden")
    } else {
      $(".hidden-button").removeClass("hidden-button").addClass("show-button");
    }
  },

  render: function() {
    var startDate = <input id="start-date" className="task-form-hidden" type="date" valueLink={this.linkState("start_date")}/>
    var dueDate = <input id="due-date" className="task-form-hidden" type="date" valueLink={this.linkState("due_date")} />
    var newPriority = <input id="priority" className="task-form-hidden" type="number" valueLink={this.linkState("priority")} min="1" max="3" />
    var estimate = <input id="estimate" className="task-form-hidden" type="text" valueLink={this.linkState("estimate")} />
    return (
      <form className="task-new group" onInput={this.toggleButtons} onSubmit={this.createTask}>
        <input className="task-new-name" placeholder="Add a task..." type="text" valueLink={this.linkState("name")} />
        <button id="start-date-button" className="hidden-button" onClick={this.toggleClass}>⏩</button>
        {startDate}
        <button id="due-date-button" className="hidden-button" onClick={this.toggleClass}>📅</button>
        {dueDate}
        <button id="priority-button" className="hidden-button" onClick={this.toggleClass}>❗</button>
        {newPriority}
        <button id="estimate-button" className="hidden-button" onClick={this.toggleClass}>🕐</button>
        {estimate}
        <button className="hidden-button add-task">Add Task</button>
      </form>
    );
  }
});



module.exports = TaskNewForm;
