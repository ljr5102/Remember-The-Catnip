var React = require('react');
var APIUtil = require('../../utils/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ListStore = require('../../stores/list');



var TaskEditForm = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      name: this.props.task.name,
      due_date: this.props.task.due_date,
      start_date: this.props.task.start_date,
      priority: this.props.task.priority,
      estimate: this.props.task.estimate,
      list_id: this.props.task.list_id,
      imageFile: "",
      imageUrl: ""
    }
  },

  updateTask: function(e) {
    e.preventDefault();
    var formData = new FormData();
    Object.keys(this.state).forEach(function(key) {
      if (this.state[key] !== null && (key !== "imageFile" || key !== "imageUrl")) {
        var label = "task" + "[" + key + "]"
        formData.append(label, this.state[key]);
      }
    }.bind(this));
    if (this.state.imageFile !== "") {
      formData.append("task[image]", this.state.imageFile);
    }
    APIUtil.updateTask(this.props.task, formData);
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
    var listOptions = getListOptions(this.props.task);
    return(
      <form className="task-edit-form group" onSubmit={this.updateTask}>
        <div className="task-edit-input-grouping">
          <label className="edit-label group">Name
            <input type="text" defaultValue={this.state.name} valueLink={this.linkState("name")} />
          </label>
        </div>

        <div className="task-edit-input-grouping">
          <label className="edit-label group">Start Date
            <input type="date" defaultValue={this.state.start_date} valueLink={this.linkState("start_date")} />
          </label>
        </div>

        <div className="task-edit-input-grouping">
          <label className="edit-label group">Due Date
            <input type="date" defaultValue={this.state.due_date} valueLink={this.linkState("due_date")} />
          </label>
        </div>

        <div className="task-edit-input-grouping">
          <label className="edit-label group">Priority
            <input type="number" defaultValue={this.state.priority} valueLink={this.linkState("priority")} min="1" max="3" />
          </label>
        </div>

        <div className="task-edit-input-grouping">
          <label className="edit-label group">Estimate
            <input type="text" defaultValue={this.state.estimate} valueLink={this.linkState("estimate")} />
          </label>
        </div>

        <div className="task-edit-input-grouping">
          <label className="edit-label group">Picture
            <input className="file-upload" type="file" onChange={this.handleFileChange} />
          </label>
        </div>

        <div className="task-edit-input-grouping">
          <label className="edit-label group">List
            <select id="list" defaultValue={this.state.list_id} valueLink={this.linkState("list_id")}>{listOptions}</select>;
          </label>
        </div>

        <button className="update-task">Update Task</button>
        <button onClick={this.props.hideEdit} className="update-task">Cancel</button>
      </form>
    )
  }
});

function getListOptions(task) {
  var lists = ListStore.all();
  lists.unshift({list_id: "", name: ""})
  var options = lists.map(function(list) {
    return <option key={list.list_id} value={list.list_id}>{list.name}</option>
  });
  return options;
};

module.exports = TaskEditForm;
