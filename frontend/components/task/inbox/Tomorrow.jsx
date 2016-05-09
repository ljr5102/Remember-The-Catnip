var TaskStore = require('../../../stores/task');
var InboxStore = require('../../../stores/inbox');
var APIUtil = require('../../../utils/api_util');
var TaskActions = require('../../../actions/task_actions');
var InboxActions = require('../../../actions/inbox_actions');

var React = require('react');

var Tomorrow = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {tomorrowTasks: []};
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.updateState);
    // APIUtil.getTomorrowTasks(this.updateState);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  getNewTomorrowTasks: function() {
    APIUtil.getTomorrowTasks(this.updateState);
  },

  updateState: function() {
    this.setState({tomorrowTasks: TaskStore.getTomorrowTasks()});
  },

  updateStore: function() {
    this.context.router.push("tasks")
    InboxActions.receiveClickedInbox("Tomorrow");
    TaskActions.setStore(this.state.tomorrowTasks);
  },

  render: function() {
    var taskStats = gatherTaskStats(this.state.tomorrowTasks);
    return (
      <div>
        <li className="group" onClick={this.updateStore}>
          Tomorrow <strong className="badge">{this.state.tomorrowTasks.length}</strong>
        </li>
        {taskStats}
      </div>
    );
  }
});

function gatherTaskStats(tomorrowTasks) {
  var allowedInboxes = ["Tomorrow"];
  var taskStats;
  if (allowedInboxes.indexOf(InboxStore.getCurrentInbox()) !== -1) {
    taskStats = <div className="task-statistics">
                  <h2>Tomorrow</h2>
                  <ul>
                    <li><div className="task-number">{tomorrowTasks.length}</div> tasks</li>
                  </ul>
                </div>
  } else {
    taskStats = <div></div>
  };
  return taskStats;
};


module.exports = Tomorrow;
