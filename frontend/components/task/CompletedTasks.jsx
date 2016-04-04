var React = require('react');
var TaskStore = require('../../stores/task');
var APIUtil = require('../../utils/api_util');
var TaskActions = require('../../actions/task_actions');
var TasksIndexItem = require('./TasksIndexItem');

var CompletedTasks = React.createClass({
  getInitialState: function() {
    return {tasks: TaskStore.allCompleted()};
  },

  componentDidMount: function() {
    this.disableNewTaskForm();
    TaskActions.setStore([]);
    this.listenerToken = TaskStore.addListener(this.updateCompleted);
    APIUtil.fetchCompletedTasks();
  },

  disableNewTaskForm: function() {
    $(".task-new").removeClass("task-new").addClass("hide-the-new-form");
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
    $(".hide-the-new-form").removeClass("hide-the-new-form").addClass("task-new");
  },

  updateCompleted: function() {
    this.setState({tasks: TaskStore.allCompleted()});
  },

  render: function() {
    var taskArray = this.state.tasks.map(function(task, index) {
      return <TasksIndexItem key={index} task={task} /> ;
    });

    console.log("I got here")
    return (
      <div className="task-index group">
        <div className="completed-tasks-text">This is a list of your completed tasks</div>
        <ul className="list-of-tasks">
          {taskArray}
        </ul>
      </div>
    );
  }
});

module.exports = CompletedTasks;
