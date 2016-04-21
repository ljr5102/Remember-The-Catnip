var React = require('react');
var TaskStore = require('../../stores/task');
var APIUtil = require('../../utils/api_util');
var TaskNewForm = require('./TaskNewForm');
var TasksIndexItem = require('./TasksIndexItem');
var Today = require('./inbox/Today');
var AllTasks = require('./inbox/AllTasks');
var Tomorrow = require('./inbox/Tomorrow');
var Week = require('./inbox/Week');
var TaskActions = require('../../actions/task_actions');
var SearchResultsStore = require('../../stores/search_results');
var ListsIndex = require('./list/ListsIndex');
var LocationsIndex = require('./location/LocationsIndex');
var InboxStore = require('../../stores/inbox');

var TasksIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return { tasks: TaskStore.all()}
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.handleChange)
    this.searchListener = SearchResultsStore.addListener(this.showSearchResults);
    APIUtil.fetchAllTasks();
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
    this.searchListener.remove();
  },

  showSearchResults: function() {
    this.context.router.push("tasks")
    this.setState({ tasks: SearchResultsStore.all()});
  },

  handleChange: function() {
    this.setState({ tasks: TaskStore.all() }, this.checkForMap);
  },

  checkForMap: function() {
    if(document.getElementById('map')) {
      var lat = InboxStore.getCurrentLocation().lat;
      var lng = InboxStore.getCurrentLocation().lng;
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},
        zoom: 15
      });
      var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map,
        title: "hello!"
      });
    }
  },

  sendToCompleted: function(e) {
    if (!$(e.currentTarget).hasClass("selected-tab")) {
      $(".search-box").prop("disabled", true);
      $(".selected-tab").removeClass("selected-tab").addClass("unselected-tab");
      $(e.currentTarget).removeClass("unselected-tab").addClass("selected-tab");
      var currIncompleteTasks = TaskStore.all();
      TaskActions.receiveIncompleteTasks(currIncompleteTasks);
      debugger
      this.context.router.push("tasks/completed");
    }
  },

  sendToIndex: function(e) {
    if (!$(e.currentTarget).hasClass("selected-tab")) {
      $(".search-box").prop("disabled", false);
      $(".selected-tab").removeClass("selected-tab").addClass("unselected-tab")
      $(e.currentTarget).removeClass("unselected-tab").addClass("selected-tab")
      this.context.router.push("tasks");
      debugger
      TaskActions.setStore(TaskStore.getIncompleteTasks());
    }
  },

  showHideInbox: function(e) {
    e.preventDefault();
    switch ($(".inbox-list-items").length) {
      case 1:
        $(".inbox-list-items").removeClass("inbox-list-items").addClass("inbox-list-items-hidden");
        $(".arrow-down-inbox").removeClass("arrow-down-inbox").addClass("arrow-right-inbox")
        break;
      case 0:
        $(".inbox-list-items-hidden").removeClass("inbox-list-items-hidden").addClass("inbox-list-items");
        $(".arrow-right-inbox").removeClass("arrow-right-inbox").addClass("arrow-down-inbox")
        break;
    }
  },

  render: function() {
    var taskStats;
    var pathsForDetail = ["/tasks", "tasks/completed"]
    var taskArray = this.state.tasks.map(function(task, index) {
      return <TasksIndexItem key={index} task={task} /> ;
    });
    return (
      <div className="wrapper">
        <div className="sidebar group">
          <div className="side-bar-logo"></div>
          <div className="sidebar-headers">
            <h2 onClick={this.showHideInbox}><div className="arrow-down-inbox"></div>Inbox</h2>
          </div>
          <ul className="inbox-list-items">
            <AllTasks />
            <Today />
            <Tomorrow />
            <Week />
          </ul>
          <div className="divider"></div>
          <ListsIndex />
          <div className="divider"></div>
          <LocationsIndex />
        </div>
        <div className="task-index group">
          <ul className="index-tabs group">
            <li id="incomplete" className="selected-tab" onClick={this.sendToIndex}>Incomplete</li>
            <li id="complete" className="unselected-tab" onClick={this.sendToCompleted}>Completed</li>
          </ul>
          <TaskNewForm />
          <ul className="list-of-tasks">
            {taskArray}
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = TasksIndex;
