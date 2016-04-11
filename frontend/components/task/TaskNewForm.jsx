var React = require('react');
var APIUtil = require('../../utils/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ListStore = require('../../stores/list');
var LocationStore = require('../../stores/location');

var TaskNewForm = React.createClass({
  mixins: [LinkedStateMixin],

  blankAttrs: {
    name: "",
    due_date: "",
    start_date: "",
    priority: "",
    estimate: "",
    list_id: "",
    location_id: "",
    imageFile: "",
    imageUrl: ""
  },

  getInitialState: function() {
    return this.blankAttrs;
  },

  createTask: function(e) {
    e.preventDefault();
    var formData = new FormData();
    Object.keys(this.state).forEach(function(key) {
      if (this.state[key] !== "" && (key !== "imageFile" || key !== "imageUrl")) {
        var label = "task" + "[" + key + "]"
        formData.append(label, this.state[key]);
      }
    }.bind(this));
    if (this.state.imageFile !== "") {
      formData.append("task[image]", this.state.imageFile);
    }
    APIUtil.createTask(formData);
    this.setState(this.blankAttrs);
    this.clearForm();
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


  toggleClass: function(e) {
    e.preventDefault();
    var formInput =  e.target.id.split("-button")[0]
    $("#" + formInput).toggleClass("task-form-show");
  },

  toggleButtons: function() {
    if ($(".task-new-name-input").val() === "") {
      $(".show-button").removeClass("show-button").addClass("hidden-button");
      $(".task-form-show").removeClass("task-form-show").addClass("task-form-hidden")
      $(".task-new-name-input").removeClass("task-new-name-input").addClass("task-new-name-no-input")
    } else {
      $(".hidden-button").removeClass("hidden-button").addClass("show-button");
      $(".task-new-name-no-input").removeClass("task-new-name-no-input").addClass("task-new-name-input")
    }
  },

  clearForm: function() {
    $("#start-date").removeClass().addClass("task-form-hidden");
    $("#due-date").removeClass().addClass("task-form-hidden");
    $("#priority").removeClass().addClass("task-form-hidden");
    $("#estimate").removeClass().addClass("task-form-hidden");
    $("#photo").removeClass().addClass("task-form-hidden");
    $("#list").removeClass().addClass("task-form-hidden");
    $("#location").removeClass().addClass("task-form-hidden");
    $(".show-button").removeClass().addClass("hidden-button");
    $("#add-task-button").addClass("add-task");
    $("#photo").val("");
    $(".task-new-name-input").removeClass("task-new-name-input").addClass("task-new-name-no-input")
  },

  render: function() {
    var startDate = <input id="start-date" className="task-form-hidden" type="date" valueLink={this.linkState("start_date")}/>
    var dueDate = <input id="due-date" className="task-form-hidden" type="date" valueLink={this.linkState("due_date")} />
    var newPriority = <input id="priority" className="task-form-hidden" type="number" valueLink={this.linkState("priority")} min="1" max="3" />
    var estimate = <input id="estimate" className="task-form-hidden" type="text" valueLink={this.linkState("estimate")} />
    var picture = <input id="photo" className="task-form-hidden file-upload" type="file" onChange={this.handleFileChange} />
    var listOptions = getListOptions();
    var list = <select id="list" className="task-form-hidden" valueLink={this.linkState("list_id")}>{listOptions}</select>;
    var locationOptions = getLocationOptions();
    var location = <select id="location" className="task-form-hidden" valueLink={this.linkState("location_id")}>{locationOptions}</select>;
    return (
      <form className="task-new group" onInput={this.toggleButtons} onSubmit={this.createTask}>
        <input id="add-task" className="task-new-name-no-input" placeholder="Add a task..." type="text" valueLink={this.linkState("name")} />

        <div className="task-new-input-grouping group">
          <button id="start-date-button" className="hidden-button" onClick={this.toggleClass}>Start Date ⏩</button>
          <div id="start-date-button-text">Add a Start Date</div>
          {startDate}
        </div>

        <div className="task-new-input-grouping group">
          <button id="due-date-button" className="hidden-button" onClick={this.toggleClass}>Due Date 📅</button>
          <div id="due-date-button-text">Add a Due Date</div>
          {dueDate}
        </div>

        <div className="task-new-input-grouping group">
          <button id="priority-button" className="hidden-button" onClick={this.toggleClass}>Priority ❗</button>
          <div id="priority-button-text">Add a Priority</div>
          {newPriority}
        </div>

        <div className="task-new-input-grouping group">
          <button id="estimate-button" className="hidden-button" onClick={this.toggleClass}>Estimate 🕐</button>
          <div id="estimate-button-text">Add an Estimate</div>
          {estimate}
        </div>

        <div className="task-new-input-grouping group">
          <button id="photo-button" className="hidden-button" onClick={this.toggleClass}>Picture 📷</button>
          <div id="photo-button-text">Add a Picture</div>
          {picture}
        </div>

        <div className="task-new-input-grouping group">
          <button id="list-button" className="hidden-button" onClick={this.toggleClass}>List 📓</button>
          <div id="list-button-text">Add a List</div>
          {list}
        </div>

        <div className="task-new-input-grouping group">
          <button id="location-button" className="hidden-button" onClick={this.toggleClass}>Location 📍</button>
          <div id="location-button-text">Add a Location</div>
          {location}
        </div>


        <button id="add-task-button" className="hidden-button add-task">Add Task</button>
      </form>
    );
  }
});

function getListOptions() {
  var lists = ListStore.all();
  lists.unshift({list_id: "", name: ""})
  var options = lists.map(function(list) {
    return <option key={list.list_id} value={list.list_id}>{list.name}</option>
  });
  return options;
};

function getLocationOptions() {
  var locations = LocationStore.all();
  locations.unshift({location_id: "", name: ""})
  var options = locations.map(function(location) {
    return <option key={location.location_id} value={location.location_id}>{location.name}</option>
  });
  return options;
};



module.exports = TaskNewForm;
