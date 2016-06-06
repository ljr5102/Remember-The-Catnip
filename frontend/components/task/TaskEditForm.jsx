var React = require('react');
var APIUtil = require('../../utils/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ListStore = require('../../stores/list');
var Modal = require('react-modal');

var customStyles = {
  content : {
    top : '45px',
    left: '450px',
    right: '450px',
    bottom: '0px',
    padding: '35px'
  },
  overlay: {
    zIndex: '2'
  }
};


var TaskEditForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      modalIsOpen: false
    }
  },

  componentWillMount: function() {
    var appElement = document.getElementById("root");
    Modal.setAppElement(appElement);
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function(e) {
    if(e) {
      e.preventDefault();
    }
    this.setState({modalIsOpen: false});
  },

  updateState: function(e) {
    var setting = {};
    setting[e.currentTarget.id] = e.currentTarget.value;
    this.setState(setting);
  },

  updateTask: function(e) {
    e.preventDefault();
    var formData = new FormData();
    Object.keys(this.state).forEach(function(key) {
      if (this.state[key] !== undefined && (key !== "imageFile" || key !== "imageUrl")) {
        var label = "task" + "[" + key + "]"
        formData.append(label, this.state[key]);
      }
    }.bind(this));
    if (this.state.imageFile) {
      formData.append("task[image]", this.state.imageFile);
    }
    APIUtil.updateTask(this.props.task, formData);
    this.setState({modalIsOpen: false});
  },

  deleteTask: function(e) {
    e.preventDefault();
    APIUtil.destroyTask(this.props.task);
    this.context.router.push("tasks");
  },

  completeTask: function(e) {
    e.preventDefault();
    var task = {completed: true};
    APIUtil.completeTask(this.props.task, task)
    this.context.router.push("tasks");
  },

  handleFileChange: function(e) {
    var file = e.currentTarget.files[0]
    var reader = new FileReader();

    reader.onloadend = function() {
      var result = reader.result;
      this.setState({ imageFile: file, imageUrl: result });
    }.bind(this);

    reader.readAsDataURL(file);
  },


  render: function() {
    var updateButton, completeButton, deleteButton;

    if (!this.props.task.completed) {
      updateButton = <button className="update-task-button" onClick={this.openModal}><div className="pencil"></div></button>;
      deleteButton =  <button className="delete-task-button" onClick={this.deleteTask}><div className="trashcan"></div></button>;
      completeButton = <button className="mark-complete-button" onClick={this.completeTask}><div className="checkmark"></div></button>;
    }
    var listOptions = getListOptions(this.props.task);
    return(
      <div className="task-modification">
        {updateButton}
        {deleteButton}
        {completeButton}
        <Modal style={customStyles} className="task-modal" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <h2 className="edit-task-header">Edit Task</h2>
          <form ref="editTask" className="edit-task-form group" onSubmit={this.updateTask}>
            <div className="task-error-alert-hidden">
              <div className="task-error-alert-img"></div>
              Name cannot be blank
            </div>
            <label>Name
              <input id="name" type="text" defaultValue={this.props.task.name} onChange={this.updateState} />
            </label>
            <label>Start Date
              <input id="start_date"type="date" defaultValue={this.props.task.start_date} onChange={this.updateState} />
            </label>
            <label>Due Date
              <input id="due_date" type="date" defaultValue={this.props.task.due_date} onChange={this.updateState} />
            </label>
            <label>Priority
              <input id="priority" type="number" defaultValue={this.props.task.priority} onChange={this.updateState} min="1" max="3" />
            </label>
            <label>Estimate
              <input id="estimate" type="text" defaultValue={this.props.task.estimate} onChange={this.updateState} />
            </label>
            <label>Picture
              <input className="file-upload" type="file" onChange={this.handleFileChange} />
            </label>
            <label>List
              <select id="list_id" defaultValue={this.props.task.list_id} onChange={this.updateState}>{listOptions}</select>
            </label>
            <button className="edit-task-add-button">Save</button>
            <button onClick={this.closeModal} className="edit-task-cancel-button">Cancel</button>
          </form>
        </Modal>
      </div>
    )
  }
});

// valueLink={this.linkState("name")

// <form className="task-edit-form group" onSubmit={this.updateTask}>
//   <div className="task-edit-input-grouping">
//     <label className="edit-label group">Name
//       <input type="text" defaultValue={this.state.name} valueLink={this.linkState("name")} />
//     </label>
//   </div>
//
//   <div className="task-edit-input-grouping">
//     <label className="edit-label group">Start Date
//       <input type="date" defaultValue={this.state.start_date} valueLink={this.linkState("start_date")} />
//     </label>
//   </div>
//
//   <div className="task-edit-input-grouping">
//     <label className="edit-label group">Due Date
//       <input type="date" defaultValue={this.state.due_date} valueLink={this.linkState("due_date")} />
//     </label>
//   </div>
//
//   <div className="task-edit-input-grouping">
//     <label className="edit-label group">Priority
//       <input type="number" defaultValue={this.state.priority} valueLink={this.linkState("priority")} min="1" max="3" />
//     </label>
//   </div>
//
//   <div className="task-edit-input-grouping">
//     <label className="edit-label group">Estimate
//       <input type="text" defaultValue={this.state.estimate} valueLink={this.linkState("estimate")} />
//     </label>
//   </div>
//
//   <div className="task-edit-input-grouping">
//     <label className="edit-label group">Picture
//       <input className="file-upload" type="file" onChange={this.handleFileChange} />
//     </label>
//   </div>
//
//   <div className="task-edit-input-grouping">
//     <label className="edit-label group">List
//       <select id="list" defaultValue={this.state.list_id} valueLink={this.linkState("list_id")}>{listOptions}</select>
//     </label>
//   </div>
//
//   <button className="update-task">Update Task</button>
//   <button onClick={this.props.hideEdit} className="update-task">Cancel</button>
// </form>

function getListOptions(task) {
  var lists = ListStore.all();
  lists.unshift({list_id: "", name: ""})
  var options = lists.map(function(list) {
    return <option key={list.list_id} value={list.list_id}>{list.name}</option>
  });
  return options;
};

module.exports = TaskEditForm;
