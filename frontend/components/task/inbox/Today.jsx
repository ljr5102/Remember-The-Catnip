var TaskStore = require('../../../stores/task');
var InboxStore = require('../../../stores/inbox');
var APIUtil = require('../../../utils/api_util');
var TaskActions = require('../../../actions/task_actions');
var InboxActions = require('../../../actions/inbox_actions');

var React = require('react');

var Today = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {todayTasks: []};
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.getNewTodayTasks);
    APIUtil.getTodayTasks(this.updateState);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  getNewTodayTasks: function() {
    APIUtil.getTodayTasks(this.updateState);
  },

  updateState: function(tasks) {
    this.setState({todayTasks: tasks});
  },

  updateStore: function() {
    this.context.router.push("tasks")
    InboxActions.receiveClickedInbox("Today");
    TaskActions.setStore(this.state.todayTasks);
  },

  render: function() {
    var taskStats = gatherTaskStats(this.state.todayTasks);
    return (
      <div>
        <li className="group" onClick={this.updateStore}>
          Today <strong className="badge">{this.state.todayTasks.length}</strong>
        </li>
        {taskStats}
      </div>
    );
  }
});

function gatherTaskStats(todayTasks) {
  var allowedInboxes = ["Today"];
  var taskStats;
  if (allowedInboxes.indexOf(InboxStore.getCurrentInbox()) !== -1) {
    taskStats = <div className="task-statistics">
                  <h2>Today</h2>
                  <ul>
                    <li><div className="task-number">{todayTasks.length}</div> tasks</li>
                  </ul>
                </div>
  } else {
    taskStats = <div></div>
  };
  return taskStats;
};


module.exports = Today;
