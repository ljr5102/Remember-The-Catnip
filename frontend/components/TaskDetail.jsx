var React = require('react');
var TaskStore = require('../stores/task');
var APIUtil = require('../utils/api_util');

var TaskDetail = React.createClass({

  getInitialState: function() {
    return {task: TaskStore.get()}
  },

  componentDidMount: function() {
    this.detailListenerToken = TaskStore.addListener(this.setNewTask);
  },

  componentWillUnmount: function() {
    this.detailListenerToken.remove();
  },

  setNewTask: function() {
    this.setState({task: TaskStore.get()});
  },

  componentWillReceiveProps: function(newProps) {
    APIUtil.fetchSingleTask(newProps.params.task_id)
  },

  render: function() {
    return (
      <div className="task-detail">
        {this.state.task.task_id}
        {this.state.task.name}
        {this.state.task.completed}
      </div>
    );
  }
});

module.exports = TaskDetail;
