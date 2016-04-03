var React = require('react');
var TaskStore = require('../../stores/task');
var APIUtil = require('../../utils/api_util');
var TaskEditForm = require('./TaskEditForm');

var TaskDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {task: TaskStore.get(), showEdit: false}
  },

  componentDidMount: function() {
    this.detailListenerToken = TaskStore.addListener(this.setNewTask);
  },

  componentWillUnmount: function() {
    this.detailListenerToken.remove();
  },

  setNewTask: function() {
    this.setState({task: TaskStore.get(), showEdit: false});
  },

  componentWillReceiveProps: function(newProps) {
    APIUtil.fetchSingleTask(newProps.params.task_id)
  },

  editTask: function(e) {
    e.preventDefault();
    this.setState({showEdit: true});
  },

  deleteTask: function(e) {
    APIUtil.destroyTask(this.state.task);
    this.context.router.push("tasks");
  },

  render: function() {
    var editForm;
    var image;
    if (this.state.showEdit) {
      editForm = <TaskEditForm task={this.state.task} /> ;
    } else {
      editForm = <div></div> ;
    };
    if (this.state.task.image_url !== "/missing.png") {
      image = <img src={this.state.task.image_url} />
    } else {
      image = <div></div>
    }

    // var task = this.state.task;
    // var taskArray = []
    // var i = 0;
    // for (var key in task) {
    //   if (task.hasOwnProperty(key)) {
    //     taskArray.push(<li key={i}>{task[key]}</li>);
    //   }
    //   i += 1;
    // };
    // might need above eventually.  leave out for now
    return (
      <div className="task-detail">
        <h2>{this.state.task.name}</h2>
        <ul>
          <li key="1">Task ID: {this.state.task.task_id}</li>
          <li key="2">Task Owner ID: {this.state.task.owner_id}</li>
          <li key="3">Owner Name: {this.state.task.username}</li>
          <li key="4">Task Name: {this.state.task.name}</li>
          <li key="5">Task Status: {this.state.task.completed}</li>
          <li key="6">Task Start Date: {this.state.task.start_date}</li>
          <li key="7">Task Due Date: {this.state.task.due_date}</li>
          <li key="8">Task Priority: {this.state.task.priority}</li>
          <li key="9">Task Estimate: {this.state.task.estimate}</li>
          <li key="10">Task List ID: {this.state.task.list_id}</li>
          <li key="11">Task Location ID: {this.state.task.location_id}</li>
        </ul>
        {image}
        <button onClick={this.deleteTask}>Delete Task</button>
        <button onClick={this.editTask}>Edit Task...</button>
        {editForm}
      </div>
    );
  }
});

module.exports = TaskDetail;
