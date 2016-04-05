var React = require('react');
var TaskStore = require('../../stores/task');
var APIUtil = require('../../utils/api_util');
var TaskUtil = require('../../utils/task_util');
var TaskNewForm = require('./TaskNewForm');
var TasksIndexItem = require('./TasksIndexItem');
var Today = require('./inbox/Today');
var AllTasks = require('./inbox/AllTasks');
var Tomorrow = require('./inbox/Tomorrow');
var Week = require('./inbox/Week');
var TaskActions = require('../../actions/task_actions');
var SearchResultsStore = require('../../stores/search_results');
var ListsIndex = require('./list/ListsIndex');

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
    this.setState({ tasks: TaskStore.all() });
  },

  sendToCompleted: function(e) {
    if (!$(e.currentTarget).hasClass("selected-tab")) {
      $(".selected-tab").removeClass("selected-tab").addClass("unselected-tab");
      $(e.currentTarget).removeClass("unselected-tab").addClass("selected-tab");
    }
    TaskActions.receiveIncompleteTasks(this.state.tasks);
    this.context.router.push("tasks/completed");
  },

  sendToIndex: function(e) {
    if (!$(e.currentTarget).hasClass("selected-tab")) {
      $(".selected-tab").removeClass("selected-tab").addClass("unselected-tab")
      $(e.currentTarget).removeClass("unselected-tab").addClass("selected-tab")
    }
    this.context.router.push("tasks");
    TaskActions.setStore(TaskStore.getIncompleteTasks());
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
          <h2>Inbox</h2>
          <ul>
            <AllTasks />
            <Today />
            <Tomorrow />
            <Week />
          </ul>
          <ListsIndex />
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
