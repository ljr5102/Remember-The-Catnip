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
var SearchResultsStore = require('../../stores/search_results');

var TasksIndex = React.createClass({

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
  },

  showSearchResults: function() {
    this.setState({ tasks: SearchResultsStore.all()});
  },

  handleChange: function() {
    this.setState({ tasks: TaskStore.all() });
  },

  render: function() {
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
        </div>
        <div className="task-index group">
          <TaskNewForm />
          <ul>
            {taskArray}
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = TasksIndex;
