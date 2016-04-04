var React = require('react');
var TaskDetailStore = require('../../stores/task_detail');
var APIUtil = require('../../utils/api_util');
var TaskEditForm = require('./TaskEditForm');

var TaskDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  displayableProperties: {
    props: ["name",
    "owner_username",
    "completed",
    "start_date",
    "due_date",
    "priority",
    "estimate"]
  },

  getInitialState: function() {
    return {task: TaskDetailStore.getTask(), showEdit: false}
  },

  componentDidMount: function() {
    this.detailListenerToken = TaskDetailStore.addListener(this.setNewTask);
  },

  componentWillUnmount: function() {
    this.detailListenerToken.remove();
  },

  setNewTask: function() {
    this.setState({task: TaskDetailStore.getTask(), showEdit: false});
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
      image = <img className="task-images" src={this.state.task.image_url} />
    } else {
      image = <div></div>
    }

    var task = this.state.task;
    var taskArray = []
    var i = 0;
    for (var key in task) {
      if (task.hasOwnProperty(key)) {
        if (this.displayableProperties.props.indexOf(key) !== -1 && task[key] !== "") {
          if (key === "completed") {
            if (task[key]) {
              taskArray.push(<li key={i}>{key}: true</li>)
            } else {
              taskArray.push(<li key={i}>{key}: false</li>)
            }
          } else {
            taskArray.push(<li key={i}>{key}: {task[key]}</li>);
          }
        }
      }
      i += 1;
    };

    var deleteButton;
    var updateButton;
    if (taskArray.length === 0) {
      deleteButton = <div></div>
      updateButton = <div></div>
    } else {
      deleteButton =  <button className="delete-task-button" onClick={this.deleteTask}>Delete Task</button>;
      updateButton = <button className="update-task-button" onClick={this.editTask}>Edit Task...</button>
    }
    // <li key="1">Task ID: {this.state.task.task_id}</li>
    // <li key="2">Task Owner ID: {this.state.task.owner_id}</li>
    // <li key="3">Owner Name: {this.state.task.username}</li>
    // <li key="4">Task Name: {this.state.task.name}</li>
    // <li key="5">Task Status: {this.state.task.completed}</li>
    // <li key="6">Task Start Date: {this.state.task.start_date}</li>
    // <li key="7">Task Due Date: {this.state.task.due_date}</li>
    // <li key="8">Task Priority: {this.state.task.priority}</li>
    // <li key="9">Task Estimate: {this.state.task.estimate}</li>
    // <li key="10">Task List ID: {this.state.task.list_id}</li>
    // <li key="11">Task Location ID: {this.state.task.location_id}</li>
    // might need above eventually.  leave out for now
    return (
      <div className="task-detail group">
        <h2>{this.state.task.name}</h2>
        <ul>
          {taskArray}
        </ul>
        {deleteButton}
        {updateButton}
        {editForm}
        {image}
      </div>
    );
  }
});

module.exports = TaskDetail;
