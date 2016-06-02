var React = require('react');
var TaskDetailStore = require('../../stores/task_detail');
var APIUtil = require('../../utils/api_util');
var TaskEditForm = require('./TaskEditForm');

var TaskDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  displayableProperties: {
    "start_date": "start",
    "due_date": "due",
    "priority": "priority",
    "estimate": "estimate"
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
    e.preventDefault();
    APIUtil.destroyTask(this.state.task);
    this.context.router.push("tasks");
  },

  hideEditForm: function(e) {
    e.preventDefault();
    this.setState({showEdit: false})
  },

  removeImage: function(e) {
    e.preventDefault();
    APIUtil.removeImage(this.state.task);

  },

  completeTask: function(e) {
    e.preventDefault();
    var task = {completed: true};
    APIUtil.completeTask(this.state.task, task)
    this.context.router.push("tasks");
  },

  showImageOptions: function(e) {
    e.preventDefault();
    $(".image-options-blank").removeClass("image-options-blank").addClass("image-options-selections");
  },

  unshowImageOptions: function(e) {
    e.preventDefault();
    $(".image-options-selections").removeClass("image-options-selections").addClass("image-options-blank");
  },

  render: function() {
    var editForm;
    var image;
    if (this.state.showEdit) {
      editForm = <TaskEditForm task={this.state.task} hideEdit={this.hideEditForm}/> ;
    } else {
      editForm = <div></div> ;
    };
    if (this.state.task.image_url !== "/missing.png") {
      image = <div onMouseLeave={this.unshowImageOptions} className="image-container">
                <div className="image-inner-container">
                  <img className="task-images" src={this.state.task.image_url} />
                  <button onMouseEnter={this.showImageOptions} className="image-options">
                    ⚙
                  </button>
                  <button className="image-options-blank"
                    onClick={this.removeImage}>
                    Remove Image
                  </button>
                </div>
              </div>
    } else {
      image = <div></div>
    }

    var currTask = this.state.task;
    var taskArray = []
    var i = 0;
    for (var key in currTask) {
      if (currTask.hasOwnProperty(key)) {
        if (this.displayableProperties[key] && currTask[key] !== null && currTask[key] !== "") {
          taskArray.push(<li key={i}><p className="detail-label">{this.displayableProperties[key]}</p> {currTask[key]}</li>);
        }
      }
      i += 1;
    };

    var deleteButton;
    var updateButton;
    var completeButton;
    var removeImageButton;
    if (!currTask.name || currTask.completed) {
      deleteButton = <div></div>
      completeButton = <div></div>
    } else {
      deleteButton =  <button className="delete-task-button" onClick={this.deleteTask}><div className="trashcan"></div></button>;
      completeButton = <button className="mark-complete-button" onClick={this.completeTask}><div className="checkmark"></div></button>;
    }
    return (
      <div className="task-detail group">
        <div className="task-detail-heading group">
          <h2>{this.state.task.name}</h2>
          {deleteButton}
          {updateButton}
          {completeButton}
        </div>
        <ul>
          {taskArray}
        </ul>
        {removeImageButton}
        <TaskEditForm task={this.state.task} hideEdit={this.hideEditForm}/>
        {image}
      </div>
    );
  }
});
// {editForm}

module.exports = TaskDetail;
