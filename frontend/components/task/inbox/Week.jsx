var TaskStore = require('../../../stores/task');
var InboxStore = require('../../../stores/inbox');
var APIUtil = require('../../../utils/api_util');
var TaskActions = require('../../../actions/task_actions');
var InboxActions = require('../../../actions/inbox_actions');

var React = require('react');

var Week = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {weekTasks: []};
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.updateState);
    // APIUtil.getWeekTasks(this.updateState);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  getNewWeekTasks: function() {
    APIUtil.getWeekTasks(this.updateState);
  },

  updateState: function() {
    this.setState({weekTasks: TaskStore.getWeekTasks()});
  },

  updateStore: function() {
    this.context.router.push("tasks")
    InboxActions.receiveClickedInbox("Week");
    TaskActions.setStore(this.state.weekTasks);
  },

  render: function() {
    var taskStats = gatherTaskStats(this.state.weekTasks);
    return (
      <div>
        <li className="group" onClick={this.updateStore}>
          Week <strong className="badge">{this.state.weekTasks.length}</strong>
        </li>
      </div>
    );
  }
});

function gatherTaskStats(weekTasks) {
  var allowedInboxes = ["Week"];
  var taskStats;
  if (allowedInboxes.indexOf(InboxStore.getCurrentInbox()) !== -1) {
    taskStats = <div className="task-statistics">
                  <h2>Week</h2>
                  <ul>
                    <li><div className="task-number">{weekTasks.length}</div> tasks</li>
                  </ul>
                </div>
  } else {
    taskStats = <div></div>
  };
  return taskStats;
};


module.exports = Week;
